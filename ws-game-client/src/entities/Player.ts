import { PlayerState } from "../shared/dtos";
import { minimap } from "../store";
import Ball from "./Ball";
import Entity from "./Entity";

export default class Player extends Entity {
  _directionX: number = 0;
  _lastDirectionX: number = 0;
  directionY: number = 0;

  _avatar: string = "";

  constructor(playerRef: HTMLDivElement, state: PlayerState) {
    super(playerRef);
    this.state = state;
  }

  move(x: number, y: number) {
    const newState: PlayerState = {
      ...this.state,
      directionX: Math.sign(x),
      directionY: Math.sign(y),
      x: this.x + x,
      y: this.y + y,
    };

    return newState;
  }

  intersectsBall(ball: Ball) {
    return (
      ball.center.x > this.x &&
      ball.center.y > this.y &&
      ball.center.x < this.x + this.width &&
      ball.center.y < this.y + this.height
    );
  }

  get name() {
    return this.getProperty("--name", { parse: (v) => v });
  }
  set name(val) {
    this.setProperty("--name", val);
    this.ref.setAttribute("data-name", val);
  }
  get avatar() {
    // return this.getProperty("--avatar", { parse: (v) => v });
    return this._avatar;
  }
  set avatar(val) {
    // this.setProperty(
    //   "background-image",
    //   `url("src/assets/avatars/${val}.png")`
    // );
    this._avatar = val;
    this.ref
      .querySelector(".avatar")
      ?.setAttribute("src", `src/assets/avatars/${val}.png`);

    minimap.avatar = val;
  }
  get score() {
    return this.getProperty("--score", { parse: (v) => parseFloat(v) });
  }
  set score(val) {
    this.setProperty("--score", val);
  }
  get directionX() {
    return this._directionX;
  }
  set directionX(val) {
    this._directionX = val;
    const dx = val == 0 ? this._lastDirectionX : val;
    // this.setProperty("scale", `${dx} 1`);
    this.ref
      .querySelector<HTMLImageElement>(".avatar")
      ?.style.setProperty("scale", `${dx} 1`);
    this._lastDirectionX = dx;
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
      directionX: this.directionX,
      directionY: this.directionY,
    };
  }
  set state(state: PlayerState) {
    if (!state) return;
    this.name = state.name;
    this.avatar = state.avatar;
    this.color = state.color;
    this.score = state.score;
    this.x = state.x;
    this.y = state.y;
    this.height = state.height;
    this.width = state.width;
    this.directionX = state.directionX;
    this.directionY = state.directionY;
  }
}
