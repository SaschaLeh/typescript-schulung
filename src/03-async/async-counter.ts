/**
 * A counter with asynchronous methods
 */
export class AsyncCounter {
    private _count: number = 0;
  
    get count(): number {
      return this._count;
    }
  
    /**
     * Increments the counter after a delay
     * @returns A Promise that resolves with the new count
     */
    incrementAsync(): Promise<number> {
      // Implement this method to return a Promise
      // that resolves after incrementing the counter
    }
  
    /**
     * Simulates fetching an initial count from an API
     * @param shouldFail Set to true to simulate a failure
     */
    fetchInitialCount(shouldFail: boolean = false): Promise<number> {
      // Implement this method to simulate an API fetch
      // If shouldFail is true, the Promise should reject
    }
  }
  