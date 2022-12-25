import { io, Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "../shared/events";
import { setBall } from "../store";
import {
  addOpponent,
  removeOpponent,
  updateOpponent,
  updatePlayer,
} from "./player";

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();

socket.on("connect", () => {
  console.log("connected");
});

socket.on("player_connected", addOpponent);
socket.on("player_disconnected", removeOpponent);
socket.on("opponent_update", updateOpponent);
socket.on("self_update", updatePlayer);
socket.on("star_moved", setBall);

// socket.on("disconnect", () => {
//   socket.removeAllListeners();
// });
