/**
 * Exercise 1: Generic Functions and Basic Usage
 * 
 * In this exercise, you'll implement several utility functions using generics.
 * These functions demonstrate the power of code reuse with type safety.
 */

// Task 1: Complete the 'identity' function that returns whatever is passed in
// The function should infer the type from the argument
// Example: identity(5) should return 5 with type number
export function identity<T>(value: T): T {
  // Implement this function
  return null as any; // Replace this line
}

// Task 2: Create a 'firstElement' function that returns the first element of an array
// If the array is empty, return undefined
// Example: firstElement([1, 2, 3]) should return 1
export function firstElement<T>(arr: T[]): T | undefined {
  // Implement this function
  return null as any; // Replace this line
}

// Task 3: Implement a 'swap' function that swaps the values of a tuple
// Example: swap([1, "hello"]) should return ["hello", 1]
export function swap<T, U>(tuple: [T, U]): [U, T] {
  // Implement this function
  return null as any; // Replace this line
}

// Task 4: Create a 'pickProperty' function that returns a property from an object
// The function should be type-safe: the property must exist on the object
// Example: pickProperty({name: "Alice", age: 25}, "name") should return "Alice"
export function pickProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  // Implement this function
  return null as any; // Replace this line
}

// Task 5: Create a 'createPair' function that creates a tuple from two values
// Example: createPair("hello", 42) should return ["hello", 42]
export function createPair<T, U>(first: T, second: U): [T, U] {
  // Implement this function
  return null as any; // Replace this line
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