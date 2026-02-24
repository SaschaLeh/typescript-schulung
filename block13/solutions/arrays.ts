/**
 * Exercise 2: Array-Methoden (SOLUTION)
 */

// TODO 1: Array erstellen, push, pop
const farben: string[] = ["rot", "grün", "blau", "gelb"];
farben.push("orange");
const letzteFarbe = farben.pop();

console.log("=== TODO 1: Farben ===");
console.log("Farben:", farben);       // ["rot", "grün", "blau", "gelb"]
console.log("Entfernt:", letzteFarbe); // "orange"

// TODO 2: includes, indexOf, find
const temperaturen: number[] = [18, 22, 15, 30, 25, 12, 28, 20];

console.log("\n=== TODO 2: Suchen ===");
console.log("Enthält 30?", temperaturen.includes(30));          // true
console.log("Index von 25:", temperaturen.indexOf(25));          // 4
console.log("Erste > 24:", temperaturen.find((t) => t > 24));   // 30

// TODO 3: filter, map, reduce
console.log("\n=== TODO 3: filter, map, reduce ===");

const warm = temperaturen.filter((t) => t >= 20);
console.log("Warm (>= 20):", warm); // [22, 30, 25, 28, 20]

const fahrenheit = temperaturen.map((t) => t * 1.8 + 32);
console.log("Fahrenheit:", fahrenheit);

const summe = temperaturen.reduce((sum, t) => sum + t, 0);
console.log("Summe:", summe); // 170

// TODO 4: Sortieren (Strings)
const namen: string[] = ["Claudia", "Anton", "Berta", "Dieter"];

console.log("\n=== TODO 4: Sortieren (Strings) ===");

const alphabetisch = [...namen].sort();
console.log("Alphabetisch:", alphabetisch); // ["Anton", "Berta", "Claudia", "Dieter"]

const absteigend = [...namen].sort((a, b) => b.localeCompare(a));
console.log("Absteigend:", absteigend); // ["Dieter", "Claudia", "Berta", "Anton"]

console.log("Original unverändert:", namen); // ["Claudia", "Anton", "Berta", "Dieter"]

// TODO 5: Sortieren & Statistik (Zahlen)
const zahlen: number[] = [5, 3, 8, 1, 9, 2, 7, 4, 6];

console.log("\n=== TODO 5: Sortieren & Statistik (Zahlen) ===");

const sortiert = [...zahlen].sort((a, b) => a - b);
console.log("Sortiert:", sortiert); // [1, 2, 3, 4, 5, 6, 7, 8, 9]

console.log("Minimum:", Math.min(...zahlen)); // 1
console.log("Maximum:", Math.max(...zahlen)); // 9

const durchschnitt = zahlen.reduce((s, z) => s + z, 0) / zahlen.length;
console.log("Durchschnitt:", durchschnitt); // 5
