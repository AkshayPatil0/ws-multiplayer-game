import Star from "../entities/Star";
import { StarState } from "../shared/dtos";
import { getOrCreateStarRef } from "../utils/html-ref";

let star: Star;

export const getStar = () => star;
export const setStar = (state: StarState) => {
  if (star) {
    star.state = state;
    return;
  }

  let starRef = getOrCreateStarRef();
  star = new Star(starRef, state);
};
