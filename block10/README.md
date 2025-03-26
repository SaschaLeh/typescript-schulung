# Block 10: Generics in TypeScript

This directory contains exercises and examples demonstrating generic types in TypeScript:

## Files in this Directory

1. **generics-basics.ts**
   - Introduction to generic types
   - Generic functions
   - Type parameters and constraints

2. **generic-interfaces.ts**
   - Generic interfaces
   - Generic classes
   - Real-world examples of generic interfaces

3. **generic-constraints.ts**
   - Using extends to constrain types
   - Multiple type parameters
   - Default type parameters

4. **data-containers.ts**
   - Implementation of a generic Box<T> class
   - Implementation of a generic Queue<T> data structure
   - Using generics for type-safe collections

## How to Run

```bash
# Compile the TypeScript files
npx tsc

# Run a specific example
node dist/block10/generics-basics.js
node dist/block10/generic-interfaces.js
node dist/block10/generic-constraints.js
node dist/block10/data-containers.js
```

## Key Concepts

- **Generic Types**: Allow you to create reusable components that work with different data types
- **Type Parameters**: Placeholders for types that are specified when the component is used
- **Constraints**: Restrict which types can be used with a generic
- **Generic Classes and Interfaces**: Define flexible, reusable blueprints
- **Type-Safe Collections**: Use generics to create containers that handle specific data types 