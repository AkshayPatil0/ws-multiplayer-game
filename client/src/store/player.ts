import { minimap } from ".";
import Player from "../entities/Player";
import { updateStats } from "../services/stats";
import { PlayerState } from "../shared/dtos";
import { getOrCreatePlayerRef } from "../utils/html-ref";

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
    let playerRef = getOrCreatePlayerRef("player");
    player = new Player(playerRef, state);
  }
};
