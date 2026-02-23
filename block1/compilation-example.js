// This file demonstrates how TypeScript prevents errors through static typing
// Correct usage with types
var languageName = "TypeScript";
var version = 5;
var isAwesome = true;
// TypeScript will detect these errors during compilation
// Uncomment these lines to see the errors
/*
let wrongType: string = 42;             // Error: Type 'number' is not assignable to type 'string'
let cannotReassign: number = 10;
cannotReassign = "ten";                 // Error: Type 'string' is not assignable to type 'number'
let undefinedVariable;                  // OK: Type is 'any' by default
undefinedVariable.someMethod();         // No error in compilation, but will fail at runtime
*/
// Function that shows how TypeScript checks arguments
function add(a, b) {
    return a + b;
}
var result = add(5, 3); // OK: 8
// const wrongCall = add("5", "3");     // Error: Argument of type 'string' is not assignable to parameter of type 'number'
console.log("TypeScript compilation example running!");
console.log("Result of add(5, 3): ".concat(result));
