import Ball from "../entities/Ball";
import Player from "../entities/Player";
import { ballRef, groundRef, playerRef } from "../globals";
import { BallState, PlayerState } from "../shared/dtos";

type IOpponents = { [id: string]: Player };
let player: Player, ball: Ball;

export const opponents: IOpponents = {};

export const getPlayer = () => player;
export const setPlayer = (state: PlayerState) => {
  if (player) {
    player.state = state;
    return;
  }

  player = new Player(playerRef, state);
};

export const getBall = () => ball;
export const setBall = (state: BallState) => {
  if (ball) {
    ball.state = state;
    return;
  }

  ball = new Ball(ballRef, state);
};

export const getOpponents = () => opponents;

export const addOpponent = (id: string, playerState: PlayerState) => {
  const opponents = getOpponents();
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
