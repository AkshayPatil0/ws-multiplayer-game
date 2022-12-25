import Star from "../entities/Star";
import { StarState } from "../shared/dtos";
import { getOrCreateStarRef } from "../utils/html-ref";

let ball: Star;

export const getBall = () => ball;
export const setBall = (state: StarState) => {
  if (ball) {
    ball.state = state;
    return;
  }

  let ballRef = getOrCreateStarRef();
  ball = new Star(ballRef, state);
};
