/**
 * Exercise 1: Fakultätsfunktion (SOLUTION)
 */

// Iterative Fakultät mit for-Schleife
function factorial(n: number): number {
  if (n < 0) {
    throw new Error("Factorial is not defined for negative numbers");
  }

  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

// Rekursive Fakultät
function factorialRecursive(n: number): number {
  if (n < 0) {
    throw new Error("Factorial is not defined for negative numbers");
  }
  if (n === 0) {
    return 1;
  }
  return n * factorialRecursive(n - 1);
}

// Memoized Fakultät mit Closure
function createMemoizedFactorial(): (n: number) => number {
  const cache = new Map<number, number>();

  return function memoFactorial(n: number): number {
    if (n < 0) {
      throw new Error("Factorial is not defined for negative numbers");
    }

    if (cache.has(n)) {
      console.log(`  Cache-Hit für ${n}! = ${cache.get(n)}`);
      return cache.get(n)!;
    }

    let result: number;
    if (n === 0) {
      result = 1;
    } else {
      result = n * memoFactorial(n - 1);
    }

    cache.set(n, result);
    return result;
  };
}

// Demonstration code
console.log("=== Iterative Fakultät ===");
console.log("5! =", factorial(5));       // 120
console.log("0! =", factorial(0));       // 1
console.log("10! =", factorial(10));     // 3628800

console.log("\n=== Rekursive Fakultät ===");
console.log("5! =", factorialRecursive(5));   // 120
console.log("0! =", factorialRecursive(0));   // 1

console.log("\n=== Memoized Fakultät ===");
const memoFactorial = createMemoizedFactorial();
console.log("5! =", memoFactorial(5));   // 120 (berechnet)
console.log("5! =", memoFactorial(5));   // 120 (aus Cache!)
console.log("3! =", memoFactorial(3));   // 6   (aus Cache, weil 3 bei 5! schon berechnet wurde)
console.log("7! =", memoFactorial(7));   // 5040

console.log("\n=== Edge-Case: Negative Zahl ===");
try {
  factorial(-1);
} catch (e) {
  console.log("Error:", (e as Error).message);
}
