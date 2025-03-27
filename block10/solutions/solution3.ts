/**
 * Solution 3: Advanced Generics with Constraints
 */

// Task 1: Complete the 'createLogger' function with constraint
type LogCategory = "INFO" | "WARNING" | "ERROR";

export function createLogger<T extends LogCategory>(category: T) {
  return (message: string): void => {
    console.log(`${category}: ${message}`);
  };
}

// Task 2: Implement a 'SafeAccess' type
export type SafeAccess<T> = {
  [K in keyof T]?: T[K] extends object ? SafeAccess<T[K]> : T[K];
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

// Task 3: Create a 'pick' function
export function pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach(key => {
    result[key] = obj[key];
  });
  return result;
}

// Task 4: Implement a 'DataProcessor' class
export class DataProcessor<T> {
  private data: T;
  
  constructor(initialData: T) {
    this.data = initialData;
  }
  
  process(): any {
    if (typeof this.data === 'string') {
      return this.data.toUpperCase();
    } else if (typeof this.data === 'number') {
      return this.data * 2;
    } else if (Array.isArray(this.data)) {
      return this.data.length;
    } else if (typeof this.data === 'object' && this.data !== null) {
      return Object.keys(this.data).length;
    }
    return this.data;
  }
  
  transform<U>(transformFn: (data: T) => U): DataProcessor<U> {
    return new DataProcessor<U>(transformFn(this.data));
  }
}

// Task 5: Create a utility type 'FunctionProperties'
export type FunctionProperties<T> = {
  [K in keyof T as T[K] extends Function ? K : never]: T[K];
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
  
  // Example of FunctionProperties
  class Example {
    name: string = "test";
    age: number = 25;
    
    greet(): string {
      return `Hello, my name is ${this.name}`;
    }
    
    calculateBirthYear(): number {
      return new Date().getFullYear() - this.age;
    }
  }
  
  type ExampleFunctions = FunctionProperties<Example>;
  // Should include only greet and calculateBirthYear methods
}

// Uncomment to run the test
// testExercise3(); 