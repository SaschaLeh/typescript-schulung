// Basic Interfaces in TypeScript

// 1. Simple interface definition
interface Person {
    firstName: string;
    lastName: string;
    age: number;
}

// Using the interface
const john: Person = {
    firstName: "John",
    lastName: "Doe",
    age: 30
};

console.log("Person object:", john);

// 2. Optional properties with ?
interface Product {
    id: number;
    name: string;
    price: number;
    description?: string; // Optional property
    category?: string;    // Optional property
}

// Valid implementation without optional properties
const laptop: Product = {
    id: 1,
    name: "MacBook Pro",
    price: 1999.99
};

// Valid implementation with optional properties
const phone: Product = {
    id: 2,
    name: "iPhone",
    price: 999.99,
    description: "Latest model with improved camera",
    category: "Electronics"
};

console.log("\nProduct without optional properties:", laptop);
console.log("Product with optional properties:", phone);

// 3. Readonly properties
interface Point {
    readonly x: number;
    readonly y: number;
}

const point: Point = { x: 10, y: 20 };
console.log("\nReadonly point:", point);
// point.x = 5; // Error: Cannot assign to 'x' because it is a read-only property

// 4. Interface extension
interface Animal {
    name: string;
    age: number;
}

interface Pet extends Animal {
    owner: string;
    breed?: string;
}

const dog: Pet = {
    name: "Rex",
    age: 3,
    owner: "Alice",
    breed: "German Shepherd"
};

console.log("\nPet (extended interface):", dog);

// 5. Implementing multiple interfaces
interface Dimension {
    width: number;
    height: number;
}

interface Colorful {
    color: string;
}

// Combining interfaces
interface ColorfulDimension extends Dimension, Colorful {}

const coloredRectangle: ColorfulDimension = {
    width: 100,
    height: 50,
    color: "blue"
};

console.log("\nCombined interfaces:", coloredRectangle);

// 6. Index signatures for dynamic properties
interface Dictionary {
    [key: string]: string | number;
}

const employee: Dictionary = {
    name: "Bob Smith",
    id: 12345,
    department: "Engineering",
    salary: 85000
};

console.log("\nDictionary interface (dynamic properties):", employee); 