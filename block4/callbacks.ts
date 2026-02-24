/**
 * TypeScript Exercise: Callback Functions
 * 
 * This file demonstrates the use of callback functions in TypeScript,
 * including how to define, type, and use callbacks in various scenarios.
 */

// Define a function type for a simple callback
type StringCallbackFn = (result: string) => void;

/**
 * Processes a user input and passes the result to a callback function
 * @param name The user's name to process
 * @param callback Function to call with the processed result
 */
function processUserInput(name: string, callback: StringCallbackFn): void {
  // Process the input data
  const formattedName = name.trim().toUpperCase();
  
  // Call the callback with the processed result
  callback(formattedName);
}

/**
 * A greeting function that can be used as a callback
 * @param formattedName The formatted name to use in the greeting
 */
function greetUser(formattedName: string): void {
  console.log(`Hello, ${formattedName}!`);
}

// Example 1: Using a named function as callback
console.log("Example 1: Named function callback");
processUserInput("  john smith  ", greetUser);
// Output: Hello, JOHN SMITH!

// Example 2: Using an arrow function as callback
console.log("\nExample 2: Arrow function callback");
processUserInput("  alice brown  ", (formattedName) => {
  console.log(`Welcome back, ${formattedName}!`);
});
// Output: Welcome back, ALICE BROWN!

/**
 * An array processing function that takes a callback
 * @param numbers Array of numbers to process
 * @param callback Function called with each processed number
 */
function processNumbers(
  numbers: number[], 
  callback: (num: number, index: number) => void
): void {
  numbers.forEach((num, index) => {
    callback(num, index);
  });
}

// Example 3: Processing array elements with a callback
console.log("\nExample 3: Processing array elements");
const numbers = [1, 2, 3, 4, 5];
processNumbers(numbers, (num, index) => {
  console.log(`Number at position ${index}: ${num} (doubled: ${num * 2})`);
});

/**
 * Asynchronous example using a callback (simulating API request)
 * @param id The ID to fetch data for
 * @param callback Function called with the result
 */
function fetchUserData(
  id: number, 
  callback: (error: Error | null, data?: { name: string, age: number }) => void
): void {
  // Simulate network delay
  setTimeout(() => {
    // Simulate successful API call
    if (id > 0) {
      callback(null, { name: "Jane Doe", age: 30 });
    } else {
      // Simulate error
      callback(new Error("Invalid user ID"));
    }
  }, 1000);
}

// Example 4: Asynchronous callback with error handling
console.log("\nExample 4: Asynchronous callback");
console.log("Fetching user data...");
fetchUserData(1, (error, data) => {
  if (error) {
    console.error("Error:", error.message);
  } else {
    console.log("User data:", data);
  }
});

// Exercise:
// 1. Create a function that takes an array of strings and a callback
//    that transforms each string, then returns a new array of transformed strings
// 2. Create a debounce function that takes a callback and a delay
//    and returns a function that will only execute after the delay has passed 