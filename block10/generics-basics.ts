// Generics Basics in TypeScript

// Problem: We want to create functions that work with different types
// without losing type information

// Non-generic approach (using 'any')
function identityAny(arg: any): any {
  return arg;
}

// This works, but we've lost the type information
const num1 = identityAny(42); // type is 'any'
const str1 = identityAny("hello"); // type is 'any'

// Using generics to preserve type information
function identity<T>(arg: T): T {
  return arg;
}

// Now TypeScript knows the exact type that's returned
const num2 = identity<number>(42); // type is 'number'
const str2 = identity<string>("hello"); // type is 'string'

// Type inference with generics
// TypeScript can often infer the type parameter
const num3 = identity(42); // type is inferred as 'number'
const str3 = identity("hello"); // type is inferred as 'string'

// Working with arrays using generics
function firstElement<T>(arr: T[]): T | undefined {
  return arr.length > 0 ? arr[0] : undefined;
}

const firstNum = firstElement([1, 2, 3]); // type is 'number | undefined'
const firstStr = firstElement(["a", "b", "c"]); // type is 'string | undefined'
const empty = firstElement([]); // type is 'undefined'

console.log("First number:", firstNum);
console.log("First string:", firstStr);
console.log("Empty array first element:", empty);

// Generics with multiple type parameters
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const p1 = pair<string, number>("key", 42);
const p2 = pair("value", true); // Types inferred as [string, boolean]

console.log("Pair 1:", p1);
console.log("Pair 2:", p2);

// Generic arrow functions
const getProperty = <T, K extends keyof T>(obj: T, key: K): T[K] => {
  return obj[key];
};

const person = {
  name: "John",
  age: 30,
  isEmployed: true
};

const name = getProperty(person, "name"); // type is 'string'
const age = getProperty(person, "age"); // type is 'number'
// const invalid = getProperty(person, "salary"); // Error: "salary" is not a key of person

console.log("Person's name:", name);
console.log("Person's age:", age);

// Generic type aliases
type Container<T> = { value: T };

const numberContainer: Container<number> = { value: 42 };
const stringContainer: Container<string> = { value: "hello" };

// Arrays with specific types
const stringArray: Array<string> = ["a", "b", "c"];
const numberArray: Array<number> = [1, 2, 3];

// Generics with promises
async function fetchData<T>(url: string): Promise<T> {
  // In a real implementation, this would use fetch or similar
  // This is a simplified example
  return new Promise<T>((resolve) => {
    // Simulating network delay
    setTimeout(() => {
      // Simulated data
      const mockData = { success: true, data: "Sample data" } as unknown as T;
      resolve(mockData);
    }, 100);
  });
}

interface UserData {
  id: number;
  name: string;
  email: string;
}

// Usage with a specific return type
async function demonstratePromise() {
  try {
    const userData = await fetchData<UserData>("https://api.example.com/users/1");
    console.log("User data:", userData);
    // TypeScript knows userData has id, name, and email properties
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Uncomment to run the async example
// demonstratePromise();

// Default type parameters
function createDefaultArray<T = string>(length: number, defaultValue: T): T[] {
  return new Array<T>(length).fill(defaultValue);
}

const defaultStrings = createDefaultArray(3, "default"); // type is string[]
const numbers = createDefaultArray<number>(3, 0); // explicit type parameter

console.log("Default string array:", defaultStrings);
console.log("Number array:", numbers);

export {
  identity,
  firstElement,
  pair,
  getProperty,
  Container,
  fetchData
}; 