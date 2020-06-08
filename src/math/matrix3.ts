import { Vector3 } from './vector3';

export class Matrix3 {
  private _n: number[][] = [
    [1.0, 0.0, 0.0],
    [0.0, 1.0, 0.0],
    [0.0, 0.0, 1.0]
  ];

  public static fromVectors(a: Vector3, b: Vector3, c: Vector3) {
    const m = new Matrix3();
    m._n[0][0] = a.x;
    m._n[1][0] = a.y;
    m._n[2][0] = a.z;
    m._n[0][1] = b.x;
    m._n[1][1] = b.y;
    m._n[2][1] = b.z;
    m._n[0][2] = c.x;
    m._n[1][2] = c.y;
    m._n[2][2] = c.z;

    return m;
  }

  public static fromValue(s: number) {
    const m = new Matrix3();
    m._n[0][0] = s;
    m._n[1][1] = s;
    m._n[2][2] = s;

    return m;
  }

  public static fromValues(
    m00: number,
    m10: number,
    m20: number,
    m01: number,
    m11: number,
    m21: number,
    m02: number,
    m12: number,
    m22: number
  ) {
    const m = new Matrix3();
    m._n[0][0] = m00;
    m._n[1][0] = m10;
    m._n[2][0] = m20;
    m._n[0][1] = m01;
    m._n[1][1] = m11;
    m._n[2][1] = m21;
    m._n[0][2] = m02;
    m._n[1][2] = m12;
    m._n[2][2] = m22;

    return m;
  }

  public static identity() {
    return new Matrix3();
  }

  add(m: Matrix3) {
    return Matrix3.fromValues(
      this._n[0][0] + m._n[0][0],
      this._n[1][0] + m._n[1][0],
      this._n[2][0] + m._n[2][0],
      this._n[0][1] + m._n[0][1],
      this._n[1][1] + m._n[1][1],
      this._n[2][1] + m._n[2][1],
      this._n[0][2] + m._n[0][2],
      this._n[1][2] + m._n[1][2],
      this._n[2][2] + m._n[2][2]
    );
  }

  sub(m: Matrix3) {
    return Matrix3.fromValues(
      this._n[0][0] - m._n[0][0],
      this._n[1][0] - m._n[1][0],
      this._n[2][0] - m._n[2][0],
      this._n[0][1] - m._n[0][1],
      this._n[1][1] - m._n[1][1],
      this._n[2][1] - m._n[2][1],
      this._n[0][2] - m._n[0][2],
      this._n[1][2] - m._n[1][2],
      this._n[2][2] - m._n[2][2]
    );
  }

  mulScalar(s: number) {
    return Matrix3.fromValues(
      this._n[0][0] * s,
      this._n[1][0] * s,
      this._n[2][0] * s,
      this._n[0][1] * s,
      this._n[1][1] * s,
      this._n[2][1] * s,
      this._n[0][2] * s,
      this._n[1][2] * s,
      this._n[2][2] * s
    );
  }
}
