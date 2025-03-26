// Interface vs Type Alias in TypeScript

// 1. Basic syntax comparison
// Using interface
interface UserInterface {
    id: number;
    name: string;
    email: string;
}

// Using type alias
type UserType = {
    id: number;
    name: string;
    email: string;
};

// Both can be used to type an object
const user1: UserInterface = {
    id: 1,
    name: "Alice",
    email: "alice@example.com"
};

const user2: UserType = {
    id: 2,
    name: "Bob",
    email: "bob@example.com"
};

console.log("Interface implementation:", user1);
console.log("Type alias implementation:", user2);

// 2. Declaration merging (interface-only feature)
interface Vehicle {
    type: string;
    brand: string;
}

// Extending the interface with additional properties
interface Vehicle {
    year: number;
    model: string;
}

// The Vehicle interface now has all four properties
const car: Vehicle = {
    type: "Car",
    brand: "Toyota",
    year: 2023,
    model: "Camry"
};

console.log("\nInterface with declaration merging:", car);

// Type aliases cannot be merged like this:
// type Animal = { species: string };
// type Animal = { age: number }; // Error: Duplicate identifier 'Animal'

// 3. Extending interfaces vs extending types
// Extending interfaces
interface Shape {
    color: string;
}

interface Circle extends Shape {
    radius: number;
}

// Extending types with intersection
type Polygon = {
    sides: number;
};

type Square = Polygon & {
    sideLength: number;
    color: string;
};

const circle: Circle = {
    color: "red",
    radius: 10
};

const square: Square = {
    sides: 4,
    sideLength: 5,
    color: "blue"
};

console.log("\nExtended interface:", circle);
console.log("Intersected type:", square);

// 4. Unions and Primitives (more natural with types)
// Union type
type ID = number | string;

// Interface cannot directly represent unions
// interface IDInterface = number | string; // Error

// Function using union type
function printID(id: ID) {
    console.log(`ID: ${id}`);
}

console.log("\nUnion types example:");
printID(100);
printID("ABC-123");

// 5. Tuple types (more natural with type aliases)
type Point = [number, number];

// Interface can't directly define tuple structure
// interface PointInterface [number, number]; // Error

const coordinates: Point = [10, 20];
console.log("\nTuple type:", coordinates);

// 6. When to use each

// Use interface for:
// - Public API definitions
// - When you want declaration merging
// - Object-oriented designs with classes

// Example: API response
interface APIResponse {
    status: number;
    data: unknown;
    timestamp: number;
}

// Use type for:
// - Complex type definitions with unions, intersections
// - Function types
// - Mapped types
// - When you need exact type constraints

// Example: Complex type with union
type Result<T> = 
    | { success: true; data: T; } 
    | { success: false; error: Error; };

const successResult: Result<string> = {
    success: true,
    data: "Operation completed successfully"
};

const errorResult: Result<string> = {
    success: false,
    error: new Error("Something went wrong")
};

console.log("\nComplex union type examples:");
console.log("Success result:", successResult);
console.log("Error result:", errorResult); 