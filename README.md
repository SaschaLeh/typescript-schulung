# TypeScript Exercises

This repository contains practical TypeScript examples organized by topic.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Compile TypeScript files:

```bash
npm run build
```

3. Run a specific example:

```bash
npm start -- path/to/example.ts
```

## Project Structure

The examples are organized by topics corresponding to the course blocks:

### Folder Scoping

Each block is a self-contained module with its own scope. This means:

- Types and variables defined in one block are not accessible from other blocks
- Each block has its own TypeScript configuration (tsconfig.json)
- You can build blocks individually using the corresponding script:
  ```bash
  npm run build:block1    # Builds only Block 1
  ```

### Day 1: TypeScript Fundamentals

- **Block 1**: Introduction to TypeScript
  - Basic syntax, compilation, and project setup

- **Block 2**: Basic Types and Variables
  - Type annotations, primitives, and special types

  - **Block 4**: Arrays and Tuples
  - Working with arrays, array methods, and tuples

- **Block 5**: Functions in TypeScript
  - Function declarations, parameters, and return types

- **Block 13**: this-Keyword, Arrow Functions & Closures
  - `this`-Problem und Lösungen (Arrow Functions, `.bind()`)
  - Closures: Counter-Factory, Validator, var-in-Loop Falle
  - Übungen: Fakultätsfunktion (iterativ, rekursiv, memoized), Array-Methoden (filter, map, reduce, sort)

### Day 2: Object-Oriented Programming Concepts

- **Block 5**: Introduction to Objects
  - Object literals and properties

- **Block 6**: Interfaces
  - Defining interfaces for consistent structures

- **Block 7**: Introduction to Classes
  - Creating and working with classes

- **Block 8**: Inheritance and Polymorphism
  - Extending classes and method overriding

- **Block 14**: Auto-Klasse
  - Vehicle Basisklasse mit Getter und Validierung
  - Übung: Car Klasse mit Motor, Geschwindigkeitsbegrenzung und SportsCar Subklasse

### Day 3: Advanced Types and Real-World Application

- **Block 9**: Union and Intersection Types
  - Working with complex type compositions

- **Block 10**: Generics
  - Creating reusable, type-safe components

- **Block 11**: Error Handling
  - Managing errors and handling edge cases

- **Block 12**: Building a Mini-Project
  - Applying all concepts in a real-world example

- **Block 15**: Promises, Async/Await & Date API
  - Promises erstellen und verketten, `async/await`, `Promise.all()`
  - Date API: 0-indizierte Monate, Mutation-Pitfall, `Intl.DateTimeFormat`
  - Übungen: API-Fetcher mit Retry, Datum-Hilfsfunktionen

- **Block 16**: Generische Storage-Klasse
  - Generischer `Container<T>` mit `Map<string, T>`
  - Übung: Vollständige `DataStorage<T>` mit CRUD, Suche und Filterung

### Day 4: Testing, Angular & Best Practices

- **Block 17**: Jest Testing
  - Test-Struktur: `describe()`, `it()`, `beforeEach()`
  - Matchers: `toBe()`, `toEqual()`, `toThrow()`, `.resolves`, `.rejects`
  - Async Testing und Mocking mit `jest.fn()`
  - Übungen: String-Utils testen, Async-Mocking

- **Block 18**: Angular-Konzepte in TypeScript
  - Signals: `signal()`, `computed()`, `effect()` in purem TypeScript
  - Dependency Injection: Container, Constructor Injection
  - Component Lifecycle: `OnInit`, `OnDestroy`, `OnChanges`
  - Übung: Todo-App mit Signals, DI und Lifecycle Hooks

- **Block 19**: ESLint & Prettier Guide
  - Typische Lint-Probleme und deren Korrekturen im Vergleich
  - Setup-Guide: ESLint, Prettier, VS Code Integration

## Learning Approach

These examples follow a progressive learning path:

1. Starting with simple concepts
2. Building toward complex applications
3. Emphasizing practical, real-world usage

Each example is designed to demonstrate key TypeScript features while remaining straightforward enough for beginners to understand.
