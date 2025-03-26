// Type Guards in TypeScript

// Import some types from union-basics for demonstration
import { Shape, Circle, Square, Result } from './union-basics';

// Using typeof as a type guard
function processValue(value: string | number | boolean): void {
  // TypeScript recognizes these checks as type guards
  if (typeof value === "string") {
    // TypeScript knows value is a string in this block
    console.log(`String value: ${value.toUpperCase()}`);
  } else if (typeof value === "number") {
    // TypeScript knows value is a number in this block
    console.log(`Numeric value: ${value.toFixed(2)}`);
  } else {
    // TypeScript knows value is a boolean in this block
    console.log(`Boolean value: ${value ? "TRUE" : "FALSE"}`);
  }
}

processValue("hello");  // String value: HELLO
processValue(42.5);     // Numeric value: 42.50
processValue(true);     // Boolean value: TRUE

// Using instanceof as a type guard for classes
class Animal {
  constructor(public name: string) {}
  
  makeSound(): string {
    return "Some generic animal sound";
  }
}

class Dog extends Animal {
  constructor(name: string, public breed: string) {
    super(name);
  }
  
  makeSound(): string {
    return "Woof!";
  }
  
  fetch(): string {
    return `${this.name} is fetching the ball!`;
  }
}

class Cat extends Animal {
  constructor(name: string, public color: string) {
    super(name);
  }
  
  makeSound(): string {
    return "Meow!";
  }
  
  purr(): string {
    return `${this.name} is purring contentedly.`;
  }
}

// Function using instanceof to narrow types
function petAnimal(animal: Animal): void {
  console.log(`Petting ${animal.name}. It says: ${animal.makeSound()}`);
  
  if (animal instanceof Dog) {
    // TypeScript knows animal is a Dog here
    console.log(animal.fetch());
    console.log(`Breed: ${animal.breed}`);
  } else if (animal instanceof Cat) {
    // TypeScript knows animal is a Cat here
    console.log(animal.purr());
    console.log(`Color: ${animal.color}`);
  }
}

const myDog = new Dog("Buddy", "Golden Retriever");
const myCat = new Cat("Whiskers", "Calico");

petAnimal(myDog);
petAnimal(myCat);

// User-defined type guards with is
// Type predicate that tells TypeScript about the type
function isCircle(shape: Shape): shape is Circle {
  return shape.kind === "circle";
}

function isSquare(shape: Shape): shape is Square {
  return shape.kind === "square";
}

function describeShape(shape: Shape): string {
  if (isCircle(shape)) {
    // TypeScript knows shape is a Circle here
    return `Circle with radius ${shape.radius}`;
  } else if (isSquare(shape)) {
    // TypeScript knows shape is a Square here
    return `Square with side length ${shape.sideLength}`;
  } else {
    // This should never happen if Shape is only Circle | Square
    // Using exhaustive checking pattern
    const exhaustiveCheck: never = shape;
    return exhaustiveCheck;
  }
}

const myCircle: Shape = { kind: "circle", radius: 5 };
const mySquare: Shape = { kind: "square", sideLength: 4 };

console.log(describeShape(myCircle));  // Circle with radius 5
console.log(describeShape(mySquare));  // Square with side length 4

// Type guards for non-nullable types
function processResultWithLengthGuard(result: Result): number {
  // First check if result is not null
  if (result !== null) {
    // TypeScript knows result is a string here
    return result.length;
  }
  return 0;
}

// Array.isArray() as a type guard
function flatten(input: unknown): string[] {
  if (Array.isArray(input)) {
    // TypeScript knows input is an array here, but not what type
    return input.map(item => String(item));
  }
  return [String(input)];
}

console.log(flatten(['a', 'b', 'c']));  // ['a', 'b', 'c']
console.log(flatten('hello'));          // ['hello']
console.log(flatten(123));              // ['123']

// Using in operator as a type guard
interface Admin {
  name: string;
  privileges: string[];
}

interface Employee {
  name: string;
  startDate: Date;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInfo(emp: UnknownEmployee): void {
  console.log(`Name: ${emp.name}`);
  
  // Using the 'in' operator to check if a property exists
  if ('privileges' in emp) {
    // TypeScript knows emp is an Admin here
    console.log(`Privileges: ${emp.privileges.join(', ')}`);
  }
  
  if ('startDate' in emp) {
    // TypeScript knows emp is an Employee here
    console.log(`Start Date: ${emp.startDate.toISOString()}`);
  }
}

printEmployeeInfo({ name: 'John', privileges: ['server-admin'] });
printEmployeeInfo({ name: 'Anna', startDate: new Date() }); 