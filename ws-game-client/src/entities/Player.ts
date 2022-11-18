import { socket } from "../services/socket";
import { PlayerState } from "../shared/dtos";
import Ball from "./Ball";
import Entity from "./Entity";

export default class Player extends Entity {
  constructor(playerRef: HTMLDivElement, state: PlayerState) {
    super(playerRef);
    this.state = state;
  }

  move(x: number, y: number) {
    this.x += x;
    this.y += y;

    socket.emit("player_update", this.state);
  }

  intersectsBall(ball: Ball) {
    // console.log({ x: this.x, y: this.y, center: ball.center });
    return (
      ball.center.x > this.x &&
      ball.center.y > this.y &&
      ball.center.x < this.x + this.width &&
      ball.center.y < this.y + this.height
    );
  }

  intersectsOpponent(player: Player) {
    return (
      Math.abs(player.x - this.x) < Math.max(player.width, this.width) &&
      Math.abs(player.y - this.y) < Math.max(player.height, this.height)
    );
  }

  get score() {
    return this.getProperty("--score", (v) => parseInt(v));
  }
  set score(val) {
    this.setProperty("--score", val);
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
    if (!state) return;
    this.color = state.color;
    this.score = state.score;
    this.x = state.x;
    this.y = state.y;
    this.height = state.height;
    this.width = state.width;
  }
}
