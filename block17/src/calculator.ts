/**
 * Calculator Class
 *
 * A simple calculator with basic arithmetic operations and history tracking.
 * Used as the source module for the Jest testing examples.
 */

export class Calculator {
  private _history: string[] = [];

  add(a: number, b: number): number {
    const result = a + b;
    this._history.push(`${a} + ${b} = ${result}`);
    return result;
  }

  subtract(a: number, b: number): number {
    const result = a - b;
    this._history.push(`${a} - ${b} = ${result}`);
    return result;
  }

  multiply(a: number, b: number): number {
    const result = a * b;
    this._history.push(`${a} * ${b} = ${result}`);
    return result;
  }

  divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error('Division by zero is not allowed');
    }
    const result = a / b;
    this._history.push(`${a} / ${b} = ${result}`);
    return result;
  }

  history(): string[] {
    return [...this._history];
  }

  clearHistory(): void {
    this._history = [];
  }
}
