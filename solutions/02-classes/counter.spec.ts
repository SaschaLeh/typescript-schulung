import { Counter } from './counter';

describe('Counter', () => {
  let counter: Counter;

  beforeEach(() => {
    counter = new Counter();
  });

  it('should start with count of 0', () => {
    expect(counter.count).toBe(0);
  });

  describe('increment method', () => {
    it('should increment the count by 1', () => {
      counter.increment();
      expect(counter.count).toBe(1);
    });

    it('should increment multiple times correctly', () => {
      counter.increment();
      counter.increment();
      counter.increment();
      expect(counter.count).toBe(3);
    });

    it('should return the new count value', () => {
      const result = counter.increment();
      expect(result).toBe(1);
    });
  });

  describe('decrement method', () => {
    it('should decrement the count by 1', () => {
      counter.setValue(5);
      counter.decrement();
      expect(counter.count).toBe(4);
    });

    it('should decrement multiple times correctly', () => {
      counter.setValue(10);
      counter.decrement();
      counter.decrement();
      counter.decrement();
      expect(counter.count).toBe(7);
    });

    it('should allow negative values', () => {
      counter.decrement();
      expect(counter.count).toBe(-1);
    });

    it('should return the new count value', () => {
      counter.setValue(5);
      const result = counter.decrement();
      expect(result).toBe(4);
    });
  });

  describe('reset method', () => {
    it('should reset the count to 0', () => {
      counter.setValue(10);
      counter.reset();
      expect(counter.count).toBe(0);
    });

    it('should return 0 after reset', () => {
      counter.setValue(10);
      const result = counter.reset();
      expect(result).toBe(0);
    });
  });

  describe('setValue method', () => {
    it('should set the count to the provided value', () => {
      counter.setValue(42);
      expect(counter.count).toBe(42);
    });

    it('should handle negative values', () => {
      counter.setValue(-10);
      expect(counter.count).toBe(-10);
    });

    it('should return the new count value', () => {
      const result = counter.setValue(42);
      expect(result).toBe(42);
    });
  });
});
