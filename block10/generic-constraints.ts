// Generic Constraints in TypeScript

// Using the extends keyword to constrain the types that can be used with a generic

// Basic constraint to ensure a type has a specific property
function getLength<T extends { length: number }>(arg: T): number {
  return arg.length;
}

// This works with any type that has a length property
console.log(getLength("hello")); // 5
console.log(getLength([1, 2, 3])); // 3
console.log(getLength({ length: 10, name: "test" })); // 10
// console.log(getLength(123)); // Error: Argument of type 'number' is not assignable to parameter of type '{ length: number; }'

// Constraining with interfaces
interface HasId {
  id: number;
}

function findById<T extends HasId>(items: T[], id: number): T | undefined {
  return items.find(item => item.id === id);
}

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" }
];

const foundUser = findById(users, 2);
console.log("Found user:", foundUser);

// Using keyof to get the keys of an object type
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const user = { id: 1, name: "John", email: "john@example.com" };
console.log(getProperty(user, "name")); // "John"
// console.log(getProperty(user, "age")); // Error: Argument of type '"age"' is not assignable to parameter of type 'keyof { id: number; name: string; email: string; }'

// Constraining with multiple bounds using intersection types
interface HasName {
  name: string;
}

interface HasAge {
  age: number;
}

// T must have both name and age properties
function greet<T extends HasName & HasAge>(obj: T): string {
  return `Hello, ${obj.name}! You are ${obj.age} years old.`;
}

const person = { name: "Alice", age: 30, occupation: "Engineer" };
console.log(greet(person));
// const invalidPerson = { name: "Bob" }; // Error: Property 'age' is missing in type '{ name: string; }'

// Constraining a type parameter based on another type parameter
function merge<T extends object, U extends object>(obj1: T, obj2: U): T & U {
  return { ...obj1, ...obj2 };
}

const result = merge({ name: "John" }, { age: 30 });
console.log("Merged object:", result);

// Type parameters with defaults
interface Box<T = string> {
  value: T;
}

const stringBox: Box = { value: "default string" }; // uses default type
const numberBox: Box<number> = { value: 42 }; // overrides default type

console.log("String box:", stringBox);
console.log("Number box:", numberBox);

// Constraining constructors
interface Constructor<T> {
  new (...args: any[]): T;
}

function createInstance<T>(ctor: Constructor<T>, ...args: any[]): T {
  return new ctor(...args);
}

class Person {
  constructor(public name: string, public age: number) {}
  
  greet(): string {
    return `Hello, I'm ${this.name} and I'm ${this.age} years old.`;
  }
}

const newPerson = createInstance(Person, "Alice", 30);
console.log(newPerson.greet());

// Using constraints with mapped types
type ReadonlyProps<T> = {
  readonly [P in keyof T]: T[P];
};

const mutableUser = { id: 1, name: "John" };
const readonlyUser: ReadonlyProps<typeof mutableUser> = { id: 1, name: "John" };

mutableUser.name = "Jane"; // OK
// readonlyUser.name = "Jane"; // Error: Cannot assign to 'name' because it is a read-only property

console.log("Mutable user after change:", mutableUser);
console.log("Readonly user (unchanged):", readonlyUser);

// Conditional constraints
type NonNullable<T> = T extends null | undefined ? never : T;

type StringOrNull = string | null;
type JustString = NonNullable<StringOrNull>; // This is just 'string'

// Create a type helper that extracts the return type of a function
type ReturnType<T extends (...args: any[]) => any> = T extends (...args: any[]) => infer R ? R : any;

function fetchUser(): { id: number; name: string } {
  return { id: 1, name: "John" };
}

type UserType = ReturnType<typeof fetchUser>; // { id: number; name: string }

// Constraining a generic to be a subtype of another type
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

function createAnimal<T extends Animal>(animal: T): T {
  console.log(`Created animal named ${animal.name}`);
  return animal;
}

const myDog = createAnimal<Dog>({ name: "Buddy", breed: "Golden Retriever" });
console.log("My dog:", myDog);

export {
  getLength,
  findById,
  getProperty,
  greet,
  merge,
  Box,
  createInstance
}; 