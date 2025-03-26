# Block 9: Union and Intersection Types

This directory contains exercises and examples demonstrating union and intersection types in TypeScript:

## Files in this Directory

1. **union-basics.ts**
   - Basic union types syntax
   - Type narrowing examples
   - Discriminated unions

2. **type-guards.ts**
   - Type guards using typeof
   - User-defined type guards with predicates
   - Exhaustive checking with never type

3. **intersection-basics.ts**
   - Basic intersection type syntax
   - Combining types with &
   - Practical use cases

4. **message-system.ts**
   - Complete example of a message system
   - Using unions to handle different message types (text, image, video)
   - Using intersection types to add metadata to messages
   - Type narrowing with discriminated unions

## How to Run

```bash
# Compile the TypeScript files
npx tsc

# Run a specific example
node dist/block9/union-basics.js
node dist/block9/type-guards.js
node dist/block9/intersection-basics.js
node dist/block9/message-system.js
```

## Key Concepts

- **Union Types** (`|`): Allow a value to be one of several types
- **Type Narrowing**: Techniques to determine the specific type within a union
- **Discriminated Unions**: Adding a common property to identify which type is being used
- **Intersection Types** (`&`): Combine multiple types into one
- **Type Guards**: Functions that check the type at runtime and inform TypeScript's type system 