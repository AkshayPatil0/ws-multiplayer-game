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
    return (
      ball.center.x > this.x &&
      ball.center.y > this.y &&
      ball.center.x < this.x + this.width &&
      ball.center.y < this.y + this.height
    );
  }

  intersectsOpponent(player: Player) {
    const l1 = {
      x: player.x,
      y: player.y,
    };
    const r1 = {
      x: player.x + player.width,
      y: player.y + player.height,
    };
    const l2 = {
      x: this.x,
      y: this.y,
    };
    const r2 = {
      x: this.x + this.width,
      y: this.y + this.height,
    };

    // If one rectangle is on left side of other
    if (l1.x >= r2.x || l2.x >= r1.x) {
      return false;
    } // If one rectangle is above other
    if (r1.y <= l2.y || r2.y <= l1.y) {
      return false;
    }

    return true;
  }

  get score() {
    return this.getProperty("--score", { parse: (v) => parseInt(v) });
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
