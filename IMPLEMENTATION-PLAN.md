# Implementierungsplan: Fehlende Workshop-Übungen

> 9 Phasen, jede für sich abschließbar. Nach jeder Phase ist das Projekt kompilierbar.

## Phasen-Abhängigkeiten

```
Phase 1 (Root-Config) ← muss zuerst
  ├── Phase 2 (Block 13: this/Closures)
  ├── Phase 3 (Block 14: Auto-Klasse)
  ├── Phase 4 (Block 15: Async/Await)
  ├── Phase 5 (Block 16: Generic Storage)
  ├── Phase 6 (Block 17: Jest) ← braucht Phase 1
  ├── Phase 7 (Block 18: Angular)
  └── Phase 8 (Block 19: ESLint)
Phase 9 (README) ← nach allen anderen
```

---

## Konventionen

Jeder neue Block folgt exakt der bestehenden Struktur (siehe block5, block10):

**Ordnerstruktur:**
```
blockN/
├── tsconfig.json        # extends root, outDir: ../dist/blockN
├── README.md            # ## Examples, ## Exercises, ## How to Run
├── beispiel.ts          # Lehrbeispiele top-level
├── exercises/
│   ├── README.md        # Übungsbeschreibung
│   └── aufgabe.ts       # // TODO: Marker
└── solutions/
    └── aufgabe.ts       # Gleicher Dateiname wie exercise
```

**tsconfig.json** (in jedem Block identisch, nur N anpassen):
```json
{
  "extends": "../tsconfig.json",
  "compilerOptions": { "outDir": "../dist/blockN", "rootDir": "." },
  "include": ["./**/*.ts"]
}
```

**Exercise-Pattern** (wie `block5/exercises/product-catalog.ts` und `block10/exercises/exercise1.ts`):
- JSDoc Header mit Übungstitel und Beschreibung
- `// TODO:` Kommentare mit Aufgabenbeschreibung
- Auskommentierter Demo/Test-Code am Ende

**README.md Pattern** (wie `block4/README.md`, `block5/README.md`):
```markdown
# Block N: Thema

Beschreibungssatz.

## Examples
1. **datei.ts**
   - Punkt 1
   - Punkt 2

## Exercises
The `/exercises` folder contains practice exercises:
1. **aufgabe.ts** - Kurzbeschreibung
Solutions can be found in the `/solutions` folder.

## How to Run
\```bash
npx ts-node blockN/datei.ts
\```
```

---

## Phase 1: Root-Konfiguration

> Dateien: `package.json` (edit), `tsconfig.json` (edit), `jest.config.ts` (neu)

### package.json editieren

`scripts` — ändern und hinzufügen:
```json
"test": "jest",
"test:watch": "jest --watch",
"test:block17": "jest --testPathPattern=block17",
"build:block13": "tsc -b block13",
"build:block14": "tsc -b block14",
"build:block15": "tsc -b block15",
"build:block16": "tsc -b block16",
"build:block17": "tsc -b block17",
"build:block18": "tsc -b block18",
"build:block19": "tsc -b block19"
```

`devDependencies` — hinzufügen:
```json
"jest": "^29.7.0",
"ts-jest": "^29.1.1",
"@types/jest": "^29.5.11"
```

### tsconfig.json editieren

`references` Array erweitern:
```json
{ "path": "./block13" },
{ "path": "./block14" },
{ "path": "./block15" },
{ "path": "./block16" },
{ "path": "./block17" },
{ "path": "./block18" },
{ "path": "./block19" }
```

### jest.config.ts erstellen (Root)

```typescript
import type { Config } from 'jest';
const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>'],
  testMatch: ['**/*.test.ts'],
};
export default config;
```

### Verifizierung

```bash
npm install
npm run build  # bestehende Blöcke kompilieren weiterhin
```

---

## Phase 2: Block 13 — this, Closures & Fakultät (Tag 1)

> Folienthemen: `this`-Keyword (6 Folien), Closures (4 Folien), Übung "Fakultätsfunktion"

### Dateien

| Datei | Typ | Inhalt |
|-------|-----|--------|
| `block13/tsconfig.json` | Config | Standard-Template |
| `block13/README.md` | Doku | Examples + Exercises Beschreibung |
| `block13/this-keyword.ts` | Beispiel | `this`-Problem, Arrow Functions, `.bind()` |
| `block13/closures.ts` | Beispiel | Counter-Factory, Validator, var-Loop-Falle |
| `block13/exercises/README.md` | Doku | Übungsbeschreibungen |
| `block13/exercises/factorial.ts` | Übung | Iterativ, rekursiv, memoized (Closure) |
| `block13/exercises/event-handler.ts` | Übung | EventEmitter + this-Binding |
| `block13/solutions/factorial.ts` | Lösung | Vollständig |
| `block13/solutions/event-handler.ts` | Lösung | Vollständig |

### this-keyword.ts — Inhalt

- Klasse `Button` mit `label` und `handleClick()` als reguläre Methode → `this` verloren als Callback
- Lösung 1: Arrow Function als Property: `handleClick = () => { console.log(this.label); }`
- Lösung 2: `.bind(this)` im Konstruktor
- Klasse `Timer` mit `startBroken()` (reguläre Funktion in setInterval → `this` undefined) vs `startWorking()` (Arrow → `this` korrekt) — **direkt aus den Folien**
- Merksatz-Kommentar: "Normale Funktionen: this = Aufrufer / Arrow Functions: this = umgebende Klasse"

### closures.ts — Inhalt

- `erstelleZähler()`: gibt Funktion zurück, private `count` Variable — **wie in Folien**
- Zwei Instanzen `zähler1`, `zähler2` demonstrieren eigenen Speicher — **wie in Folien**
- `erstelleValidator(minLänge: number)`: privater `versuche`-Zähler — **wie in Folien**
- `var`-in-Loop-Falle: 3 Funktionen drucken alle "3", dann Fix mit `let`

### exercises/factorial.ts — Aufgaben

```
TODO 1: factorial(n: number): number — iterativ mit for-Schleife
TODO 2: factorialRecursive(n: number): number — rekursiv
TODO 3: createMemoizedFactorial(): (n: number) => number — Closure mit Cache-Map
TODO 4: Edge-Cases: 0 → 1, negative Zahlen → Error werfen
```

### exercises/event-handler.ts — Aufgaben

```
TODO 1: EventEmitter Klasse mit on(event, handler), off(event, handler), emit(event, ...args)
TODO 2: Logger Klasse mit log() Methode, die this.prefix nutzt
TODO 3: logger.log als Callback an emitter.on übergeben → this verloren demonstrieren
TODO 4: Fix mit Arrow Function oder .bind()
```

### Verifizierung

```bash
npm run build:block13
npx ts-node block13/this-keyword.ts
npx ts-node block13/closures.ts
npx ts-node block13/solutions/factorial.ts
npx ts-node block13/solutions/event-handler.ts
```

---

## Phase 3: Block 14 — Auto-Klasse (Tag 2)

> Folienthema: Übung "Auto-Klasse" — accelerate(), brake(), Geschwindigkeitsbegrenzung

### Dateien

| Datei | Typ | Inhalt |
|-------|-----|--------|
| `block14/tsconfig.json` | Config | Standard-Template |
| `block14/README.md` | Doku | Examples + Exercises |
| `block14/car-demo.ts` | Beispiel | Vehicle Basisklasse |
| `block14/exercises/README.md` | Doku | Übungsbeschreibung |
| `block14/exercises/auto-klasse.ts` | Übung | Car + SportsCar |
| `block14/solutions/auto-klasse.ts` | Lösung | Vollständig |

### car-demo.ts — Inhalt

- `Vehicle` Basisklasse: `brand`, `model`, private `_speed` mit Getter
- `accelerate(amount)` und `brake(amount)` mit Validierung
- Kurz und knapp — Warm-up vor der Übung

### exercises/auto-klasse.ts — Aufgaben

```
TODO 1: Car Klasse — brand, model, year, color, maxSpeed (public), currentSpeed + isEngineRunning (private)
TODO 2: startEngine() / stopEngine()
TODO 3: accelerate(amount) — maxSpeed respektieren, Error wenn Motor aus
TODO 4: brake(amount) — nicht unter 0
TODO 5: Getter speed, Methode getStatus(): string
TODO 6: SportsCar extends Car — turboBoost(), höherer maxSpeed
```

Demo-Code am Ende: 2-3 Autos erstellen, beschleunigen, bremsen, Status ausgeben

### Verifizierung

```bash
npm run build:block14
npx ts-node block14/car-demo.ts
npx ts-node block14/solutions/auto-klasse.ts
```

---

## Phase 4: Block 15 — Promises, Async/Await & Date API (Tag 3)

> Folienthemen: Promises, Async/Await (3+ Folien), Date API (3 Folien)

### Dateien

| Datei | Typ | Inhalt |
|-------|-----|--------|
| `block15/tsconfig.json` | Config | Standard-Template |
| `block15/README.md` | Doku | Examples + Exercises |
| `block15/promises-basics.ts` | Beispiel | Promise erstellen, Ketten, all/race |
| `block15/async-await.ts` | Beispiel | async/await, try/catch, parallel |
| `block15/date-api.ts` | Beispiel | Date Pitfalls, Formatierung |
| `block15/exercises/README.md` | Doku | Übungsbeschreibungen |
| `block15/exercises/async-data-fetcher.ts` | Übung | API-Fetcher mit Retry |
| `block15/exercises/date-utils.ts` | Übung | Datum-Hilfsfunktionen |
| `block15/solutions/async-data-fetcher.ts` | Lösung | Vollständig |
| `block15/solutions/date-utils.ts` | Lösung | Vollständig |

### promises-basics.ts — Inhalt

- `new Promise<string>((resolve, reject) => ...)` manuell erstellen
- `.then().catch().finally()` Ketten
- `Promise.all()`, `Promise.race()`, `Promise.allSettled()`
- Simulierte API-Calls: `function fetchUser(id: number): Promise<User>`

### async-await.ts — Inhalt

- Gleiche simulierte APIs, mit async/await statt .then()
- Vorher/Nachher Vergleich
- try/catch, parallele Ausführung mit `Promise.all()`

### date-api.ts — Inhalt

- `new Date(2024, 0, 15)` → 15. Januar (0-indiziert) — **wie Folien**
- `date.setMonth(5)` verändert Original — **wie Folien**
- `Intl.DateTimeFormat` für Formatierung
- Verweis auf date-fns, Temporal API — **wie Folien**

### exercises/async-data-fetcher.ts — Aufgaben

```
TODO 1: ApiResponse<T> Interface — data: T, status: number, message: string
TODO 2: fetchUser(id: number): Promise<User> — simuliert mit setTimeout
TODO 3: fetchUserPosts(userId: number): Promise<Post[]>
TODO 4: fetchUserWithPosts(id) — async/await, beide Calls kombinieren
TODO 5: ApiError extends Error — statusCode Property
TODO 6: retry<T>(fn: () => Promise<T>, maxRetries: number): Promise<T>
```

### exercises/date-utils.ts — Aufgaben

```
TODO 1: formatDate(date: Date, locale: string): string
TODO 2: calculateAge(birthDate: Date): number
TODO 3: addDays(date: Date, days: number): Date — immutable!
TODO 4: isWeekend(date: Date): boolean
TODO 5: getRelativeTime(date: Date): string — "vor 3 Tagen", "in 2 Stunden"
```

### Verifizierung

```bash
npm run build:block15
npx ts-node block15/promises-basics.ts
npx ts-node block15/async-await.ts
npx ts-node block15/date-api.ts
npx ts-node block15/solutions/async-data-fetcher.ts
npx ts-node block15/solutions/date-utils.ts
```

---

## Phase 5: Block 16 — Generische Storage-Klasse (Tag 3)

> Folienthema: Übung "Generische Storage-Klasse" — add(), get(), getAll()

### Dateien

| Datei | Typ | Inhalt |
|-------|-----|--------|
| `block16/tsconfig.json` | Config | Standard-Template |
| `block16/README.md` | Doku | Examples + Exercises |
| `block16/storage-demo.ts` | Beispiel | Container\<T\>, Map-Pattern |
| `block16/exercises/README.md` | Doku | Übungsbeschreibung |
| `block16/exercises/generic-storage.ts` | Übung | Storage\<T\> Klasse |
| `block16/solutions/generic-storage.ts` | Lösung | Vollständig |

### exercises/generic-storage.ts — Aufgaben

```
TODO 1: Storage<T> Klasse mit private items: Map<string, T>
TODO 2: add(key: string, value: T): void
TODO 3: get(key: string): T | undefined
TODO 4: getAll(): T[]
TODO 5: has(key), delete(key), clear(), size Getter
TODO 6: find(predicate: (item: T) => boolean): T | undefined
TODO 7: filter(predicate: (item: T) => boolean): T[]
```

Test-Code am Ende: `Storage<User>`, `Storage<Product>`, `Storage<number>` — zeigt generische Wiederverwendbarkeit

### Verifizierung

```bash
npm run build:block16
npx ts-node block16/storage-demo.ts
npx ts-node block16/solutions/generic-storage.ts
```

---

## Phase 6: Block 17 — Jest Testing (Tag 4)

> Folienthemen: Jest (10+ Folien) — Matchers, Mocking, Async, Setup/Teardown
> **Voraussetzung: Phase 1 muss abgeschlossen sein (Jest installiert)**

### Dateien

| Datei | Typ | Inhalt |
|-------|-----|--------|
| `block17/tsconfig.json` | Config | Standard-Template |
| `block17/README.md` | Doku | Examples + Exercises + How to Run Tests |
| `block17/src/calculator.ts` | Source | Calculator Klasse |
| `block17/src/string-utils.ts` | Source | String-Hilfsfunktionen |
| `block17/src/async-service.ts` | Source | Async UserService + NotificationService Interface |
| `block17/calculator.test.ts` | Beispiel | Vollständiger lauffähiger Test |
| `block17/exercises/README.md` | Doku | Übungsbeschreibungen |
| `block17/exercises/string-utils.test.ts` | Übung | Tests mit TODO-Assertions |
| `block17/exercises/async-mock.test.ts` | Übung | Async + Mocking Tests |
| `block17/solutions/string-utils.test.ts` | Lösung | Vollständig |
| `block17/solutions/async-mock.test.ts` | Lösung | Vollständig |

### src/calculator.ts — Inhalt

- `Calculator` Klasse: `add()`, `subtract()`, `multiply()`, `divide()` (wirft bei /0)
- `history(): string[]` — letzte Operationen

### src/string-utils.ts — Inhalt

- `capitalize(str)`, `slugify(str)`, `truncate(str, maxLength)`, `isPalindrome(str)`, `countWords(str)`

### src/async-service.ts — Inhalt

- `UserService` mit `fetchUser(id): Promise<User>`, `fetchUsers(): Promise<User[]>` (simuliert)
- `NotificationService` Interface mit `notify(message): Promise<void>` (zum Mocken)

### calculator.test.ts — Lehrbeispiel (lauffähig)

- `describe('Calculator', () => { ... })` mit `beforeEach` für frische Instanz
- Tests für alle Operationen
- `toBe()`, `toEqual()`, `toThrow()` Matchers
- Arrange-Act-Assert kommentiert — **wie in Folien**

### exercises/string-utils.test.ts — Aufgaben

```
Struktur vorgegeben: describe('capitalize', () => { it('capitalizes first letter', () => {
  TODO: expect()-Assertions ergänzen
})})
Matchers üben: toBe, toContain, toMatch, toBeTruthy/toBeFalsy
```

### exercises/async-mock.test.ts — Aufgaben

```
TODO 1: jest.fn() Mock für NotificationService erstellen
TODO 2: Async Test mit async/await
TODO 3: .resolves / .rejects Matcher
TODO 4: toHaveBeenCalledWith() prüfen
TODO 5: beforeEach/afterEach mit jest.clearAllMocks()
```

### Verifizierung

```bash
npm run build:block17
npm run test:block17          # calculator.test.ts + solutions grün
npx jest block17/calculator   # Lehrbeispiel einzeln
```

---

## Phase 7: Block 18 — Angular-Konzepte in TypeScript (Tag 4)

> Folienthemen: Angular (15+ Folien) — Signals, DI, Components, Lifecycle
> Ansatz: Angular-Patterns in purem TypeScript nachbauen (kein Angular CLI nötig)

### Dateien

| Datei | Typ | Inhalt |
|-------|-----|--------|
| `block18/tsconfig.json` | Config | Standard + `experimentalDecorators: true` |
| `block18/README.md` | Doku | Examples + Exercises |
| `block18/signals.ts` | Beispiel | signal(), computed(), effect() |
| `block18/dependency-injection.ts` | Beispiel | DI-Container, Constructor Injection |
| `block18/component-lifecycle.ts` | Beispiel | OnInit, OnDestroy, OnChanges |
| `block18/exercises/README.md` | Doku | Übungsbeschreibung |
| `block18/exercises/todo-app.ts` | Übung | Todo-App mit Signals + DI + Lifecycle |
| `block18/solutions/todo-app.ts` | Lösung | Vollständig |

### signals.ts — Inhalt

- `signal<T>(initial)` — gibt Getter-Funktion zurück mit `.set()`, `.update()`, `.asReadonly()`
- `computed(() => ...)` — abgeleiteter Wert, automatisch neu berechnet
- `effect(() => ...)` — Side Effect bei Änderung
- Demo: `count` Signal, `doubleCount` computed, Logging-Effect

### dependency-injection.ts — Inhalt

- `Container` Klasse: `register<T>(token, factory)`, `resolve<T>(token)`
- Demo: `UserService` → `HttpService` + `LogService`
- Kommentare: wie `@Injectable({ providedIn: 'root' })` funktioniert

### component-lifecycle.ts — Inhalt

- Interfaces: `OnInit { onInit(): void }`, `OnDestroy { onDestroy(): void }`, `OnChanges`
- `Component` Basisklasse mit Hook-Aufrufen
- `TimerComponent`: Interval in `onInit()`, Cleanup in `onDestroy()`

### exercises/todo-app.ts — Aufgaben

```
TODO 1: TodoItem Interface — id, title, completed, createdAt
TODO 2: StorageService — load<T>(key): T | null, save<T>(key, data): void
TODO 3: TodoService mit Constructor Injection von StorageService
TODO 4: Signals: todos (signal), filter (signal), filteredTodos (computed), todoCount (computed)
TODO 5: CRUD: addTodo(), toggleTodo(id), deleteTodo(id), setFilter(filter)
TODO 6: Lifecycle: init() lädt aus Storage, destroy() speichert
```

### Verifizierung

```bash
npm run build:block18
npx ts-node block18/signals.ts
npx ts-node block18/dependency-injection.ts
npx ts-node block18/component-lifecycle.ts
npx ts-node block18/solutions/todo-app.ts
```

---

## Phase 8: Block 19 — ESLint & Prettier Guide (Tag 4)

> Folienthemen: ESLint, Prettier (2 Folien)

### Dateien

| Datei | Typ | Inhalt |
|-------|-----|--------|
| `block19/tsconfig.json` | Config | Standard-Template |
| `block19/README.md` | Doku | Setup-Guide + Examples |
| `block19/lint-examples.ts` | Beispiel | Absichtliche Lint-Probleme |
| `block19/lint-fixed.ts` | Beispiel | Gleicher Code, alle Issues behoben |

### lint-examples.ts — Inhalt

- Unused Variables, `any`-Typen, fehlende Return-Typen, inkonsistente Formatierung
- Jedes Problem mit Kommentar welche ESLint-Regel es fängt

### lint-fixed.ts — Inhalt

- Identischer Code, alle Issues behoben — Side-by-Side Vergleich

### README.md — Inhalt

Setup-Guide: npm install Befehle, `.eslintrc.json` Beispiel, `.prettierrc` Beispiel, VS Code Extensions

### Verifizierung

```bash
npm run build:block19
npx ts-node block19/lint-examples.ts
npx ts-node block19/lint-fixed.ts
```

---

## Phase 9: Root README aktualisieren

> Nach allen anderen Phasen

### README.md editieren

Neue Blöcke in die bestehende Übersicht aufnehmen:

```
Tag 1 — Grundlagen & Typsystem:
  Block 13: this-Keyword, Arrow Functions & Closures

Tag 2 — OOP & Interfaces:
  Block 14: Auto-Klasse

Tag 3 — Advanced Types & Async:
  Block 15: Promises, Async/Await & Date API
  Block 16: Generische Storage-Klasse

Tag 4 — Best Practices & Angular:
  Block 17: Jest Testing
  Block 18: Angular-Konzepte in TypeScript
  Block 19: ESLint & Prettier Guide
```

### Verifizierung

```bash
npm run build   # alle 19 Blöcke kompilieren
npm test         # block17 Tests grün
```
