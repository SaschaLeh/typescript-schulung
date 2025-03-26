// Generic Data Containers: Box<T> and Queue<T> Implementations

// Generic Box implementation
class Box<T> {
  private _value: T;

  constructor(initialValue: T) {
    this._value = initialValue;
  }

  get value(): T {
    return this._value;
  }

  set value(newValue: T) {
    this._value = newValue;
  }

  toString(): string {
    return `Box containing: ${this._value}`;
  }

  // Apply a function to the contained value and return a new Box
  map<U>(fn: (value: T) => U): Box<U> {
    return new Box<U>(fn(this._value));
  }
}

// Example usage of Box<T>
const numberBox = new Box<number>(42);
console.log("Box value:", numberBox.value);

numberBox.value = 100;
console.log("Updated box value:", numberBox.value);

// Using the map method to transform the box content
const stringBox = numberBox.map(num => num.toString());
console.log("String box value:", stringBox.value);

const lengthBox = stringBox.map(str => str.length);
console.log("Length box value:", lengthBox.value);

// Generic Queue implementation
class Queue<T> {
  private items: T[] = [];

  // Add an item to the end of the queue
  enqueue(item: T): void {
    this.items.push(item);
  }

  // Remove an item from the front of the queue
  dequeue(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items.shift();
  }

  // View the item at the front of the queue without removing it
  peek(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[0];
  }

  // Check if the queue is empty
  isEmpty(): boolean {
    return this.items.length === 0;
  }

  // Get the number of items in the queue
  size(): number {
    return this.items.length;
  }

  // Clear all items from the queue
  clear(): void {
    this.items = [];
  }

  // Get all items in the queue (without modifying it)
  getAll(): T[] {
    return [...this.items];
  }
}

// Example usage of Queue<T>
const numberQueue = new Queue<number>();
numberQueue.enqueue(1);
numberQueue.enqueue(2);
numberQueue.enqueue(3);

console.log("Queue size:", numberQueue.size());
console.log("Queue contents:", numberQueue.getAll());
console.log("Front of queue:", numberQueue.peek());

const dequeuedItem = numberQueue.dequeue();
console.log("Dequeued item:", dequeuedItem);
console.log("Queue after dequeue:", numberQueue.getAll());

// Using generic Queue with custom types
interface Task {
  id: number;
  name: string;
  priority: 'low' | 'medium' | 'high';
}

const taskQueue = new Queue<Task>();
taskQueue.enqueue({ id: 1, name: "Complete report", priority: 'high' });
taskQueue.enqueue({ id: 2, name: "Review code", priority: 'medium' });
taskQueue.enqueue({ id: 3, name: "Update documentation", priority: 'low' });

console.log("Task queue size:", taskQueue.size());
console.log("Task queue contents:", taskQueue.getAll());

// Process tasks in order
while (!taskQueue.isEmpty()) {
  const task = taskQueue.dequeue();
  console.log(`Processing task: ${task?.name} (Priority: ${task?.priority})`);
}

console.log("Tasks remaining:", taskQueue.size());

// Generic Pair container
class Pair<T, U> {
  constructor(public first: T, public second: U) {}

  swap(): Pair<U, T> {
    return new Pair(this.second, this.first);
  }

  toString(): string {
    return `(${this.first}, ${this.second})`;
  }
}

// Using the Pair class
const pair1 = new Pair<string, number>("key", 42);
console.log("Original pair:", pair1.toString());

const swappedPair = pair1.swap();
console.log("Swapped pair:", swappedPair.toString());

// Generic Stack implementation
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }

  clear(): void {
    this.items = [];
  }

  getAll(): T[] {
    return [...this.items];
  }
}

// Using the Stack class
const stringStack = new Stack<string>();
stringStack.push("first");
stringStack.push("second");
stringStack.push("third");

console.log("Stack contents:", stringStack.getAll());
console.log("Stack top:", stringStack.peek());

console.log("Popped item:", stringStack.pop());
console.log("Stack after pop:", stringStack.getAll());

// Using the three data structures together
function demonstrateContainers(): void {
  // Create some boxes
  const box1 = new Box<number>(1);
  const box2 = new Box<number>(2);
  const box3 = new Box<number>(3);

  // Use a queue to process boxes in order
  const boxQueue = new Queue<Box<number>>();
  boxQueue.enqueue(box1);
  boxQueue.enqueue(box2);
  boxQueue.enqueue(box3);

  console.log("\nProcessing boxes in queue order:");
  while (!boxQueue.isEmpty()) {
    const currentBox = boxQueue.dequeue();
    console.log(`Processing box with value: ${currentBox?.value}`);
  }

  // Use a stack to process boxes in reverse order
  const boxStack = new Stack<Box<number>>();
  boxStack.push(box1);
  boxStack.push(box2);
  boxStack.push(box3);

  console.log("\nProcessing boxes in stack order (LIFO):");
  while (!boxStack.isEmpty()) {
    const currentBox = boxStack.pop();
    console.log(`Processing box with value: ${currentBox?.value}`);
  }
}

demonstrateContainers();

export {
  Box,
  Queue,
  Pair,
  Stack
}; 