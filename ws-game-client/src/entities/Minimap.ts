import Entity from "./Entity";

export default class Minimap extends Entity {
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
}
