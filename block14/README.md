# Block 14: Auto-Klasse

Dieses Modul behandelt objektorientierte Programmierung in TypeScript anhand einer Auto-Klasse: Klassen, Vererbung, Kapselung mit `private`/`public`, Getter, Methoden mit Validierung und Subklassen mit `extends`.

## Examples

1. **car-demo.ts**
   - `Vehicle` Basisklasse mit `brand`, `model` und privater `_speed`
   - Getter für read-only Zugriff auf die Geschwindigkeit
   - `accelerate()` und `brake()` mit Validierung
   - Fehlerbehandlung bei ungültigen Werten

## Exercises

The `/exercises` folder contains practice exercises to reinforce your understanding of Klassen und Vererbung:

1. **auto-klasse.ts** - Car Klasse mit Motor, Geschwindigkeitsbegrenzung und SportsCar Subklasse mit Turbo-Boost

Solutions can be found in the `/solutions` folder.

## How to Run

```bash
# Compile the TypeScript files
npm run build:block14

# Run examples
npx ts-node block14/car-demo.ts

# Run solutions
npx ts-node block14/solutions/auto-klasse.ts
```
