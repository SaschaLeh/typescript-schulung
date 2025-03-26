# DAY 1: TypeScript Fundamental

## Block 1 (9:00 AM - 10:30 AM): Introduction to TypeScript
- What is TypeScript and why use it
  - Brief history: Developed by Microsoft, released in 2012
  - TypeScript as a superset of JavaScript
- Setting up the development environment (VS Code, Node.js, npm)
- Installing TypeScript and writing a first project
  - Introduction to tsconfig.json basics
- Basic syntax and types
- Example: "Hello TypeScript" program
  - Side-by-side comparison: JavaScript vs. TypeScript version
- The simple compilation/transpilation process from .ts to .js files
- Demonstrates immediate benefits of TypeScript's type checking
- Introduction to TypeScript Playground for quick experimentation

This folder contains examples demonstrating TypeScript basics:

## Examples

1. **hello-world.ts**
   - Basic TypeScript syntax
   - Type inference
   - Explicit type annotations
   - Simple function with types

2. **compilation-example.ts**
   - Shows how TypeScript prevents common JavaScript errors
   - Demonstration of type checking
   - Function parameter type checking

## How to Run

```bash
# Compile the TypeScript files
npm run build

# Run a specific example
npm start -- block1/hello-world.ts
npm start -- block1/compilation-example.ts
``` 