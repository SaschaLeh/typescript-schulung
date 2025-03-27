/**
 * Solution 2: Generic Interfaces and Classes
 */

// Task 1: Complete the generic Repository interface
interface Repository<T> {
  getById(id: number): T | null;
  getAll(): T[];
  create(item: T): T;
  update(id: number, item: T): boolean;
  delete(id: number): boolean;
}

// Task 2: Create a User type
type User = {
  id: number;
  name: string;
  email: string;
};

// Task 3: Implement the UserRepository class
export class UserRepository implements Repository<User> {
  private users: User[] = [];
  
  constructor() {
    this.users = [];
  }
  
  getById(id: number): User | null {
    const user = this.users.find(user => user.id === id);
    return user || null;
  }
  
  getAll(): User[] {
    return [...this.users];
  }
  
  create(user: User): User {
    this.users.push(user);
    return user;
  }
  
  update(id: number, updatedUser: User): boolean {
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) {
      return false;
    }
    this.users[index] = updatedUser;
    return true;
  }
  
  delete(id: number): boolean {
    const initialLength = this.users.length;
    this.users = this.users.filter(user => user.id !== id);
    return this.users.length !== initialLength;
  }
}

// Task 4: Create a generic Pair interface
interface Pair<T, U> {
  first: T;
  second: U;
}

// Task 5: Implement a KeyValuePair class
export class KeyValuePair<K, V> implements Pair<K, V> {
  constructor(public first: K, public second: V) {}
}

// Task 6: Create a generic Stack class
export class Stack<T> {
  private items: T[] = [];
  
  push(item: T): void {
    this.items.push(item);
  }
  
  pop(): T | undefined {
    return this.items.pop();
  }
  
  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }
  
  isEmpty(): boolean {
    return this.items.length === 0;
  }
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