import { socket } from "./services/socket";
import { getStar, getPlayer, getRoomId, minimap } from "./store";
import "./styles/index.css";
import "./styles/game.css";
import "./styles/collabsible.css";
import "./styles/menubar.css";
import "./styles/minimap.css";
import "./styles/popup.css";
import "./services/menu";
import { showPopup } from "./services/popup";

const update: FrameRequestCallback = () => {
  const player = getPlayer();
  const ball = getStar();
  const roomId = getRoomId();

  if (!roomId) {
    showPopup("join-room-popup");
  }
  // Star intersection
  if (roomId && player && ball && player.intersectsBall(ball)) {
    socket.emit("intersects_star", roomId);
  }

  // Scroll on move
  if (player) {
    const {
      top: playerTop,
      left: playerLeft,
      height: playerHeight,
      width: playerWidth,
    } = player.ref.getBoundingClientRect();

    const scrollTop = document.documentElement.scrollTop;
    const scrollLeft = document.documentElement.scrollLeft;

    const idealPlayerTop = window.innerHeight / 2 - playerHeight;
    const idealPlayerLeft = window.innerWidth / 2 - playerWidth;

    const idealScrollTop = playerTop + scrollTop - idealPlayerTop;
    const idealScrollLeft = playerLeft + scrollLeft - idealPlayerLeft;

    document.documentElement.scrollTop = idealScrollTop;
    document.documentElement.scrollLeft = idealScrollLeft;
  }

  // minimap
  if (player && ball) {
    const dx = ball.x - player.x;
    const dy = ball.y - player.y;

    const theta = Math.atan2(dy, dx);
    const r = minimap.ref.offsetHeight / 2;
    const top = r * Math.sin(theta) + r - 10;
    const left = r * Math.cos(theta) + r - 10;
    minimap.ballTop = top;
    minimap.ballLeft = left;
  }

  requestAnimationFrame(update);
};

requestAnimationFrame(update);
