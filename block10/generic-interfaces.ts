// Generic Interfaces and Classes in TypeScript

// Basic generic interface
interface GenericIdentity<T> {
  (arg: T): T;
}

// Implementation of the generic interface
const identityFn: GenericIdentity<number> = (arg: number): number => {
  return arg;
};

console.log(identityFn(42)); // 42

// Generic interface with multiple parameters
interface KeyValuePair<K, V> {
  key: K;
  value: V;
}

const pair1: KeyValuePair<string, number> = { key: "age", value: 30 };
const pair2: KeyValuePair<number, string> = { key: 1, value: "first" };

console.log("Pair 1:", pair1);
console.log("Pair 2:", pair2);

// Generic interface describing an API response
interface ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp: Date;
  error?: string;
}

// Example usage with different data types
interface User {
  id: number;
  name: string;
  email: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

// Simulated API responses with different data types
const userResponse: ApiResponse<User> = {
  success: true,
  data: {
    id: 1,
    name: "John Doe",
    email: "john@example.com"
  },
  timestamp: new Date()
};

const productResponse: ApiResponse<Product> = {
  success: true,
  data: {
    id: 101,
    name: "Laptop",
    price: 1299.99,
    inStock: true
  },
  timestamp: new Date()
};

const errorResponse: ApiResponse<null> = {
  success: false,
  data: null,
  timestamp: new Date(),
  error: "Resource not found"
};

console.log("User response:", userResponse);
console.log("Product response:", productResponse);
console.log("Error response:", errorResponse);

// Generic interfaces for collections
interface Collection<T> {
  add(item: T): void;
  remove(item: T): void;
  getItems(): T[];
}

// Implementing the generic interface with a class
class List<T> implements Collection<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  remove(item: T): void {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  getItems(): T[] {
    return [...this.items]; // Return a copy to prevent direct modification
  }
}

const stringList = new List<string>();
stringList.add("apple");
stringList.add("banana");
stringList.add("cherry");
console.log("String list:", stringList.getItems());

const numberList = new List<number>();
numberList.add(1);
numberList.add(2);
numberList.add(3);
console.log("Number list:", numberList.getItems());

// Generic class with multiple type parameters
class Dictionary<K, V> {
  private items: Map<K, V> = new Map<K, V>();

  set(key: K, value: V): void {
    this.items.set(key, value);
  }

  get(key: K): V | undefined {
    return this.items.get(key);
  }

  has(key: K): boolean {
    return this.items.has(key);
  }

  delete(key: K): boolean {
    return this.items.delete(key);
  }

  getAll(): [K, V][] {
    return Array.from(this.items.entries());
  }
}

const userDirectory = new Dictionary<number, User>();
userDirectory.set(1, { id: 1, name: "John", email: "john@example.com" });
userDirectory.set(2, { id: 2, name: "Jane", email: "jane@example.com" });

console.log("User with ID 1:", userDirectory.get(1));
console.log("All users:", userDirectory.getAll());

// Extending generic interfaces
interface ReadableCollection<T> {
  getItems(): T[];
  getById(id: number): T | undefined;
}

interface WriteableCollection<T> {
  add(item: T): void;
  update(id: number, item: T): boolean;
  delete(id: number): boolean;
}

// Combining interfaces with an intersection
type FullCollection<T> = ReadableCollection<T> & WriteableCollection<T>;

// Implementing the combined interface
class DataCollection<T extends { id: number }> implements FullCollection<T> {
  private items: T[] = [];

  getItems(): T[] {
    return [...this.items];
  }

  getById(id: number): T | undefined {
    return this.items.find(item => item.id === id);
  }

  add(item: T): void {
    this.items.push(item);
  }

  update(id: number, item: T): boolean {
    const index = this.items.findIndex(i => i.id === id);
    if (index !== -1) {
      this.items[index] = item;
      return true;
    }
    return false;
  }

  delete(id: number): boolean {
    const index = this.items.findIndex(i => i.id === id);
    if (index !== -1) {
      this.items.splice(index, 1);
      return true;
    }
    return false;
  }
}

const userCollection = new DataCollection<User>();
userCollection.add({ id: 1, name: "John", email: "john@example.com" });
userCollection.add({ id: 2, name: "Jane", email: "jane@example.com" });

console.log("All users:", userCollection.getItems());
console.log("User with ID 2:", userCollection.getById(2));

userCollection.update(1, { id: 1, name: "John Updated", email: "john.updated@example.com" });
console.log("After update:", userCollection.getItems());

userCollection.delete(2);
console.log("After delete:", userCollection.getItems());

export {
  KeyValuePair,
  ApiResponse,
  Collection,
  List,
  Dictionary,
  DataCollection
}; 