import { BallState } from "../shared/dtos";
import Entity from "./Entity";

export default class Ball extends Entity {
  lastMoved = 0;

  radius = 1;
  color = "dogerblue";
  constructor() {
    super(1, 1);
  }

  get center() {
    return { x: this.x + this.radius / 2, y: this.y + this.radius / 2 };
  }

  moveRandom() {
    this.x = this.getRandomCoordinate();
    this.y = this.getRandomCoordinate();
  }

  get state() {
    return {
      color: this.color,
      x: this.x,
      y: this.y,
      height: this.height,
      width: this.width,
    };
  }
  set state(state: BallState) {
    if (!state) return;
    this.color = state.color;
    this.x = state.x;
    this.y = state.y;
    this.height = state.height;
    this.width = state.width;
  }
}
