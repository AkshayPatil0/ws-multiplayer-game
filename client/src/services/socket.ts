import { io, Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "../shared/events";
import { getRoomId, setStar } from "../store";
import { updateGame } from "./game";
import {
  addOpponent,
  removeOpponent,
  updateOpponent,
  updatePlayer,
} from "./player";

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  process.env.WS_API || "",
  {
    query: {
      roomId: getRoomId(),
    },
  }
);

socket.on("connect", () => {
  console.log("connected");
});

socket.on("player_connected", addOpponent);
socket.on("player_disconnected", removeOpponent);
socket.on("opponent_update", updateOpponent);
socket.on("self_update", updatePlayer);
socket.on("star_moved", setStar);
socket.on("game_update", updateGame);

// socket.on("disconnect", () => {
//   socket.removeAllListeners();
// });
