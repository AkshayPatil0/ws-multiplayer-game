import Player from "../entities/Player";
import { PlayerState } from "../shared/dtos";
import { getOrCreateRef } from "../utils/html-ref";

let player: Player | null = null;

export const getPlayer = () => player;

export const setPlayer = (state: PlayerState | null) => {
  if (player && state === null) {
    player.ref.remove();
    player = null;
    return;
  }
  if (player && state) {
    player.state = state;
    return;
  }
  if (!player && state) {
    let playerRef = getOrCreateRef("player", "player");
    player = new Player(playerRef, state);
  }
};
