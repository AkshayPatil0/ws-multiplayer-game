import Player from "../entities/Player";
import { groundRef } from "../globals";
import { PlayerState } from "../shared/dtos";

export const opponents: { [id: string]: Player } = {};

export const addOpponent = (id: string, playerState: PlayerState) => {
  const existing = Object.keys(opponents).find((opId) => opId === id);
  if (existing) return;
  const opponentRef = document.createElement("div");
  opponentRef.id = `player${id}`;
  opponentRef.classList.add("player");
  groundRef.appendChild(opponentRef);
  const opponent = new Player(opponentRef, playerState);
  opponents[id] = opponent;
};

export const updateOpponent = (id: string, playerState: PlayerState) => {
  opponents[id].state = playerState;
};

export const removeOpponent = (id: string) => {
  delete opponents[id];
  const opponentRef = document.getElementById(`player${id}`);
  if (opponentRef) opponentRef.remove();
};
