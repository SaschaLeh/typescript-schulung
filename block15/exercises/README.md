# Promises, Async/Await & Date API Exercises

This folder contains two exercises to practice asynchronous programming and the Date API:

1. **Exercise 1: Async Data Fetcher**
   - Define API response interfaces
   - Implement simulated async API calls with `Promise` and `setTimeout`
   - Combine multiple async calls with `async/await`
   - Create a custom `ApiError` class
   - Build a generic `retry()` function for fault tolerance

2. **Exercise 2: Date Utilities**
   - Format dates with locale support using `Intl.DateTimeFormat`
   - Calculate age from a birth date
   - Add days to a date immutably
   - Check if a date falls on a weekend
   - Generate relative time strings ("vor 3 Tagen", "in 2 Stunden")

Complete each exercise by following the `// TODO:` instructions in the comments.
Check your solutions against the provided solution files in `/solutions`.

Run the exercises with:
```bash
npx ts-node block15/exercises/async-data-fetcher.ts
npx ts-node block15/exercises/date-utils.ts
```
