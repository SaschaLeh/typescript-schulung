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
      const resultPromise = counter.incrementAsync();
      // Count shouldn't change immediately
      expect(counter.count).toBe(0);
      
      // After the promise resolves, count should be incremented
      const result = await resultPromise;
      expect(result).toBe(1);
      expect(counter.count).toBe(1);
    });

    it('should be able to chain multiple increments', async () => {
      // Chain multiple incrementAsync calls
      const result = await counter.incrementAsync()
        .then(() => counter.incrementAsync())
        .then(() => counter.incrementAsync());
      
      expect(result).toBe(3);
      expect(counter.count).toBe(3);
    });

    it('should handle concurrent increments correctly', async () => {
      // Start multiple increments concurrently
      const promise1 = counter.incrementAsync();
      const promise2 = counter.incrementAsync();
      const promise3 = counter.incrementAsync();
      
      // Wait for all to complete
      await Promise.all([promise1, promise2, promise3]);
      
      // Final count should be 3
      expect(counter.count).toBe(3);
    });
  });

  describe('fetchInitialCount', () => {
    it('should update count with fetched value', async () => {
      // Mock Math.random to return a consistent value for testing
      const originalRandom = Math.random;
      Math.random = jest.fn().mockReturnValue(0.5);
      
      const fetchedCount = await counter.fetchInitialCount();
      
      // With random = 0.5, the count should be 50 (0.5 * 100)
      expect(fetchedCount).toBe(50);
      expect(counter.count).toBe(50);
      
      // Restore original Math.random
      Math.random = originalRandom;
    });

    it('should handle failures gracefully', async () => {
      // Test that the promise rejects when shouldFail is true
      await expect(counter.fetchInitialCount(true))
        .rejects.toThrow('Failed to fetch initial count');
      
      // Count should remain unchanged
      expect(counter.count).toBe(0);
    });

    it('should allow resetting after failure', async () => {
      // Try to fetch and fail
      try {
        await counter.fetchInitialCount(true);
      } catch (error) {
        // Ignore the error
      }
      
      // Try again with success
      const fetchedCount = await counter.fetchInitialCount(false);
      
      // Count should be updated now
      expect(counter.count).toBe(fetchedCount);
    });

    it('should be able to increment after fetch', async () => {
      // Mock Math.random
      const originalRandom = Math.random;
      Math.random = jest.fn().mockReturnValue(0.3);
      
      // Fetch, then increment
      await counter.fetchInitialCount();
      const newCount = await counter.incrementAsync();
      
      // With random = 0.3, the fetched count should be 30, then incremented to 31
      expect(newCount).toBe(31);
      expect(counter.count).toBe(31);
      
      // Restore original Math.random
      Math.random = originalRandom;
    });
  });

  // Additional tests for more complex async patterns
  describe('combined async operations', () => {
    it('should handle sequential operations correctly', async () => {
      // Mock Math.random for consistent testing
      const originalRandom = Math.random;
      Math.random = jest.fn().mockReturnValue(0.4);
      
      // Perform a sequence of operations
      await counter.fetchInitialCount();
      await counter.incrementAsync();
      await counter.incrementAsync();
      
      // 40 (from fetch) + 2 increments = 42
      expect(counter.count).toBe(42);
      
      // Restore original Math.random
      Math.random = originalRandom;
    });

    it('should be able to use try-catch for error handling', async () => {
      let errorCaught = false;
      
      try {
        await counter.fetchInitialCount(true);
      } catch (error: unknown) {
        errorCaught = true;
        
        expect((error as Error).message).toBe('Failed to fetch initial count');
      }
      
      expect(errorCaught).toBe(true);
      expect(counter.count).toBe(0); // Count should remain unchanged
    });
  });
});
