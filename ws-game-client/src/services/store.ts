import Ball from "../entities/Ball";
import Player from "../entities/Player";
import { ballRef, playerRef } from "../globals";
import { BallState, PlayerState } from "../shared/dtos";

let player: Player, ball: Ball;

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
