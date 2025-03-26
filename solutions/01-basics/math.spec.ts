import { add, subtract, multiply, divide } from './math';

describe('Math Functions', () => {
  describe('add function', () => {
    it('should add two positive numbers correctly', () => {
      expect(add(2, 3)).toBe(5);
      expect(add(10, 20)).toBe(30);
    });

    it('should handle negative numbers', () => {
      expect(add(-2, 3)).toBe(1);
      expect(add(2, -3)).toBe(-1);
      expect(add(-2, -3)).toBe(-5);
    });

    it('should return the same number when adding zero', () => {
      expect(add(5, 0)).toBe(5);
      expect(add(0, 5)).toBe(5);
      expect(add(0, 0)).toBe(0);
    });
  });

  describe('subtract function', () => {
    it('should subtract two numbers correctly', () => {
      expect(subtract(5, 3)).toBe(2);
      expect(subtract(10, 20)).toBe(-10);
    });

    it('should handle negative numbers', () => {
      expect(subtract(-2, 3)).toBe(-5);
      expect(subtract(2, -3)).toBe(5);
      expect(subtract(-2, -3)).toBe(1);
    });
  });

  describe('multiply function', () => {
    it('should multiply two numbers correctly', () => {
      expect(multiply(2, 3)).toBe(6);
      expect(multiply(10, 20)).toBe(200);
    });

    it('should handle negative numbers', () => {
      expect(multiply(-2, 3)).toBe(-6);
      expect(multiply(2, -3)).toBe(-6);
      expect(multiply(-2, -3)).toBe(6);
    });

    it('should return zero when multiplying by zero', () => {
      expect(multiply(5, 0)).toBe(0);
      expect(multiply(0, 5)).toBe(0);
    });
  });

  describe('divide function', () => {
    it('should divide two numbers correctly', () => {
      expect(divide(6, 3)).toBe(2);
      expect(divide(10, 2)).toBe(5);
    });

    it('should handle negative numbers', () => {
      expect(divide(-6, 3)).toBe(-2);
      expect(divide(6, -3)).toBe(-2);
      expect(divide(-6, -3)).toBe(2);
    });

    it('should throw an error when dividing by zero', () => {
      expect(() => divide(5, 0)).toThrow('Division by zero is not allowed');
    });
  });
});
