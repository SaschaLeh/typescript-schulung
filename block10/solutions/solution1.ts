/**
 * Solution 1: Generic Functions and Basic Usage
 */

// Task 1: Complete the 'identity' function
export function identity<T>(value: T): T {
  return value;
}

// Task 2: Create a 'firstElement' function
export function firstElement<T>(arr: T[]): T | undefined {
  if (arr.length === 0) {
    return undefined;
  }
  return arr[0];
}

// Task 3: Implement a 'swap' function
export function swap<T, U>(tuple: [T, U]): [U, T] {
  const [first, second] = tuple;
  return [second, first];
}

// Task 4: Create a 'pickProperty' function
export function pickProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// Task 5: Create a 'createPair' function
export function createPair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

// Test your functions here
function testExercise1() {
  console.log("Testing identity:");
  console.log(identity(5));
  console.log(identity("hello"));
  console.log(identity(true));
  
  console.log("\nTesting firstElement:");
  console.log(firstElement([1, 2, 3]));
  console.log(firstElement(["a", "b", "c"]));
  console.log(firstElement([]));
  
  console.log("\nTesting swap:");
  console.log(swap([1, "hello"]));
  console.log(swap([true, 42]));
  
  console.log("\nTesting pickProperty:");
  console.log(pickProperty({name: "Alice", age: 25}, "name"));
  console.log(pickProperty({name: "Alice", age: 25}, "age"));
  
  console.log("\nTesting createPair:");
  console.log(createPair("hello", 42));
  console.log(createPair(true, {name: "Bob"}));
}

// Uncomment to run the test
// testExercise1(); 