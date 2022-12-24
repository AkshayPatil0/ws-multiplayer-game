import Player from "../entities/Player";
import { PlayerState } from "../shared/dtos";
import { getOrCreateRef } from "../utils/html-ref";

let player: Player;

export const getPlayer = () => player;

export const setPlayer = (state: PlayerState) => {
  if (player) {
    player.state = state;
    return;
  }
  let playerRef = getOrCreateRef("player", "player");
  player = new Player(playerRef, state);
};
