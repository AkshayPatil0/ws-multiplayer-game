import { KEYS } from "../constants/keys";
import { getOpponents, getPlayer } from "../store";
import { PlayerState } from "../shared/dtos";
import { socket } from "../services/socket";

export const intersectsOpponent = (
  player: PlayerState,
  opponent: PlayerState
) => {
  const l1 = {
    x: opponent.x,
    y: opponent.y,
  };
  const r1 = {
    x: opponent.x + opponent.width,
    y: opponent.y + opponent.height,
  };
  const l2 = {
    x: player.x,
    y: player.y,
  };
  const r2 = {
    x: player.x + player.width,
    y: player.y + player.height,
  };

  // If one rectangle is on left side of other
  if (l1.x >= r2.x || l2.x >= r1.x) {
    return false;
  } // If one rectangle is above other
  if (r1.y <= l2.y || r2.y <= l1.y) {
    return false;
  }

  return true;
};

export const ifPlayerIntersectsOpponents = (PlayerState: PlayerState) => {
  const opponents = getOpponents();
  if (opponents) {
    for (let opp in opponents) {
      if (intersectsOpponent(PlayerState, opponents[opp])) {
        return true;
      }
    }
  }
  return false;
};

export const getMoveDirectionByKey = (key: string) => {
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

export const playerControlsHandler = (e: KeyboardEvent) => {
  e.preventDefault();
  const player = getPlayer();

  if (!player) return;

  const speed = e.shiftKey ? 2 : 1;

  const { x, y } = getMoveDirectionByKey(e.key);

  if (x == 0 && y == 0) return;
  let newPlayerState = player.move(x * speed, y * speed);
  if (ifPlayerIntersectsOpponents(newPlayerState)) {
    newPlayerState = player.move(-x * speed, -y * speed);
  }
  socket.emit("player_update", newPlayerState);
};
