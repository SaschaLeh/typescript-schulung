# Block 13: this-Keyword, Arrow Functions & Closures

Dieses Modul behandelt das `this`-Keyword in TypeScript, den Unterschied zwischen regulären und Arrow Functions sowie Closures als mächtiges Konzept für private Daten und Funktionsfabriken.

## Examples

1. **this-keyword.ts**
   - Das Problem: `this` geht als Callback verloren
   - Lösung 1: Arrow Function als Wrapper
   - Lösung 2: `.bind()`
   - Mehrere Objekte und "ausgeliehene" Methoden
   - Timer-Beispiel: reguläre Funktion vs Arrow Function in `setInterval`
   - Merksatz: Normale Funktionen → `this` = Aufrufer / Arrow Functions → `this` = umgebender Scope

2. **closures.ts**
   - Counter-Factory: `erstelleZähler()` mit privatem `count`
   - Zwei Instanzen mit eigenem Speicher
   - Validator mit privatem Versuchszähler
   - `var`-in-Loop Falle und Fix mit `let`
   - Multiplikator-Factory als praktisches Beispiel

## Exercises

The `/exercises` folder contains practice exercises to reinforce your understanding of `this` and Closures:

1. **factorial.ts** - Fakultätsfunktion: iterativ, rekursiv und memoized (Closure mit Cache-Map)
2. **arrays.ts** - Array-Methoden: push, pop, includes, indexOf, find, filter, map, reduce, sort

Solutions can be found in the `/solutions` folder.

## How to Run

```bash
# Compile the TypeScript files
npm run build:block13

# Run examples
npx ts-node block13/this-keyword.ts
npx ts-node block13/closures.ts

# Run solutions
npx ts-node block13/solutions/factorial.ts
npx ts-node block13/solutions/arrays.ts
```
