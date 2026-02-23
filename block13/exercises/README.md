# Block 13: Exercises

## Exercise 1: Fakultätsfunktion (`factorial.ts`)

Implementiere die Fakultätsfunktion auf drei verschiedene Arten:

1. **Iterativ** — `factorial(n)` mit einer for-Schleife
2. **Rekursiv** — `factorialRecursive(n)` mit Rekursion
3. **Memoized** — `createMemoizedFactorial()` gibt eine gecachte Fakultätsfunktion zurück (Closure mit Map als Cache)

Edge-Cases:
- `factorial(0)` → `1`
- Negative Zahlen → Error werfen

## Exercise 2: EventEmitter & this-Binding (`event-handler.ts`)

Baue einen eigenen EventEmitter und zeige, wie `this` als Callback verloren geht:

1. **EventEmitter Klasse** — `on()`, `off()`, `emit()` Methoden
2. **Logger Klasse** — Methode `log()` nutzt `this.prefix`
3. **Problem demonstrieren** — `logger.log` als Callback übergeben → `this.prefix` ist undefined
4. **Zwei Fixes** — Arrow Function Wrapper und `.bind()`
