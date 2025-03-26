// Union Basics in TypeScript

// Basic union type - variable can be one of multiple types
let id: string | number;
id = "abc123";  // Valid
id = 42;        // Also valid
// id = true;   // Error: Type 'boolean' is not assignable to type 'string | number'

// Union type with function parameters
function formatId(id: string | number): string {
  if (typeof id === "string") {
    // TypeScript knows id is a string inside this block
    return id.toUpperCase();
  } else {
    // TypeScript knows id is a number inside this block
    return `ID-${id.toString().padStart(6, "0")}`;
  }
}

console.log(formatId("abc"));  // ABC
console.log(formatId(42));     // ID-000042

// Union of object types
type Circle = {
  kind: "circle";
  radius: number;
};

type Square = {
  kind: "square";
  sideLength: number;
};

type Shape = Circle | Square;

// Type narrowing and discriminated unions
function calculateArea(shape: Shape): number {
  // Using the 'kind' property as a discriminant
  switch (shape.kind) {
    case "circle":
      // TypeScript knows shape is Circle here
      return Math.PI * shape.radius ** 2;
    case "square":
      // TypeScript knows shape is Square here
      return shape.sideLength ** 2;
    default:
      // This ensures we've handled all cases
      const exhaustiveCheck: never = shape;
      return 0;
  }
}

const myCircle: Shape = { kind: "circle", radius: 5 };
const mySquare: Shape = { kind: "square", sideLength: 4 };

console.log(`Circle area: ${calculateArea(myCircle)}`);
console.log(`Square area: ${calculateArea(mySquare)}`);

// Union types with arrays
type StringOrStringArray = string | string[];

function getLength(value: StringOrStringArray): number {
  if (Array.isArray(value)) {
    // TypeScript knows value is string[] here
    return value.length;
  } else {
    // TypeScript knows value is string here
    return value.length;
  }
}

console.log(`Length of "hello": ${getLength("hello")}`);       // 5
console.log(`Length of ["a", "b", "c"]: ${getLength(["a", "b", "c"])}`); // 3

// Union with null for optional values
type Result = string | null;

function fetchData(succeed: boolean): Result {
  if (succeed) {
    return "Data successfully fetched";
  } else {
    return null;
  }
}

const successResult = fetchData(true);
const failureResult = fetchData(false);

// Handling nullable values safely
function displayResult(result: Result): string {
  // We need to check if result is null before using string methods
  if (result !== null) {
    return result.toUpperCase();
  } else {
    return "NO DATA";
  }
}

console.log(displayResult(successResult)); // DATA SUCCESSFULLY FETCHED
console.log(displayResult(failureResult)); // NO DATA

// Union of literal types
type Direction = "north" | "south" | "east" | "west";

function move(direction: Direction, steps: number): void {
  console.log(`Moving ${steps} steps ${direction}`);
}

move("north", 3); // Moving 3 steps north
// move("northwest", 2); // Error: Argument of type '"northwest"' is not assignable to parameter of type 'Direction'

// Exporting for use in other files
export {
  Shape, Circle, Square, calculateArea,
  StringOrStringArray, getLength,
  Result, displayResult
}; 