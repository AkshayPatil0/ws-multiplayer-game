import { socket } from "../services/socket";
import { PlayerState } from "../shared/dtos";
import Ball from "./Ball";
import Entity from "./Entity";

export default class Player extends Entity {
  direction = {
    x: 0,
    y: 0,
  };
  constructor(playerRef: HTMLDivElement, state: PlayerState) {
    super(playerRef);
    this.state = state;
  }

  move(x: number, y: number) {
    this.direction = {
      x: Math.sign(x),
      y: Math.sign(y),
    };
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
    const aLeftOfB = player.x + player.width < this.x;
    const aRightOfB = player.x > this.x + this.width;
    const aAboveB = player.y > this.y + this.height;
    const aBelowB = player.y + player.height < this.y;

    return !(aLeftOfB || aRightOfB || aAboveB || aBelowB);
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
