export default class Entity {
  BOUNDARY = 99;
  _x: number;
  _y: number;
  height: number;
  width: number;

  constructor(height: number, width: number) {
    this.height = height;
    this.width = width;
    this._x = this.getRandomCoordinate();
    this._y = this.getRandomCoordinate();
  }

  get x() {
    return this._x;
  }

  set x(val) {
    let newVal = val;
    const upLimit = this.BOUNDARY - this.width;
    if (val < 0) newVal = 0;
    else if (val > upLimit) newVal = upLimit;

    this._x = newVal;
  }
  get y() {
    return this._y;
  }

  set y(val) {
    let newVal = val;
    const upLimit = this.BOUNDARY - this.height;
    if (val < 0) newVal = 0;
    else if (val > upLimit) newVal = upLimit;

    this._y = newVal;
  }

  getRandomCoordinate() {
    return Math.random() * this.BOUNDARY;
  }
}
