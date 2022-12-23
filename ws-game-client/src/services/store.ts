import Ball from "../entities/Ball";
import Minimap from "../entities/Minimap";
import Player from "../entities/Player";
import { BallState, PlayerState } from "../shared/dtos";
import { getOrCreateRef } from "../utils/html-ref";

export const minimapRef = document.querySelector<HTMLDivElement>(
  "#minimap"
) as HTMLDivElement;

export const minimap = new Minimap(minimapRef);

export type IOpponents = { [id: string]: Player };

let player: Player, ball: Ball, gameStarted: boolean;

export const opponents: IOpponents = {};

export const isGameStated = () => gameStarted;

export const setIsGameStarted = (val: boolean) => (gameStarted = val);

export const getPlayer = () => player;

export const setPlayer = (state: PlayerState) => {
  if (player) {
    player.state = state;
    return;
  }
  let playerRef = getOrCreateRef("player", "player");
  player = new Player(playerRef, state);
};

export const getBall = () => ball;
export const setBall = (state: BallState) => {
  if (ball) {
    ball.state = state;
    return;
  }

  let ballRef = getOrCreateRef("ball", "ball");
  ball = new Ball(ballRef, state);
};

export const getOpponents = () => opponents;

export const addOpponent = (id: string, playerState: PlayerState) => {
  const opponents = getOpponents();
  const existing = Object.keys(opponents).find((opId) => opId === id);
  if (existing) return;
  const opponentRef = getOrCreateRef(`player${id}`, "player");
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
