import Player from "../entities/Player";
import { PlayerState } from "../shared/dtos";
import { getOrCreatePlayerRef } from "../utils/html-ref";
import { getOpponents, setOpponents, setPlayer } from "../store";
import { updateStats } from "./stats";

export const updatePlayer = (playerState: PlayerState | null) => {
  setPlayer(playerState);
  updateStats({ state: playerState, own: true });
};

export const addOpponent = (id: string, playerState: PlayerState) => {
  const opponents = getOpponents();
  const existing = Object.keys(opponents).find((opId) => opId === id);
  if (existing) return;
  const opponentRef = getOrCreatePlayerRef(`player${id}`);
  const opponent = new Player(opponentRef, playerState);

  setOpponents({ ...opponents, [id]: opponent });

  updateStats({ id, state: playerState });
};

export const updateOpponent = (id: string, playerState: PlayerState) => {
  const opponents = getOpponents();
  opponents[id].state = playerState;

  setOpponents({ ...opponents });

  updateStats({ id, state: playerState });
};

export const removeOpponent = (id: string) => {
  const opponents = getOpponents();
  setOpponents(
    Object.fromEntries(Object.entries(opponents).filter(([key]) => key !== id))
  );
  const opponentRef = document.getElementById(`player${id}`);
  if (opponentRef) opponentRef.remove();
};
