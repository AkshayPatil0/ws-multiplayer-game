import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import Ball from "./entities/Ball";
import Player from "./entities/Player";
import { PlayerState } from "./shared/dtos";
const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

let connectedSockets: Socket[] = [];
// let playerSockets: Socket[] = [];

const ball = new Ball();

const players: { [socketId: string]: Player } = {};

const ballInterval = setInterval(() => {
  ball.moveRandom();
  connectedSockets.forEach((s) => {
    s.emit("ball_moved", ball.state);
  });
}, 10000);

io.on("connection", (socket) => {
  console.log("connection", socket.id);
  socket.onAny((...args) => console.log(socket.id, args));

  connectedSockets.forEach((s) => {
    players[s.id]?.state &&
      socket.emit("player_connected", s.id, players[s.id]?.state);
  });

  socket.emit("ball_moved", ball.state);
  connectedSockets.push(socket);

  socket.on("start_game", (name) => {
    const newPlayer = new Player(name);
    players[socket.id] = newPlayer;
    socket.emit("self_update", newPlayer.state);
    socket.emit("ball_moved", ball.state);

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

  socket.on("intersect_ball", () => {
    if (!players[socket.id]) return;
    ball.moveRandom();
    socket.emit("ball_moved", ball.state);
    ballInterval.refresh();

    players[socket.id].setScore(1);
    socket.emit("self_update", players[socket.id].state);
    connectedSockets.forEach((s) => {
      if (s.id === socket.id) return;
      s.emit("ball_moved", ball.state);
      s.emit("opponent_update", socket.id, players[socket.id].state);
    });
  });

  socket.on("disconnect", (reason) => {
    console.log("disconnected due to", reason, socket.id);
    connectedSockets = connectedSockets.filter((s) => s.id !== socket.id);
    connectedSockets.forEach((s) => s.emit("player_disconnected", socket.id));
    delete players[socket.id];
  });
});

const PORT = 4000;
httpServer.listen(PORT, () => console.log(`listening on post ${PORT}`));
