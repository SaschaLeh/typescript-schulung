// Intersection Types in TypeScript

// Basic intersection type - combining multiple types
type Person = {
  name: string;
  age: number;
};

type Employee = {
  employeeId: string;
  department: string;
};

// Intersection type - must satisfy both Person and Employee
type EmployedPerson = Person & Employee;

const employee: EmployedPerson = {
  name: "Alice",
  age: 30,
  employeeId: "E12345",
  department: "Engineering"
};

// Adding more types to an intersection
type WithContact = {
  email: string;
  phone?: string;
};

// An intersection can include multiple types
type EmployeeWithContact = EmployedPerson & WithContact;

const fullEmployee: EmployeeWithContact = {
  name: "Bob",
  age: 35,
  employeeId: "E67890",
  department: "Marketing",
  email: "bob@example.com",
  phone: "+1-555-123-4567"
};

// Using intersection types with interfaces
interface Printable {
  print(): void;
}

interface Loggable {
  log(message: string): void;
}

// Class implementing multiple interfaces through intersection
class Document implements Printable & Loggable {
  constructor(private content: string) {}

  print(): void {
    console.log(`Printing: ${this.content}`);
  }

  log(message: string): void {
    console.log(`Log: ${message}, Content: ${this.content}`);
  }
}

const doc = new Document("Important information");
doc.print();
doc.log("Document accessed");

// Intersection with function types
type Logger = (message: string) => void;
type Formatter = (input: string) => string;

// Object with both capabilities
type LogFormatterObject = {
  log: Logger;
  format: Formatter;
};

const logFormatter: LogFormatterObject = {
  log: (message: string) => {
    console.log(`LOG: ${message}`);
  },
  format: (input: string) => {
    return input.toUpperCase();
  }
};

logFormatter.log("Hello");  // LOG: Hello
const formatted = logFormatter.format("world");  // WORLD
console.log(formatted);

// Practical use case: Mixing capabilities
type Sized = {
  width: number;
  height: number;
};

type Colored = {
  color: string;
};

type Styled = {
  style: 'solid' | 'dotted' | 'dashed';
};

// Create various combinations using intersection types
type ColoredSizedBox = Sized & Colored;
type StyledColoredBox = Styled & Colored;
type CompleteBox = Sized & Colored & Styled;

const basicBox: Sized = { width: 100, height: 200 };
const coloredBox: ColoredSizedBox = { width: 100, height: 200, color: "red" };
const completeBox: CompleteBox = {
  width: 150, 
  height: 150, 
  color: "blue", 
  style: "dashed"
};

// Intersection types with primitive types
// This is rarely useful but demonstrates the concept
type NumberAndString = number & string;
// This type is actually impossible to satisfy because a value
// cannot be both a number and a string simultaneously

// Intersection with readonly properties
type ReadonlyDimensions = {
  readonly width: number;
  readonly height: number;
};

type ConfigurableColor = {
  color: string;
};

type ReadonlyColoredBox = ReadonlyDimensions & ConfigurableColor;

const readonlyBox: ReadonlyColoredBox = {
  width: 100,
  height: 100,
  color: "green"
};

// We can change the color
readonlyBox.color = "yellow";

// But we can't change the dimensions
// readonlyBox.width = 200;  // Error: Cannot assign to 'width' because it is a read-only property

// Intersection with generic types
interface Box<T> {
  value: T;
}

interface WithId {
  id: string;
}

// Create a Box that also has an ID
type IdentifiableBox<T> = Box<T> & WithId;

const numberBox: IdentifiableBox<number> = {
  value: 42,
  id: "box-001"
};

const stringBox: IdentifiableBox<string> = {
  value: "Hello, world!",
  id: "box-002"
};

console.log(`Box ${numberBox.id} contains: ${numberBox.value}`);
console.log(`Box ${stringBox.id} contains: ${stringBox.value}`); 