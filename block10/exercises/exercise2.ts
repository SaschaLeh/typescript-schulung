/**
 * Exercise 2: Generic Interfaces and Classes
 * 
 * In this exercise, you'll work with generic interfaces and implement classes
 * that make use of them. You'll create containers that can hold different types.
 */

// Task 1: Complete the generic Repository interface
// This interface defines a common pattern for data access
interface Repository<T> {
  // Define methods for:
  // - getById: takes an id (number) and returns a T or null
  // - getAll: returns an array of T
  // - create: takes a T and returns the created item (T)
  // - update: takes an id and a T, returns a boolean indicating success
  // - delete: takes an id, returns a boolean indicating success
  
  // Add the method signatures here
}

// Task 2: Create a User type with id, name, and email properties
type User = {
  // Define the User type
}

// Task 3: Implement the UserRepository class that implements Repository<User>
export class UserRepository implements Repository<User> {
  // Add private storage for users
  
  constructor() {
    // Initialize the storage
  }
  
  // Implement all the methods from Repository<User>
  // Implement all required methods here
}

// Task 4: Create a generic Pair<T, U> interface that represents a pair of values
interface Pair<T, U> {
  // Define the properties: first (of type T) and second (of type U)
}

// Task 5: Implement a KeyValuePair class that implements Pair<K, V>
export class KeyValuePair<K, V> implements Pair<K, V> {
  // Implement this class with constructor and properties
}

// Task 6: Create a generic Stack<T> class with push, pop, and peek methods
export class Stack<T> {
  // Implement this class with private storage, push, pop, peek, and isEmpty methods
}

// Test your implementations here
function testExercise2() {
  console.log("Testing UserRepository:");
  const userRepo = new UserRepository();
  
  const user1 = userRepo.create({ id: 1, name: "Alice", email: "alice@example.com" });
  const user2 = userRepo.create({ id: 2, name: "Bob", email: "bob@example.com" });
  
  console.log(userRepo.getById(1));
  console.log(userRepo.getAll());
  console.log(userRepo.update(1, { id: 1, name: "Alicia", email: "alicia@example.com" }));
  console.log(userRepo.getById(1));
  console.log(userRepo.delete(2));
  console.log(userRepo.getAll());
  
  console.log("\nTesting KeyValuePair:");
  const pair1 = new KeyValuePair("name", "Alice");
  const pair2 = new KeyValuePair(1, true);
  console.log(pair1);
  console.log(pair2);
  
  console.log("\nTesting Stack:");
  const stack = new Stack<number>();
  stack.push(1);
  stack.push(2);
  stack.push(3);
  console.log(stack.peek());
  console.log(stack.pop());
  console.log(stack.pop());
  console.log(stack.isEmpty());
  console.log(stack.pop());
  console.log(stack.isEmpty());
}

// Uncomment to run the test
// testExercise2(); 