import { Vector2 } from '../../src/math/vector2';
import { Vector3 } from '../../src/math/vector3';

describe('Vector2', () => {
  let a: Vector2;
  let b: Vector2;

  beforeEach(() => {
    a = new Vector2(1.0, 2.0);
    b = new Vector2(2.0, 3.0);
  });

  it('should calculate the length', () => {
    expect(a.length()).toBeCloseTo(Math.sqrt(5.0));
  });

  it('should return a normalized vector', () => {
    expect(a.normalize().length()).toBeCloseTo(1.0);
  });

  it('should add two vectors', () => {
    let c = new Vector2(3.0, 5.0);
    expect(a.add(b)).toEqual(c);
  });

  it('should subtract two vectors', () => {
    let c = new Vector2(-1.0, -1.0);
    expect(a.sub(b)).toEqual(c);
  });
});

describe('Vector3', () => {
  let a: Vector3;
  let b: Vector3;

  beforeEach(() => {
    a = new Vector3(1.0, 2.0, 1.0);
    b = new Vector3(2.0, 3.0, 2.0);
  });

  it('should calculate the length', () => {
    expect(a.length()).toBeCloseTo(Math.sqrt(6.0));
  });

  it('should return a normalized vector', () => {
    expect(a.normalize().length()).toBeCloseTo(1.0);
  });

  describe('The add function of the Vector3 instance', () => {
    let c: Vector3;

    beforeEach(() => {
      c = new Vector3(3.0, 5.0, 3.0);
    });

    it('should add two vectors', () => {
      expect(a.add(b)).toEqual(c);
    });

    it('should be associative for vector addition', () => {
      expect(a.add(b).add(c)).toEqual(b.add(c).add(a));
    });

    it('should be commutative', () => {
      expect(a.add(b)).toEqual(b.add(a));
    });
  });

  describe('The sub function of the Vector3 instance', () => {
    it('should subtract two vectors', () => {
      let c = new Vector3(-1.0, -1.0, -1.0);
      expect(a.sub(b)).toEqual(c);
    });
  });

  describe('The mul function of the Vector3 instance', () => {
    it('should be associative for scalar-vector multiplication', () => {
      const s = 2.0;
      const t = 3.0;
      expect(a.mul(s * t)).toEqual(a.mul(t).mul(s));
    });
  });

  describe('The mul and add functions of the Vector3 instance', () => {
    it('should follow the distributive law', () => {
      const s = 2.0;
      const t = 3.0;
      expect(a.add(b).mul(t)).toEqual(a.mul(t).add(b.mul(t)));
      expect(a.mul(s + t)).toEqual(a.mul(s).add(a.mul(t)));
    });
  });

  describe('The dot and cross functions of the Vector3 instance', () => {
    const u = new Vector3(2.0, 0.0, 0.0);
    const v = new Vector3(0.0, 2.0, 0.0);
    it('should be zero if vectors are perpendicular', () => {
      expect(u.dot(v)).toEqual(0.0);
    });

    it('should be a vector perpendicular to the two vectors', () => {
      expect(u.cross(v)).toEqual(new Vector3(0.0, 0.0, 4.0));
    });
  });
});
