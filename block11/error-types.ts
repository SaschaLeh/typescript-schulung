// Error types in TypeScript

// Built-in error types
const standardError = new Error('This is a standard error');
const typeError = new TypeError('This is a type error');
const rangeError = new RangeError('This is a range error');
const syntaxError = new SyntaxError('This is a syntax error');

// Try/catch block example
function divideNumbers(a: number, b: number): number {
  try {
    if (b === 0) {
      throw new Error('Division by zero is not allowed');
    }
    return a / b;
  } catch (error) {
    console.error('An error occurred:', error instanceof Error ? error.message : String(error));
    // Re-throw or return a default value
    return 0;
  }
}

console.log(divideNumbers(10, 2)); // 5
console.log(divideNumbers(10, 0)); // 0 (after error handling) 