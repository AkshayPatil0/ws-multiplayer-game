import Player from "../entities/Player";
import { PlayerState } from "../shared/dtos";
import { getOrCreateRef } from "../utils/html-ref";
import { getOpponents, setOpponents } from "../store";

export const addOpponent = (id: string, playerState: PlayerState) => {
  const opponents = getOpponents();
  const existing = Object.keys(opponents).find((opId) => opId === id);
  if (existing) return;
  const opponentRef = getOrCreateRef(`player${id}`, "player");
  const opponent = new Player(opponentRef, playerState);

  setOpponents({ ...opponents, [id]: opponent });
  // opponents[id] = opponent;
};

export const updateOpponent = (id: string, playerState: PlayerState) => {
  const opponents = getOpponents();
  opponents[id].state = playerState;

  setOpponents({ ...opponents });
};

export const removeOpponent = (id: string) => {
  const opponents = getOpponents();
  setOpponents(
    Object.fromEntries(Object.entries(opponents).filter(([key]) => key !== id))
  );
  const opponentRef = document.getElementById(`player${id}`);
  if (opponentRef) opponentRef.remove();
};
