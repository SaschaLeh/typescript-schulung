// Function Interfaces in TypeScript

// 1. Interface for function type
interface MathFunction {
    (x: number, y: number): number;
}

// Functions implementing the interface
const add: MathFunction = (a, b) => a + b;
const subtract: MathFunction = (a, b) => a - b;
const multiply: MathFunction = (a, b) => a * b;

console.log("Math Functions:");
console.log(`5 + 3 = ${add(5, 3)}`);
console.log(`10 - 4 = ${subtract(10, 4)}`);
console.log(`6 * 7 = ${multiply(6, 7)}`);

// 2. Interface with multiple call signatures
interface Calculator {
    (x: number, y: number): number;
    mode: string;
    reset(): void;
}

// Create a function that matches the interface
const calculator: Calculator = ((a, b) => a + b) as Calculator;
calculator.mode = "addition";
calculator.reset = function() {
    this.mode = "addition";
    console.log("Calculator reset to default mode");
};

console.log("\nCalculator object:");
console.log(`Calculate 7 + 8 = ${calculator(7, 8)}`);
console.log(`Current mode: ${calculator.mode}`);
calculator.reset();

// 3. Interface for callbacks
interface EventListener {
    (event: string): void;
}

function registerEventListener(event: string, callback: EventListener): void {
    console.log(`\nEvent '${event}' triggered`);
    callback(event);
}

// Using the interface
registerEventListener("click", (e) => {
    console.log(`Handling ${e} event`);
});

// 4. More complex function interfaces
interface FetchResponse<T> {
    data: T | null;
    error: Error | null;
}

interface FetchFunction {
    <T>(url: string): Promise<FetchResponse<T>>;
}

// Example implementation (simulation)
const fetchData: FetchFunction = async <T>(url: string): Promise<FetchResponse<T>> => {
    console.log(`\nFetching data from ${url}`);
    
    // This is just a simulation for the example
    if (url.includes("success")) {
        return {
            data: { id: 1, name: "Example Item" } as unknown as T,
            error: null
        };
    } else {
        return {
            data: null,
            error: new Error("Failed to fetch data")
        };
    }
};

// Using the interface (we need to use an async IIFE to demonstrate)
(async () => {
    // Simulate a successful request
    const successResult = await fetchData<{id: number, name: string}>("https://api.example.com/success");
    console.log("Success result:", successResult);
    
    // Simulate a failed request
    const errorResult = await fetchData<{id: number, name: string}>("https://api.example.com/error");
    console.log("Error result:", errorResult);
})(); 