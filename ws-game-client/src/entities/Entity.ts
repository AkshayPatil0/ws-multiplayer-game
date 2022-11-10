export default class Entity {
  ref: HTMLDivElement;

  BOUNDARY = 99;
  constructor(elementRef: HTMLDivElement) {
    this.ref = elementRef;
  }

  get x() {
    return this.getProperty("--x");
  }
  set x(val) {
    let newVal = val;
    const upLimit = this.BOUNDARY - this.width;
    if (val < 0) newVal = 0;
    else if (val > upLimit) newVal = upLimit;

    this.setProperty("--x", newVal);
  }

  get y() {
    return this.getProperty("--y");
  }
  set y(val) {
    let newVal = val;
    const upLimit = this.BOUNDARY - this.height;
    if (val < 0) newVal = 0;
    else if (val > upLimit) newVal = upLimit;

    this.setProperty("--y", newVal);
  }

  get height() {
    return this.getProperty("--height");
  }
  set height(val) {
    this.setProperty("--height", val);
  }

  get width() {
    return this.getProperty("--width");
  }
  set width(val) {
    this.setProperty("--width", val);
  }

  get color() {
    return this.getProperty("--color", (v) => v);
  }
  set color(val) {
    this.setProperty("--color", val);
  }
  getProperty(key: string, parse: (s: string) => any = parseFloat) {
    return parse(getComputedStyle(this.ref).getPropertyValue(key));
  }

  setProperty(key: string, val: number) {
    this.ref.style.setProperty(key, val.toString());
  }

  getRandomCoordinate() {
    return {
      x: Math.random() * this.BOUNDARY,
      y: Math.random() * this.BOUNDARY,
    };
  }
}
