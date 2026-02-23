# Block 17: Jest Testing

Introduction to unit testing with Jest and TypeScript. Covers test structure, matchers, async testing, and mocking.

## Examples

1. **src/calculator.ts**
   - `Calculator` class with `add()`, `subtract()`, `multiply()`, `divide()`
   - Division-by-zero error handling
   - Operation history tracking

2. **src/string-utils.ts**
   - `capitalize()`, `slugify()`, `truncate()`, `isPalindrome()`, `countWords()`
   - Various string manipulation patterns

3. **src/async-service.ts**
   - `UserService` with async methods (`fetchUser`, `fetchUsers`, `createUser`, `deleteUser`)
   - `NotificationService` interface (designed for mocking)

4. **calculator.test.ts** (complete working example)
   - `describe` / `it` block structure
   - `beforeEach` for test setup
   - Matchers: `toBe`, `toEqual`, `toThrow`, `toHaveLength`
   - `not.toBe` for negation
   - Arrange-Act-Assert pattern (AAA)

## Exercises

The `/exercises` folder contains practice exercises:

1. **string-utils.test.ts** — Write assertions for string utility functions using various matchers (`toBe`, `toBeTruthy`, `toBeFalsy`, `toThrow`, `toMatch`)
2. **async-mock.test.ts** — Write async tests and mock the `NotificationService` using `jest.fn()`, `.resolves`, `.rejects`, `toHaveBeenCalledWith()`

Solutions can be found in the `/solutions` folder.

## Key Concepts

- **Test Structure:** `describe()` groups related tests, `it()` defines individual test cases
- **Matchers:** `toBe()` (strict equality), `toEqual()` (deep equality), `toThrow()` (exceptions)
- **Setup/Teardown:** `beforeEach()`, `afterEach()`, `beforeAll()`, `afterAll()`
- **Async Testing:** `async/await` in tests, `.resolves` / `.rejects` matchers
- **Mocking:** `jest.fn()` for mock functions, `mockResolvedValue()` for async mocks
- **Mock Assertions:** `toHaveBeenCalled()`, `toHaveBeenCalledWith()`, `not.toHaveBeenCalled()`

## How to Run

```bash
# Build
npm run build:block17

# Run all block17 tests
npm run test:block17

# Run a specific test
npx jest block17/calculator.test.ts

# Run tests in watch mode
npm run test:watch -- --testPathPattern=block17
```
