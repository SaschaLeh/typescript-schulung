# Block 11: Error Handling in TypeScript

This directory contains examples of error handling in TypeScript, demonstrating different strategies and best practices.

## Files in this directory

1. **error-types.ts**: Demonstrates different built-in error types in TypeScript and basic try/catch blocks.
   - Run: `npx ts-node block11/error-types.ts`

2. **custom-errors.ts**: Shows how to create custom error types by extending the base Error class.
   - This file is imported by form-validation.ts

3. **form-validation.ts**: Implements a form validation system using custom error types.
   - Run: `npx ts-node block11/form-validation.ts`

4. **type-safe-error-handling.ts**: Demonstrates a more advanced pattern for type-safe error handling using a Result type.
   - Run: `npx ts-node block11/type-safe-error-handling.ts`

## Key Concepts

### Error Types in TypeScript
- Standard Error types: `Error`, `TypeError`, `RangeError`, `SyntaxError`
- Creating custom error types by extending the base `Error` class

### Try/Catch Blocks
- Basic error catching and handling
- Type narrowing for caught errors (`instanceof` checks)
- Re-throwing errors after handling

### Custom Error Types
- Creating specialized error classes for different scenarios
- Adding custom properties and methods
- Maintaining the correct prototype chain

### Error Handling Best Practices
- Using descriptive error messages
- Implementing type-safe error handling patterns
- Using the Result type pattern to handle errors in a functional way
- Discriminated unions for error handling

### Form Validation System
- Validating user input with custom error types
- Type-safe handling of different validation errors
- Providing helpful error messages for users

## Running the Examples

To run any example file:

```bash
npx ts-node block11/[file-name].ts
```

For example:

```bash
npx ts-node block11/form-validation.ts
``` 