// Tuples in TypeScript

// 1. Basic tuple
// A tuple is an array with a fixed number of elements whose types are known
let person: [string, number] = ["Alice", 30];
console.log("Person tuple:", person);

// Access tuple elements
console.log("Name:", person[0]);
console.log("Age:", person[1]);

// 2. Optional tuple elements
// The ? makes the last element optional
let optionalTuple: [string, number, boolean?] = ["Bob", 25];
console.log("Optional tuple (without third element):", optionalTuple);

// Adding the optional element
optionalTuple = ["Charlie", 35, true];
console.log("Optional tuple (with third element):", optionalTuple);

// 3. Tuple with rest elements
// The rest element allows any number of elements of a specified type
let restTuple: [string, number, ...string[]] = ["Dave", 40, "Engineer", "JavaScript", "TypeScript"];
console.log("Tuple with rest elements:", restTuple);

// 4. Readonly tuples
// Cannot modify elements
const readonlyTuple: readonly [string, number] = ["Eve", 28];
console.log("Readonly tuple:", readonlyTuple);
// readonlyTuple[0] = "Frank"; // Error: Cannot assign to '0' because it is a read-only property

// 5. Destructuring tuples
console.log("\nDestructuring example:");
const [personName, personAge] = person;
console.log(`Destructured values - Name: ${personName}, Age: ${personAge}`);

// 6. Named tuples (via type alias)
type Employee = [name: string, id: number, department: string];
const employee: Employee = ["Grace", 1001, "Engineering"];
console.log("\nNamed tuple (Employee):", employee);

// 7. Tuple as function return type
function getUserInfo(): [string, number, boolean] {
    // Simulating getting user info from some source
    return ["Harry", 32, true]; // [name, age, isActive]
}

const [userName, userAge, isActive] = getUserInfo();
console.log("\nFunction returning tuple:");
console.log(`User: ${userName}, Age: ${userAge}, Active: ${isActive}`);

// 8. Tuple for coordinates
type Point2D = [x: number, y: number];
type Point3D = [x: number, y: number, z: number];

function calculateDistance(p1: Point2D, p2: Point2D): number {
    return Math.sqrt(Math.pow(p2[0] - p1[0], 2) + Math.pow(p2[1] - p1[1], 2));
}

const point1: Point2D = [0, 0];
const point2: Point2D = [3, 4];
console.log("\nDistance between 2D points:", calculateDistance(point1, point2));

// 9. Using tuples in arrays
const people: [string, number][] = [
    ["Alice", 30],
    ["Bob", 25],
    ["Charlie", 35]
];

console.log("\nArray of tuples:");
people.forEach(([pName, pAge]) => {
    console.log(`${pName} is ${pAge} years old`);
});

// 10. Real-world example: CSV data processing
function parseCSVLine(line: string): [string, number, string] {
    const parts = line.split(',');
    return [
        parts[0],                  // name
        parseInt(parts[1], 10),    // age
        parts[2]                   // email
    ];
}

const csvLine = "John Doe,45,john@example.com";
const parsedLine = parseCSVLine(csvLine);
console.log("\nCSV parsing with tuples:");
console.log(`Name: ${parsedLine[0]}, Age: ${parsedLine[1]}, Email: ${parsedLine[2]}`); 