# Block 18: Angular-Konzepte in TypeScript

Dieses Modul baut zentrale Angular-Patterns in purem TypeScript nach — kein Angular CLI nötig. Die drei Kernkonzepte: **Signals** (reaktiver State), **Dependency Injection** (lose Kopplung) und **Component Lifecycle** (Initialisierung & Cleanup).

## Examples

1. **signals.ts**
   - `signal<T>(initial)` — reaktiver Wert mit Getter, `.set()`, `.update()`, `.asReadonly()`
   - `computed(() => ...)` — abgeleiteter Wert, automatisch neu berechnet
   - `effect(() => ...)` — Side Effect bei Signal-Änderung, mit `.destroy()` Cleanup
   - Demo: Counter-Signal, doubleCount-Computed, Logging-Effect
   - Praxisbeispiel: User-Profil mit fullName-Computed

2. **dependency-injection.ts**
   - `Container` Klasse mit `register<T>(token, factory)` und `resolve<T>(token)`
   - Singleton vs. Transient Lifecycle
   - Constructor Injection: `UserService` → `HttpService` + `LogService`
   - Vergleich mit Angular: `@Injectable({ providedIn: 'root' })`

3. **component-lifecycle.ts**
   - Interfaces: `OnInit`, `OnDestroy`, `OnChanges` mit `SimpleChanges`
   - `Component` Basisklasse mit Hook-Aufrufen: `init()`, `destroy()`, `detectChanges()`
   - `TimerComponent`: Interval in `onInit()`, Cleanup in `onDestroy()`
   - `DashboardComponent`: Input-Änderungen über `onChanges()` verarbeiten

## Exercises

The `/exercises` folder contains practice exercises to reinforce your understanding of Angular-Konzepten in TypeScript:

1. **todo-app.ts** - Todo-App mit Signals, Dependency Injection und Lifecycle Hooks

Solutions can be found in the `/solutions` folder.

## How to Run

```bash
# Compile the TypeScript files
npm run build:block18

# Run examples
npx ts-node block18/signals.ts
npx ts-node block18/dependency-injection.ts
npx ts-node block18/component-lifecycle.ts

# Run solution
npx ts-node block18/solutions/todo-app.ts
```
