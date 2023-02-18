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

app.use("/assets", express.static("public/assets"));

app.get("/play", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../public/game/index.html"));
});

app.get("/", async (req, res) => {
  res.sendFile(path.resolve(__dirname, "../public/index.html"));
});

app.get("/app-state", async (req, res) => {
  res.json({
    // players,
    players: Object.fromEntries(
      Array.from(players.entries()).map(([key, value]) => [
        key,
        Object.fromEntries(value.entries()),
      ])
    ),
    star,
  });
});

const httpServer = createServer(app);

type IServer = Server<ClientToServerEvents, ServerToClientEvents>;
type ISocket = Socket<ClientToServerEvents, ServerToClientEvents>;

const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
  cors: {
    origin: "*",
  },
});

// let connectedSockets: Socket[] = [];
// let playerSockets: Socket[] = [];

const star = new Star();

// const players: { [roomId: string]: { [socketId: string]: Player } } = {};
const players = new Map<string, Map<string, Player>>();

const isPlayerState = (state: any): state is PlayerState => {
  return state.x && state.y && state.name && state.avatar && state.color;
};

const setPlayersState = (
  roomId: string,
  socketId: string,
  state: PlayerState | { name: string; avatar: string }
) => {
  let roomState = players.get(roomId);
  if (!roomState) {
    // players[roomId] = { [socketId]: new Player(state.name, state.avatar) };
    roomState = new Map([[socketId, new Player(state.name, state.avatar)]]);
    players.set(roomId, roomState);
    return;
  }

  let playerState = roomState.get(socketId);

  if (!playerState) {
    // players[roomId][socketId] = new Player(state.name, state.avatar);
    playerState = new Player(state.name, state.avatar);
    players.get(roomId)?.set(socketId, playerState);
    return;
  }

  // players[roomId][socketId].state = state;
  if (!isPlayerState(state)) {
    console.log("not player state", state);
    return;
  }

  playerState.state = state;
};

const getPlayer = (roomId: string, socketId: string) => {
  const roomState = players.get(roomId);
  if (!roomState) {
    throw new Error("Room not found");
  }
  const playerState = roomState.get(socketId);
  if (!playerState) {
    throw new Error("Player not found");
  }
  return playerState;
};

const getRoomState = (roomId: string) => {
  const roomState = players.get(roomId);
  if (!roomState) throw new Error("Room not found");

  return Object.fromEntries(
    Array.from(roomState.entries()).map(([key, value]) => [key, value.state])
  );
};

io.use((socket, next) => {
  const { roomId } = socket.handshake.query;
  if (roomId) {
    joinRoom(socket, io)(roomId as string);
  }
  next();
});

io.on("connection", (socket) => {
  console.log(
    `New connection ${socket.id} | room: ${socket.handshake.query.roomId}`
  );

  socket.on("join_room", joinRoom(socket, io));

  socket.on("start_game", startGame(socket, io));

  socket.on("player_update", playerUpdate(socket, io));

  socket.on("intersects_star", intersectsStar(socket, io));

  socket.on("exit_game", exitGame(socket, io));

  socket.on("disconnect", disconnected(socket, io));
});

const removePlayer = (socket: Socket) => {
  players.forEach((room, roomId) => {
    if (room.has(socket.id)) {
      socket.leave(roomId);
      room.delete(socket.id);
      io.to(roomId).emit("player_disconnected", socket.id);
    }
  });
};
const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => console.log(`listening on post ${PORT}`));

const joinRoom = (socket: ISocket, io: IServer) => (roomId: string) => {
  console.log("join_room", socket.id, roomId);
  socket.join(roomId);
  socket.emit("star_moved", star.state);

  const roomState = players.get(roomId);
  if (roomState) {
    socket.emit("game_update", {
      players: Object.fromEntries(roomState),
      star: star.state,
    });
  }
};

const startGame =
  (socket: ISocket, io: IServer) =>
  (name: string, avatar: string, roomId: string) => {
    console.log("start_game", socket.id, name, avatar, roomId);
    setPlayersState(roomId, socket.id, { name, avatar });

    const playerState = getPlayer(roomId, socket.id);
    const roomState = getRoomState(roomId);

    io.to(roomId).emit("player_connected", socket.id, playerState.state);
    // socket.emit("self_update", playerState.state);
    socket.emit("game_update", {
      players: roomState,
      star: star.state,
    });
  };

const playerUpdate =
  (socket: ISocket, io: IServer) => (state: PlayerState, roomId: string) => {
    socket.emit("self_update", state);

    io.to(roomId).emit("opponent_update", socket.id, state);

    setPlayersState(roomId, socket.id, state);
  };

const intersectsStar = (socket: ISocket, io: IServer) => (roomId: string) => {
  console.log("intersects_star", socket.id, roomId);
  star.moveRandom();

  const player = getPlayer(roomId, socket.id);

  player.setScore(1);

  // socket.emit("self_update", player.state);
  io.to(roomId).emit("game_update", {
    players: getRoomState(roomId),
    star: star.state,
  });
};

const exitGame = (socket: ISocket, io: IServer) => () => {
  console.log("Player exited", socket.id);
  removePlayer(socket);
};

const disconnected = (socket: ISocket, io: IServer) => (reason: string) => {
  console.log("disconnected due to", reason, socket.id);
  removePlayer(socket);
};
