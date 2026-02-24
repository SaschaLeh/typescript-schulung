/**
 * Exercise 2: Array-Methoden
 *
 * In dieser Übung übst du das Erstellen von Arrays und die Nutzung
 * der wichtigsten Array-Methoden: push, pop, includes, indexOf,
 * find, filter, map, reduce und sort.
 * Follow the instructions below to complete the implementation.
 */


// TODO 1: Erstelle ein Array `farben` vom Typ string[] mit den Werten:
// "rot", "grün", "blau", "gelb"
// - Füge "orange" am Ende hinzu (push)
// - Entferne das letzte Element (pop) und speichere es in `letzteFarbe`
// - Gib das Array und letzteFarbe aus


// TODO 2: Erstelle ein Array `temperaturen` mit den Werten:
// [18, 22, 15, 30, 25, 12, 28, 20]
// - Finde heraus, ob 30 im Array enthalten ist (includes) → boolean
// - Finde den Index von 25 (indexOf) → number
// - Finde die erste Temperatur über 24 (find) → number | undefined


// TODO 3: Nutze `temperaturen` aus TODO 2:
// - Filtere alle Temperaturen >= 20 heraus (filter) → number[]
// - Wandle alle Temperaturen in Fahrenheit um: °F = °C * 1.8 + 32 (map) → number[]
// - Berechne die Summe aller Temperaturen (reduce) → number


// TODO 4: Erstelle ein Array `namen` mit den Werten:
// ["Claudia", "Anton", "Berta", "Dieter"]
// - Sortiere das Array alphabetisch (sort)
// - Sortiere es danach absteigend (Z → A)
// - WICHTIG: sort() verändert das Original-Array! Erstelle vorher eine Kopie mit [...namen]


// TODO 5: Erstelle ein Array `zahlen` mit den Werten:
// [5, 3, 8, 1, 9, 2, 7, 4, 6]
// - Sortiere aufsteigend (sort mit Vergleichsfunktion: (a, b) => a - b)
// - Finde den kleinsten Wert (mit dem sortierten Array oder Math.min)
// - Finde den größten Wert
// - Berechne den Durchschnitt (reduce für Summe, dann / length)


// Demonstration code - uncomment and run to test your implementation
/*
console.log("=== TODO 1: Farben ===");
console.log("Farben:", farben);
console.log("Entfernt:", letzteFarbe);

console.log("\n=== TODO 2: Suchen ===");
console.log("Enthält 30?", temperaturen.includes(30));       // true
console.log("Index von 25:", temperaturen.indexOf(25));       // 4
console.log("Erste > 24:", temperaturen.find(t => t > 24));   // 30

console.log("\n=== TODO 3: filter, map, reduce ===");
const warm = temperaturen.filter(t => t >= 20);
console.log("Warm (>= 20):", warm);                           // [22, 30, 25, 28, 20]
const fahrenheit = temperaturen.map(t => t * 1.8 + 32);
console.log("Fahrenheit:", fahrenheit);
const summe = temperaturen.reduce((sum, t) => sum + t, 0);
console.log("Summe:", summe);                                  // 170

console.log("\n=== TODO 4: Sortieren (Strings) ===");
const namenKopie = [...namen];
console.log("Alphabetisch:", namenKopie.sort());
console.log("Absteigend:", [...namen].sort((a, b) => b.localeCompare(a)));

console.log("\n=== TODO 5: Sortieren & Statistik (Zahlen) ===");
const sortiert = [...zahlen].sort((a, b) => a - b);
console.log("Sortiert:", sortiert);                            // [1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log("Minimum:", Math.min(...zahlen));                  // 1
console.log("Maximum:", Math.max(...zahlen));                  // 9
const durchschnitt = zahlen.reduce((s, z) => s + z, 0) / zahlen.length;
console.log("Durchschnitt:", durchschnitt);                    // 5
*/
