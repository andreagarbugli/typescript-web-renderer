export class Vector2 {
  constructor(public readonly x: number, public readonly y: number) {}

  add(v: Vector2) {
    return new Vector2(this.x + v.x, this.y + v.y);
  }

  sub(v: Vector2) {
    return new Vector2(this.x - v.x, this.y - v.y);
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize() {
    const s = 1.0 / this.length();
    return new Vector2(this.x * s, this.y * s);
  }
}
