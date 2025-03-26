// Basic Types in TypeScript

// Primitive types
let isDone: boolean = false;
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
let color: string = "blue";
let templateString: string = `Color: ${color}`;

// Special types
let notSure: any = 4;
notSure = "maybe a string";
notSure = false;

let unknown: unknown = 4;
// unknown is similar to any but safer, requires type checking before operations
if (typeof unknown === "number") {
    console.log(unknown + 1); // OK, now TypeScript knows it's a number
}

let someValue: unknown = "this is a string";
let strLength: number = (someValue as string).length;

// void, null, undefined
function warnUser(): void {
    console.log("This is a warning message");
}

let unusable: void = undefined;
let n: null = null;
let u: undefined = undefined;

// never - represents values that never occur
function error(message: string): never {
    throw new Error(message);
}

// Type assertions (typecasting)
let value: any = "This is a string";
let stringLength: number = (value as string).length;
// OR using angle bracket syntax
let otherLength: number = (<string>value).length;

// Print out examples
console.log("Boolean:", isDone);
console.log("Number (decimal):", decimal);
console.log("Number (hex):", hex);
console.log("String:", color);
console.log("Template String:", templateString);
console.log("Any type example:", notSure);
console.log("String length (from unknown using type assertion):", strLength); 