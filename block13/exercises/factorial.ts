/**
 * Exercise 1: Fakultätsfunktion
 *
 * In dieser Übung implementierst du die Fakultätsfunktion auf drei verschiedene Arten:
 * iterativ, rekursiv und memoized (mit Closure).
 * Follow the instructions below to complete the implementation.
 */


// TODO 1: Implementiere factorial(n: number): number — iterativ mit for-Schleife
// - Die Fakultät von n ist: n! = 1 * 2 * 3 * ... * n
// - Beispiel: factorial(5) → 120
// - Edge-Case: factorial(0) → 1
// - Bei negativen Zahlen: Error werfen ("Factorial is not defined for negative numbers")


// TODO 2: Implementiere factorialRecursive(n: number): number — rekursiv
// - Gleiche Logik wie TODO 1, aber rekursiv statt iterativ
// - Basisfall: n === 0 → return 1
// - Rekursiver Fall: n * factorialRecursive(n - 1)
// - Bei negativen Zahlen: Error werfen


// TODO 3: Implementiere createMemoizedFactorial(): (n: number) => number
// - Diese Funktion gibt eine Funktion zurück (Closure!)
// - Die innere Funktion berechnet die Fakultät rekursiv
// - Nutze eine Map<number, number> als Cache innerhalb der Closure
// - Bei erneutem Aufruf mit gleichem n: Wert aus Cache zurückgeben
// - Tipp: console.log einbauen, um Cache-Hits sichtbar zu machen


// TODO 4: Edge-Cases absichern
// - Alle drei Funktionen sollen bei n < 0 einen Error werfen
// - factorial(0) und factorialRecursive(0) sollen 1 zurückgeben
// - Die memoized Version soll ebenfalls 0 → 1 unterstützen


// Demonstration code - uncomment and run to test your implementation
/*
console.log("=== Iterative Fakultät ===");
console.log("5! =", factorial(5));       // 120
console.log("0! =", factorial(0));       // 1
console.log("10! =", factorial(10));     // 3628800

console.log("\n=== Rekursive Fakultät ===");
console.log("5! =", factorialRecursive(5));   // 120
console.log("0! =", factorialRecursive(0));   // 1

console.log("\n=== Memoized Fakultät ===");
const memoFactorial = createMemoizedFactorial();
console.log("5! =", memoFactorial(5));   // 120 (berechnet)
console.log("5! =", memoFactorial(5));   // 120 (aus Cache!)
console.log("3! =", memoFactorial(3));   // 6   (aus Cache, weil 3 bei 5! schon berechnet wurde)
console.log("7! =", memoFactorial(7));   // 5040

console.log("\n=== Edge-Case: Negative Zahl ===");
try {
  factorial(-1);
} catch (e) {
  console.log("Error:", (e as Error).message);
}
*/
