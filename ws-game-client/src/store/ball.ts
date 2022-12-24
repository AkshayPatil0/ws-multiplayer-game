import Ball from "../entities/Ball";
import Minimap from "../entities/Minimap";
import Player from "../entities/Player";
import { BallState, PlayerState } from "../shared/dtos";
import { getOrCreateRef } from "../utils/html-ref";

let ball: Ball;

export const getBall = () => ball;
export const setBall = (state: BallState) => {
  if (ball) {
    ball.state = state;
    return;
  }

  let ballRef = getOrCreateRef("ball", "ball");
  ball = new Ball(ballRef, state);
};
