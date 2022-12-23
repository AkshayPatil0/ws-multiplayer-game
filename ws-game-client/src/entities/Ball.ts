import { BallState } from "../shared/dtos";
import Entity from "./Entity";

export default class Ball extends Entity {
  lastMoved = 0;

  radius = 1;
  constructor(elementRef: HTMLDivElement, state: BallState) {
    super(elementRef);
    this.state = state;
  }

  get center() {
    return { x: this.x + this.radius / 2, y: this.y + this.radius / 2 };
  }

  moveRandom(time: number) {
    const { x, y } = this.getRandomCoordinate();
    this.x = x;
    this.y = y;
    this.lastMoved = time;
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
    this.radius = this.width / 2;
  }
}
