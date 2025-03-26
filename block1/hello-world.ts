// Basic Hello World example in TypeScript
console.log("Hello, TypeScript!");

// Shows how TypeScript uses type inference
let message = "Hello, type inference!";  // TypeScript infers this is a string
console.log(message);

// Demonstrates explicit type annotation
let explicitMessage: string = "Hello, explicit types!";
console.log(explicitMessage);

// Simple function with type annotations
function greet(name: string): string {
    return `Hello, ${name}!`;
}

console.log(greet("TypeScript Learner")); 