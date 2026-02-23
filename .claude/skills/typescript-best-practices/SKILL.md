---
name: typescript-best-practices
description: TypeScript best practices, type safety patterns, strict mode, generics, discriminated unions, utility types, satisfies operator, as const, Result pattern, error handling, and common anti-patterns. Use when writing, reviewing, or refactoring TypeScript code.
---

# TypeScript Best Practices

You are a senior TypeScript engineer. Apply these patterns when writing, reviewing, or refactoring TypeScript code.

## Strict Type Safety

Always assume `strict: true`. Prefer `noUncheckedIndexedAccess: true` for array/record access safety.

### Never use `any` -- use `unknown` and narrow

```typescript
// BAD
function parse(data: any) {
  return data.name.toUpperCase();
}

// GOOD
function parse(data: unknown) {
  if (typeof data === "object" && data !== null && "name" in data) {
    return (data as { name: string }).name.toUpperCase();
  }
  throw new Error("Invalid data");
}
```

### Type Narrowing

Use `typeof`, `in`, `instanceof`, and custom type guards:

```typescript
// typeof
function format(val: string | number): string {
  return typeof val === "string" ? val.toUpperCase() : val.toFixed(2);
}

// in operator
function area(shape: Circle | Rect): number {
  return "radius" in shape
    ? Math.PI * shape.radius ** 2
    : shape.w * shape.h;
}

// Custom type guard
function isError(val: unknown): val is Error {
  return val instanceof Error;
}
```

### Discriminated Unions with Exhaustiveness Check

```typescript
type Result<T> =
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: Error };

function handle<T>(r: Result<T>): string {
  switch (r.status) {
    case "loading":  return "Loading...";
    case "success":  return JSON.stringify(r.data);
    case "error":    return r.error.message;
    default:
      const _: never = r; // compile error if a case is missing
      return _;
  }
}
```

## Type Design

### `interface` vs `type`

Use `interface` for object shapes (better compiler perf, declaration merging). Use `type` for unions, tuples, mapped/conditional types.

```typescript
// interface for objects
interface User {
  id: string;
  name: string;
  email: string;
}

interface AdminUser extends User {
  permissions: string[];
}

// type for unions, tuples, mapped types
type Status = "active" | "inactive" | "suspended";
type Coordinate = [x: number, y: number];
```

### Generics -- always constrain

```typescript
// BAD: unconstrained
function getId<T>(obj: T) { return (obj as any).id; }

// GOOD: constrained
function getId<T extends { id: string }>(obj: T): string {
  return obj.id;
}
```

Do not over-genericize. If a function only works with one or two types, use explicit types or overloads.

### Utility Types

```typescript
interface User { id: string; name: string; email: string; age: number }

Partial<User>              // all optional (updates)
Required<User>             // all required
Pick<User, "id" | "name">  // subset
Omit<User, "id">           // exclude keys
Record<string, User>       // key-value map
Readonly<User>             // immutable
NonNullable<string | null> // strip null/undefined
```

### Mapped Types

```typescript
type Nullable<T> = { [K in keyof T]: T[K] | null };

type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};
```

## Modern TypeScript Features

### `satisfies` -- validate without widening

```typescript
type Theme = Record<string, { r: number; g: number; b: number } | string>;

// With annotation: loses literal info
const theme: Theme = { primary: "blue" };
theme.primary.toUpperCase(); // ERROR: might be object

// With satisfies: validates AND preserves narrow type
const theme = { primary: "blue" } satisfies Theme;
theme.primary.toUpperCase(); // OK -- TypeScript knows it's string
```

### `as const` -- deep readonly literals

```typescript
const ROUTES = {
  home: "/",
  users: "/users",
  settings: "/settings",
} as const;

type Route = (typeof ROUTES)[keyof typeof ROUTES]; // "/" | "/users" | "/settings"
```

### `as const satisfies` -- the sweet spot

```typescript
const ROUTES = {
  home: "/",
  users: "/users",
} as const satisfies Record<string, string>;
// Validates structure AND preserves literal types
```

### Template Literal Types

```typescript
type Event = "click" | "focus" | "blur";
type Handler = `on${Capitalize<Event>}`; // "onClick" | "onFocus" | "onBlur"

type CSSUnit = `${number}${"px" | "em" | "rem" | "%"}`;
```

## Error Handling

### Result Pattern (explicit errors in types)

```typescript
type Result<T, E = Error> =
  | { ok: true; value: T }
  | { ok: false; error: E };

function Ok<T>(value: T): Result<T, never> {
  return { ok: true, value };
}

function Err<E>(error: E): Result<never, E> {
  return { ok: false, error };
}

// Usage
function parseJSON(input: string): Result<unknown, SyntaxError> {
  try {
    return Ok(JSON.parse(input));
  } catch (e) {
    return Err(e instanceof SyntaxError ? e : new SyntaxError(String(e)));
  }
}

const result = parseJSON('{"ok": true}');
if (result.ok) {
  console.log(result.value);
} else {
  console.error(result.error.message);
}
```

### Typed Error Hierarchies

```typescript
class AppError extends Error {
  constructor(message: string, public readonly code: string) {
    super(message);
    this.name = "AppError";
  }
}

class NotFoundError extends AppError {
  constructor(resource: string, id: string) {
    super(`${resource} ${id} not found`, "NOT_FOUND");
  }
}

class ValidationError extends AppError {
  constructor(public readonly fields: Record<string, string>) {
    super("Validation failed", "VALIDATION");
  }
}
```

## Anti-Patterns -- Do Not Use

### Enums -- prefer union types

```typescript
// BAD: numeric enums accept any number, string enums add runtime code
enum Role { Admin = "ADMIN", User = "USER" }

// GOOD: zero runtime cost, better type safety
type Role = "admin" | "user" | "moderator";
```

### Type Assertions (`as`) -- use narrowing instead

```typescript
// BAD
const el = document.getElementById("app") as HTMLDivElement;

// GOOD
const el = document.getElementById("app");
if (el instanceof HTMLDivElement) { /* safe */ }
```

### Non-Null Assertions (`!`) -- handle the null case

```typescript
// BAD
const user = userMap.get(id)!;

// GOOD
const user = userMap.get(id);
if (!user) throw new NotFoundError("User", id);
```

### Loose object types

```typescript
// BAD
function process(obj: Object) {}
function run(fn: Function) {}

// GOOD
function process(obj: Record<string, unknown>) {}
function run(fn: (...args: unknown[]) => unknown) {}
```

## Recommended tsconfig.json

```jsonc
{
  "compilerOptions": {
    "target": "es2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "exactOptionalPropertyTypes": true,
    "esModuleInterop": true,
    "isolatedModules": true,
    "verbatimModuleSyntax": true,
    "resolveJsonModule": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "sourceMap": true,
    "declaration": true,
    "incremental": true
  }
}
```

## Boundaries

**Always:**
- Enable `strict: true` in tsconfig
- Use `unknown` instead of `any`, then narrow
- Use discriminated unions for state modeling with `never` exhaustiveness checks
- Prefer `satisfies` over `as` for type validation
- Constrain generic type parameters with `extends`
- Use `interface` for object shapes, `type` for unions and mapped types
- Handle nullable values explicitly instead of using `!`

**Ask first:**
- Before adding complex recursive conditional types (can degrade compiler performance)
- Before introducing barrel files in application code (can hurt bundle size)
- Before adding runtime type validation libraries (zod, io-ts) to the project

**Never:**
- Use `any` as a type (use `unknown` and narrow)
- Use numeric enums (use union types or `as const` objects)
- Use `@ts-ignore` without a justifying comment (prefer `@ts-expect-error`)
- Disable strict compiler flags in tsconfig
- Use `Object`, `Function`, or `{}` as types
