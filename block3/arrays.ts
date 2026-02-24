// Arrays in TypeScript

// 1. Array type syntax
let numbers: number[] = [1, 2, 3, 4, 5];
// Alternative generic syntax
let strings: Array<string> = ["apple", "banana", "cherry"];

// 2. Mixed type arrays using union types
let mixed: (number | string)[] = [1, "two", 3, "four"];

// 3. Readonly arrays
const readonlyNumbers: ReadonlyArray<number> = [1, 2, 3, 4, 5];
// readonlyNumbers[0] = 10;  // Error: Index signature in type 'readonly number[]' only permits reading
// readonlyNumbers.push(6);  // Error: Property 'push' does not exist on type 'readonly number[]'

// 4. Array methods
const fruits: string[] = ["apple", "banana", "cherry"];

// Add to the end
fruits.push("date");
console.log("After push:", fruits);

// Remove from the end
const lastFruit = fruits.pop();
console.log("Popped:", lastFruit);
console.log("After pop:", fruits);

// Add to the beginning
fruits.unshift("apricot");
console.log("After unshift:", fruits);

// Remove from the beginning
const firstFruit = fruits.shift();
console.log("Shifted:", firstFruit);
console.log("After shift:", fruits);

// 5. Array iteration
const scores: number[] = [85, 92, 78, 95, 88];

// ForEach
console.log("ForEach example:");
scores.forEach((score, index) => {
  console.log(`Score ${index + 1}: ${score}`);
});

// Map
console.log("\nMap example:");
const passFail: string[] = scores.map((score) =>
  score >= 80 ? "Pass" : "Fail",
);
console.log(passFail);

// Filter
console.log("\nFilter example:");
const highScores: number[] = scores.filter((score) => score >= 90);
console.log("High scores:", highScores);

// Reduce
console.log("\nReduce example:");
const totalScore: number = scores.reduce((total, score) => total + score, 0);
const average: number = totalScore / scores.length;
console.log(`Average score: ${average.toFixed(2)}`);

// 6. Find methods
console.log("\nFind example:");
const firstHighScore = scores.find((score) => score > 90);
console.log("First score > 90:", firstHighScore);

const highScoreIndex = scores.findIndex((score) => score > 90);
console.log("Index of first score > 90:", highScoreIndex);

// 7. Sort and Reverse
console.log("\nSort example:");
const unsortedNumbers: number[] = [5, 3, 9, 1, 7];
console.log("Original:", unsortedNumbers);

// Note: Sort modifies the original array
const sortedNumbers = [...unsortedNumbers].sort((a, b) => a - b);
console.log("Sorted ascending:", sortedNumbers);

const reverseSorted = [...unsortedNumbers].sort((a, b) => b - a);
console.log("Sorted descending:", reverseSorted);

// 8. Multidimensional arrays
console.log("\nMultidimensional array example:");
const matrix: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

console.log("Matrix:");
matrix.forEach((row) => {
  console.log(row);
});

// Access elements
console.log(`Element at matrix[1][2]: ${matrix[1][2]}`);

// 9. Array destructuring
console.log("\nArray destructuring example:");
const [first, second, ...rest] = [10, 20, 30, 40, 50];
console.log("First:", first);
console.log("Second:", second);
console.log("Rest:", rest);

// 10. Array spread
console.log("\nArray spread example:");
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
console.log("Combined array:", combined);

enum Status {
  Pending = "pending",
  Approved = "approved",
  Deleted = "deleted",
}
