// Simple Calculator Application
// Demonstrates functions with different parameter types

// Define a type for our supported operations
type Operation = "add" | "subtract" | "multiply" | "divide";

// Interface for calculator function
interface CalculatorFunction {
    (a: number, b: number): number;
}

// Calculator functions with proper type annotations
const addFn: CalculatorFunction = (a, b) => a + b;
const subtractFn: CalculatorFunction = (a, b) => a - b;
const multiplyFn: CalculatorFunction = (a, b) => a * b;
const divideFn: CalculatorFunction = (a, b) => {
    if (b === 0) {
        throw new Error("Division by zero is not allowed");
    }
    return a / b;
};

// Operation lookup object
const operations: Record<Operation, CalculatorFunction> = {
    add: addFn,
    subtract: subtractFn,
    multiply: multiplyFn,
    divide: divideFn
};

// Main calculator function with union type parameter
function calculate(a: number, b: number, operation: Operation): number {
    // Access the appropriate function from our lookup object
    const calcFunction = operations[operation];
    return calcFunction(a, b);
}

// Function with optional formatting parameter
function formatResult(
    a: number, 
    b: number, 
    operation: Operation, 
    result: number,
    showFormula: boolean = true
): string {
    // Symbol mapping
    const symbols: Record<Operation, string> = {
        add: "+",
        subtract: "-",
        multiply: "×",
        divide: "÷"
    };
    
    if (showFormula) {
        return `${a} ${symbols[operation]} ${b} = ${result}`;
    } else {
        return `Result: ${result}`;
    }
}

// Demo function with rest parameters to log multiple calculations
function runCalculations(...calculations: Array<[number, number, Operation]>): void {
    calculations.forEach(([a, b, operation]) => {
        try {
            const result = calculate(a, b, operation);
            console.log(formatResult(a, b, operation, result));
        } catch (error) {
            console.error(`Error calculating ${a} ${operation} ${b}: ${error instanceof Error ? error.message : error}`);
        }
    });
}

// Run some example calculations
console.log("Basic Calculator Demo:");
runCalculations(
    [10, 5, "add"],
    [10, 5, "subtract"],
    [10, 5, "multiply"],
    [10, 5, "divide"],
    [10, 0, "divide"] // This will cause an error
);

// Interactive calculation with a custom formatting function
function customCalculate(
    a: number, 
    b: number, 
    operation: Operation,
    formatter?: (result: number) => string
): string {
    let result: number;
    try {
        result = calculate(a, b, operation);
    } catch (error) {
        return `Error: ${error instanceof Error ? error.message : error}`;
    }
    
    // If a custom formatter was provided, use it, otherwise use default formatting
    if (formatter) {
        return formatter(result);
    }
    
    return formatResult(a, b, operation, result);
}

// Custom formatters
const currencyFormatter = (result: number): string => `$${result.toFixed(2)}`;
const scientificFormatter = (result: number): string => `${result.toExponential(2)}`;

// Examples with custom formatters
console.log("\nCustom Formatting Examples:");
console.log(customCalculate(125, 7, "divide", currencyFormatter));
console.log(customCalculate(1000, 2.5, "multiply", scientificFormatter)); 