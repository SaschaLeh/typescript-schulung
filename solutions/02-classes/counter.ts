/**
 * A simple counter class
 */
export class Counter {
  private _count: number = 0;

  get count(): number {
    return this._count;
  }

  increment(): number {
    this._count += 1;
    return this._count;
  }

  decrement(): number {
    this._count -= 1;
    return this._count;
  }

  reset(): number {
    this._count = 0;
    return this._count;
  }

  setValue(n: number): number {
    this._count = n;
    return this._count;
  }
}
