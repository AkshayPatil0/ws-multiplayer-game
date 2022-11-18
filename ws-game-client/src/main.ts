import { KEYS } from "./constants/keys";
// import { opponents } from "./services/opponents";
import { socket } from "./services/socket";
import { getBall, getPlayer, opponents } from "./services/store";
import "./style.css";

const update: FrameRequestCallback = () => {
  const player = getPlayer();
  const ball = getBall();
  if (player && ball && player.intersectsBall(ball)) {
    socket.emit("intersect_ball", player.state);
  }
  if (player && opponents) {
    Object.entries(opponents).forEach(([oppId, opp]) => {
      if (player.intersectsOpponent(opp)) {
        player.move(
          -opp.width * player.direction.x,
          -opp.height * player.direction.y
        );
      }
    });
  }
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

  requestAnimationFrame(update);
};
requestAnimationFrame(update);

document.addEventListener("keydown", (e) => {
  e.preventDefault();
  const player = getPlayer();
  if (!player) return;

  const speed = e.shiftKey ? 4 : 2;

  const { x, y } = getMoveDirection(e.key);

  player.move(x * speed, y * speed);
});

const getMoveDirection = (key: string) => {
  switch (key) {
    case KEYS.ArrowLeft:
      return { x: -1, y: 0 };

    case KEYS.ArrowRight:
      return { x: 1, y: 0 };

    case KEYS.ArrowUp:
      return { x: 0, y: -1 };

    case KEYS.ArrowDown:
      return { x: 0, y: 1 };

    default:
      return { x: 0, y: 0 };
  }
  // if (e.key === KEYS.ArrowLeft) {
  //   player.move(-speed, 0);
  // }
  // if (e.key === KEYS.ArrowRight) {
  //   player.move(speed, 0);
  // }
  // if (e.key === KEYS.ArrowUp) {
  //   player.move(0, -speed);
  // }
  // if (e.key === KEYS.ArrowDown) {
  //   player.move(0, +speed);
  // }
};

const waitMs = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
