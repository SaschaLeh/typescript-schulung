# Block 17: Exercises — Jest Testing

## Exercise 1: String Utils Tests (`string-utils.test.ts`)

Write tests for the string utility functions in `../src/string-utils.ts`.

The test structure (`describe`/`it` blocks) is already provided. Your task is to add the correct `expect()` assertions where you see `TODO` comments.

**Matchers to practice:**
- `toBe()` — strict equality for primitives
- `toContain()` — check if string/array contains a value
- `toMatch()` — regex matching
- `toBeTruthy()` / `toBeFalsy()` — boolean-like checks
- `toThrow()` — exception testing
- `toHaveLength()` — array/string length

**Tip:** Look at `../calculator.test.ts` for working examples of all these matchers.

---

## Exercise 2: Async Tests & Mocking (`async-mock.test.ts`)

Write tests for the `UserService` class in `../src/async-service.ts`.

This exercise covers:
1. **Async/Await Tests** — Using `async`/`await` in test functions
2. **`.resolves` / `.rejects` Matchers** — Alternative syntax for async assertions
3. **Mocking with `jest.fn()`** — Creating mock implementations of interfaces
4. **Mock Assertions** — `toHaveBeenCalled()`, `toHaveBeenCalledWith()`
5. **Setup/Cleanup** — `beforeEach` / `afterEach` with `jest.clearAllMocks()`

**Tip:** The `NotificationService` interface needs to be mocked with `jest.fn()`. Use `mockResolvedValue(undefined)` since `notify()` returns `Promise<void>`.

---

## How to Run

```bash
# Run all block17 tests
npm run test:block17

# Run a specific test file
npx jest block17/exercises/string-utils.test.ts

# Run tests in watch mode (re-runs on file changes)
npm run test:watch -- --testPathPattern=block17
```

Solutions can be found in the `/solutions` folder.
