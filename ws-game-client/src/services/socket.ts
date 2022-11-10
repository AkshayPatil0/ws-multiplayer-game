import { io } from "socket.io-client";
import { addOpponent, removeOpponent, updateOpponent } from "./opponents";
import { setBall, setPlayer } from "./store";

export const socket = io("http://localhost:4000");

socket.on("connect", () => {
  console.log("connected");
});

socket.onAny(console.log);

socket.on("player_connected", addOpponent);
socket.on("player_disconnected", removeOpponent);
socket.on("opponent_update", updateOpponent);
socket.on("self_update", setPlayer);
socket.on("ball_moved", setBall);

// socket.on("disconnect", () => {
//   socket.removeAllListeners();
// });
