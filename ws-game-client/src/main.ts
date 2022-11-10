import { KEYS } from "./constants/keys";
import { socket } from "./services/socket";
import { getBall, getPlayer } from "./services/store";
import "./style.css";

const update: FrameRequestCallback = () => {
  const player = getPlayer();
  const ball = getBall();
  if (player && ball && player.intersectsBall(ball)) {
    socket.emit("intersect_ball", player.state);
  }
  requestAnimationFrame(update);
};
requestAnimationFrame(update);

document.addEventListener("keydown", (e) => {
  const player = getPlayer();
  if (!player) return;

  const speed = e.shiftKey ? 4 : 2;
  if (e.key === KEYS.ArrowLeft) {
    player.move(-speed, 0);
  }
  if (e.key === KEYS.ArrowRight) {
    player.move(speed, 0);
  }
  if (e.key === KEYS.ArrowUp) {
    player.move(0, -speed);
  }
  if (e.key === KEYS.ArrowDown) {
    player.move(0, +speed);
  }
});
