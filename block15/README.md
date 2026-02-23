# Block 15: Promises, Async/Await & Date API

This directory contains examples and exercises covering asynchronous programming with Promises and async/await, as well as the JavaScript Date API.

## Examples

1. **promises-basics.ts**
   - Creating Promises manually with `new Promise()`
   - Chaining with `.then()`, `.catch()`, `.finally()`
   - `Promise.all()`, `Promise.race()`, `Promise.allSettled()`
   - Simulated API calls returning Promises

2. **async-await.ts**
   - Converting Promise chains to async/await
   - Error handling with try/catch
   - Parallel execution with `Promise.all()`
   - Before/after comparison: .then() vs async/await

3. **date-api.ts**
   - Date creation and 0-indexed months pitfall
   - Mutation pitfall with `setMonth()` / `setDate()`
   - `Intl.DateTimeFormat` for locale-aware formatting
   - References to date-fns and Temporal API

## Exercises

The `/exercises` folder contains practice exercises:

1. **async-data-fetcher.ts** - Build an async API fetcher with retry logic and error handling
2. **date-utils.ts** - Implement date utility functions for formatting, age calculation, and relative time

Solutions can be found in the `/solutions` folder.

## How to Run

```bash
# Run examples
npx ts-node block15/promises-basics.ts
npx ts-node block15/async-await.ts
npx ts-node block15/date-api.ts

# Run solutions
npx ts-node block15/solutions/async-data-fetcher.ts
npx ts-node block15/solutions/date-utils.ts
```
