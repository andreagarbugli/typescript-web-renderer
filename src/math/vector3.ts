import { runInThisContext } from 'vm';

export class Vector3 {
  constructor(
    public readonly x: number,
    public readonly y: number,
    public readonly z: number
  ) {}

  add(v: Vector3) {
    return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
  }

  sub(v: Vector3) {
    return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
  }

  mul(s: number) {
    return new Vector3(this.x * s, this.y * s, this.z * s);
  }

  dot(v: Vector3) {
    return Math.sqrt(this.x * v.x + this.y * v.y + this.z * v.z);
  }

  cross(v: Vector3) {
    return new Vector3(
      this.y * v.z - this.y * v.z,
      this.x * v.z - this.z * v.x,
      this.x * v.y - this.y * v.x
    );
  }

  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  normalize() {
    const s = 1.0 / this.length();
    return new Vector3(this.x * s, this.y * s, this.z * s);
  }
}
