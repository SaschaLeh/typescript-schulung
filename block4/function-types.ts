// Function Types in TypeScript

// 1. Named function with type annotations
function add(x: number, y: number): number {
    return x + y;
}

// 2. Anonymous function stored in a variable
const multiply = function(x: number, y: number): number {
    return x * y;
};

// 3. Arrow function with type annotations
const divide = (x: number, y: number): number => {
    if (y === 0) {
        throw new Error("Cannot divide by zero");
    }
    return x / y;
};

// 4. Function type signature
let mathOperation: (x: number, y: number) => number;
// We can assign any matching function to this variable
mathOperation = add;
console.log(`mathOperation(5, 3) using add: ${mathOperation(5, 3)}`);
mathOperation = multiply;
console.log(`mathOperation(5, 3) using multiply: ${mathOperation(5, 3)}`);

// 5. Optional parameters
function greet(name: string, greeting?: string): string {
    if (greeting) {
        return `${greeting}, ${name}!`;
    }
    return `Hello, ${name}!`;
}

console.log(greet("Alice"));
console.log(greet("Bob", "Good morning"));

// 6. Default parameters
function buildAddress(street: string, city: string, country: string = "USA"): string {
    return `${street}, ${city}, ${country}`;
}

console.log(buildAddress("123 Main St", "Anytown"));
console.log(buildAddress("456 High St", "Someville", "Canada"));

// 7. Rest parameters
function sum(...numbers: number[]): number {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(`Sum of [1, 2, 3, 4, 5]: ${sum(1, 2, 3, 4, 5)}`);

// 8. Function overloads
function padLeft(value: string, padding: number): string;
function padLeft(value: string, padding: string): string;
function padLeft(value: string, padding: string | number): string {
    if (typeof padding === "number") {
        return " ".repeat(padding) + value;
    }
    return padding + value;
}

console.log(`Padding with number: "${padLeft("Hello", 4)}"`);
console.log(`Padding with string: "${padLeft("Hello", "----")}"`);

// 9. Using the Function type
const logger: Function = (message: string) => {
    console.log(`LOG: ${message}`);
};

logger("This is a log message"); 