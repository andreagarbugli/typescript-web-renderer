import { Matrix3 } from '../../src/math/matrix3';

describe('Matrix3', () => {
  let A: Matrix3;
  let B: Matrix3;

  beforeEach(() => {
    A = Matrix3.fromValue(10);
    B = Matrix3.fromValue(2);
  });

  describe('The identity', () => {
    it('should be identiyt', () => {});
  });

  describe('The add function of the Matrix3 instance', () => {
    it('should return a matrix sum of the two matrices', () => {
      let C = Matrix3.fromValue(12);
      expect(A.add(B)).toEqual(C);
    });

    it('should be associative', () => {
      let C = Matrix3.fromValue(12);
      expect(A.add(B).add(C)).toEqual(B.add(C).add(A));
    });

    it('should be commutative', () => {
      expect(A.add(B)).toEqual(B.add(A));
    });
  });

  describe('The sub function of the Matrix3 instance', () => {
    it('should return a matrix subtraction of the two matrices', () => {
      let C = Matrix3.fromValue(8);
      expect(A.sub(B)).toEqual(C);
    });
  });

  describe('The mulScalar function of the Matrix3 instance', () => {
    it('should return a matrix', () => {
      let C = Matrix3.fromValue(4);
      expect(B.mulScalar(2.0)).toEqual(C);
    });
  });
});
