/**
 * Exercise 3: Advanced Generics with Constraints
 * 
 * In this exercise, you'll work with more complex generic patterns,
 * including constraints, mapped types, and conditional types.
 */

// Task 1: Complete the 'createLogger' function with constraint
// The function should create a logger that prepends a category to each message
// The constraint ensures that only allowed categories can be used
type LogCategory = "INFO" | "WARNING" | "ERROR";

export function createLogger<T extends LogCategory>(category: T) {
  // Return a function that logs messages with the category prefix
  // Example: const errorLogger = createLogger("ERROR");
  //          errorLogger("Failed to connect"); // Logs: "ERROR: Failed to connect"
  
  // Implement this function
  return null as any; // Replace this line
}

// Task 2: Implement a 'SafeAccess' type that makes all properties of T optional and nested
// This should create a type that allows safe access to nested properties without null checks
export type SafeAccess<T> = {
  // Implement this mapped type
};

// Example usage:
type User = {
  name: string;
  address: {
    street: string;
    city: string;
  };
  contacts: {
    email: string;
    phone?: string;
  };
};

// Task 3: Create a 'pick' function that extracts specific properties from an object
// The function should be type-safe and return an object with only the selected properties
export function pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
  // Implement this function
  return null as any; // Replace this line
}

// Task 4: Implement a 'DataProcessor' class with conditional method types
// The class should handle different data types (string, number, object) differently
export class DataProcessor<T> {
  private data: T;
  
  constructor(initialData: T) {
    this.data = initialData;
  }
  
  // Implement process method with type overloads or conditional types
  // For strings: should return the uppercase version
  // For numbers: should return the number multiplied by 2
  // For arrays: should return the array length
  // For objects: should return the number of keys
  process(): any {
    // Implement with type checking logic
    return null as any; // Replace this line
  }
  
  // Add a transform method that applies a type-safe transformation to the data
  transform<U>(transformFn: (data: T) => U): DataProcessor<U> {
    // Implement this method
    return null as any; // Replace this line
  }
}

// Task 5: Create a utility type 'FunctionProperties' that extracts only the function properties from a type
export type FunctionProperties<T> = {
  // Implement this utility type to pick only the properties of T that are functions
};

// Test your implementations here
function testExercise3() {
  console.log("Testing createLogger:");
  const infoLogger = createLogger("INFO");
  const errorLogger = createLogger("ERROR");
  
  infoLogger("Application started");
  errorLogger("Failed to connect to database");
  
  console.log("\nTesting pick:");
  const user = {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    age: 30
  };
  console.log(pick(user, "id", "name"));
  console.log(pick(user, "email"));
  
  console.log("\nTesting DataProcessor:");
  const stringProcessor = new DataProcessor("hello");
  const numberProcessor = new DataProcessor(5);
  const arrayProcessor = new DataProcessor([1, 2, 3]);
  const objectProcessor = new DataProcessor({ a: 1, b: 2 });
  
  console.log(stringProcessor.process());
  console.log(numberProcessor.process());
  console.log(arrayProcessor.process());
  console.log(objectProcessor.process());
  
  const transformedProcessor = stringProcessor.transform(s => s.length);
  console.log(transformedProcessor.process());
}

// Uncomment to run the test
// testExercise3(); 