import { PlayerState } from "../shared/dtos";
import Star from "./Star";
import Entity from "./Entity";

export default class Player extends Entity {
  score = 0;
  color: string;
  name: string;
  avatar: string;

  constructor(name: string, avatar: string) {
    super(4, 4);
    this.color = getRandomColor();
    this.name = name;
    this.avatar = avatar;
  }

  move(x: number, y: number) {
    this.x += x;
    this.y += y;
  }

  intersectsBall(ball: Star) {
    return (
      ball.center.x > this.x &&
      ball.center.y > this.y &&
      ball.center.x < this.x + this.width &&
      ball.center.y < this.y + this.height
    );
  }

  setScore(s: number, update: boolean = true) {
    this.score = update ? this.score + s : s;
  }

  get state() {
    return {
      name: this.name,
      avatar: this.avatar,
      color: this.color,
      score: this.score,
      x: this.x,
      y: this.y,
      height: this.height,
      width: this.width,
    };
  }
  set state(state: PlayerState) {
    this.name = state.name;
    this.avatar = state.avatar;
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
