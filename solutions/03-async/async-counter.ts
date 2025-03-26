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
    return new Promise((resolve) => {
      setTimeout(() => {
        this._count++;
        resolve(this._count);
      }, 100); // Small delay for demonstration purposes
    });
  }

  /**
   * Simulates fetching an initial count from an API
   * @param shouldFail Set to true to simulate a failure
   */
  fetchInitialCount(shouldFail: boolean = false): Promise<number> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldFail) {
          reject(new Error('Failed to fetch initial count'));
        } else {
          // Simulate getting a random count from an API
          const fetchedCount = Math.floor(Math.random() * 100);
          this._count = fetchedCount;
          resolve(fetchedCount);
        }
      }, 100);
    });
  }
}
