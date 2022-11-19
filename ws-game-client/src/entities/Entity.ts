export default class Entity {
  ref: HTMLDivElement;
  groundRef: HTMLDivElement;
  // BOUNDARY = 98;
  constructor(elementRef: HTMLDivElement) {
    this.ref = elementRef;
    this.groundRef = document.getElementById("ground") as HTMLDivElement;
  }

  get BOUNDARY() {
    return this.getProperty("--scale", { node: this.groundRef }) - 2;
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
    return this.getProperty("--color", { parse: (v) => v });
  }
  set color(val) {
    this.setProperty("--color", val);
  }
  getProperty(
    key: string,
    { parse = parseFloat, node = this.ref }: IGetPropertyOptions = {}
  ) {
    return parse(getComputedStyle(node).getPropertyValue(key));
  }

  setProperty(
    key: string,
    val: number,
    { node = this.ref }: ISetPropertyOptions = {}
  ) {
    node.style.setProperty(key, val.toString());
  }

  getRandomCoordinate() {
    return {
      x: Math.random() * this.BOUNDARY,
      y: Math.random() * this.BOUNDARY,
    };
  }
}

type IGetPropertyOptions =
  | {
      parse?: (s: string) => any;
      node?: HTMLDivElement;
    }
  | undefined;

type ISetPropertyOptions =
  | {
      node?: HTMLDivElement;
    }
  | undefined;
