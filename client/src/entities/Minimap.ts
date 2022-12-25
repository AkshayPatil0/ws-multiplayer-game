import { AVATARS } from "../constants/avatars";
import Entity from "./Entity";

export default class Minimap extends Entity {
  _avatar: string = "";

  constructor(elementRef: HTMLDivElement) {
    super(elementRef);
    this.ballTop = 20;
  }

  get ballTop() {
    return this.getProperty("--balltop");
  }
  set ballTop(val) {
    this.setProperty("--balltop", val);
  }
  get ballLeft() {
    return this.getProperty("--ballleft");
  }
  set ballLeft(val) {
    this.setProperty("--ballleft", val);
  }

  get avatar() {
    return this._avatar;
  }

  set avatar(val) {
    this._avatar = val;
    this.ref
      .querySelector(".mini-player")
      ?.setAttribute("src", AVATARS[val] || "");
  }
}
