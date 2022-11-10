import { PlayerState } from "../shared/dtos";
import Ball from "./Ball";
import Entity from "./Entity";

export default class Player extends Entity {
  score = 0;
  color: string;

  constructor() {
    super(5, 5);
    this.color = getRandomColor();
  }

  move(x: number, y: number) {
    this.x += x;
    this.y += y;
  }

  intersectsBall(ball: Ball) {
    return (
      ball.center.x > this.x &&
      ball.center.y > this.y &&
      ball.center.x < this.x + this.width &&
      ball.center.y < this.y + this.height
    );
  }

  setScore(s: number, update: boolean = true) {
    this.score = update ? this.score + s : s;
    this.width++;
    this.height++;
  }

  get state() {
    return {
      color: this.color,
      score: this.score,
      x: this.x,
      y: this.y,
      height: this.height,
      width: this.width,
    };
  }
  set state(state: PlayerState) {
    this.color = state.color;
    this.score = state.score;
    this.x = state.x;
    this.y = state.y;
    this.height = state.height;
    this.width = state.width;
  }
}

const getRandomColor = () =>
  "#" + Math.floor(Math.random() * 16777215).toString(16);
