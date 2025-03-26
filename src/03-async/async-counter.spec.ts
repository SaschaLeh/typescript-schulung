import { AsyncCounter } from './async-counter';

describe('AsyncCounter', () => {
  let counter: AsyncCounter;

  beforeEach(() => {
    counter = new AsyncCounter();
  });

  it('should start with count of 0', () => {
    expect(counter.count).toBe(0);
  });

  describe('incrementAsync', () => {
    it('should increment the count asynchronously', async () => {
      // Write your async test here
    });

    it('should be able to chain multiple increments', async () => {
      // Write your test to chain promises
    });
  });

  describe('fetchInitialCount', () => {
    it('should update count with fetched value', async () => {
      // Write your test here
    });

    it('should handle failures gracefully', async () => {
      // Write your test to check error handling
    });
  });
});
