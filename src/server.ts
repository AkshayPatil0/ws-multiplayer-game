import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import Star from "./entities/Star";
import Player from "./entities/Player";
import { PlayerState } from "./shared/dtos";
import { ClientToServerEvents, ServerToClientEvents } from "./shared/events";
import * as path from "path";

import { config } from "dotenv";
config();

const app = express();

app.get("/health", (req, res) => {
  res.send("ok");
});

app.use(express.static("public"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});

const httpServer = createServer(app);

const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
  cors: {
    origin: "*",
  },
});

let connectedSockets: Socket[] = [];
// let playerSockets: Socket[] = [];

const ball = new Star();

const players: { [socketId: string]: Player } = {};

const ballInterval = setInterval(() => {
  ball.moveRandom();
  connectedSockets.forEach((s) => {
    s.emit("ball_moved", ball.state);
  });
}, 10000);

io.on("connection", (socket) => {
  console.log("connection", socket.id);

  connectedSockets.forEach((s) => {
    players[s.id]?.state &&
      socket.emit("player_connected", s.id, players[s.id]?.state);
  });

  socket.emit("star_moved", ball.state);
  connectedSockets.push(socket);

  socket.on("start_game", (name, avatar) => {
    const newPlayer = new Player(name, avatar);
    players[socket.id] = newPlayer;
    socket.emit("self_update", newPlayer.state);
    socket.emit("star_moved", ball.state);

    connectedSockets.forEach((s) => {
      if (s.id === socket.id) return;
      s.emit("player_connected", socket.id, newPlayer.state);

      const opponentState = players[s.id]?.state;
      opponentState && socket.emit("player_connected", s.id, opponentState);
    });

    // playerSockets.push(socket);
  });

  socket.on("player_update", (state: PlayerState) => {
    socket.emit("self_update", state);
    connectedSockets.forEach((s) => {
      if (s.id === socket.id) return;
      s.emit("opponent_update", socket.id, state);
    });
    players[socket.id] && (players[socket.id].state = state);
  });

  socket.on("intersects_star", () => {
    if (!players[socket.id]) return;
    ball.moveRandom();
    socket.emit("star_moved", ball.state);
    ballInterval.refresh();

    players[socket.id].setScore(1);
    socket.emit("self_update", players[socket.id].state);
    connectedSockets.forEach((s) => {
      if (s.id === socket.id) return;
      s.emit("ball_moved", ball.state);
      s.emit("opponent_update", socket.id, players[socket.id].state);
    });
  });

  socket.on("exit_game", () => {
    console.log("Player exited", socket.id);
    removePlayer(socket);
  });
  socket.on("disconnect", (reason) => {
    console.log("disconnected due to", reason, socket.id);
    removePlayer(socket);
  });
});

const removePlayer = (socket: Socket) => {
  connectedSockets = connectedSockets.filter((s) => s.id !== socket.id);
  connectedSockets.forEach((s) => s.emit("player_disconnected", socket.id));
  delete players[socket.id];
};
const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => console.log(`listening on post ${PORT}`));
