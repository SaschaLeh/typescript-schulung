export {};

/**
 * Exercise: Todo-App mit Angular-Konzepten
 *
 * In dieser Übung baust du eine Todo-App, die alle drei Angular-Konzepte kombiniert:
 * - Signals für reaktiven State
 * - Dependency Injection für lose Kopplung
 * - Lifecycle Hooks für Initialisierung und Cleanup
 *
 * Nutze die Beispieldateien signals.ts, dependency-injection.ts und
 * component-lifecycle.ts als Referenz.
 */


// ============================================================
// Signal-Implementierung (wiederverwendbar — nicht verändern!)
// ============================================================

type Signal<T> = {
  (): T;
  set(value: T): void;
  update(fn: (current: T) => T): void;
  asReadonly(): () => T;
};

let currentEffect: (() => void) | null = null;

function signal<T>(initial: T): Signal<T> {
  let value = initial;
  const subscribers = new Set<() => void>();

  const signalFn = function (): T {
    if (currentEffect) {
      subscribers.add(currentEffect);
    }
    return value;
  } as Signal<T>;

  signalFn.set = function (newValue: T): void {
    value = newValue;
    [...subscribers].forEach((fn) => fn());
  };

  signalFn.update = function (fn: (current: T) => T): void {
    signalFn.set(fn(value));
  };

  signalFn.asReadonly = function (): () => T {
    return () => signalFn();
  };

  return signalFn;
}

function computed<T>(computeFn: () => T): () => T {
  return function (): T {
    return computeFn();
  };
}


// ============================================================
// Lifecycle-Interfaces (wiederverwendbar — nicht verändern!)
// ============================================================

interface OnInit {
  onInit(): void;
}

interface OnDestroy {
  onDestroy(): void;
}


// ============================================================
// Filter-Typ (vorgegeben)
// ============================================================

type TodoFilter = "all" | "active" | "completed";


// ============================================================
// TODO 1: TodoItem Interface definieren
// ============================================================

// TODO: Erstelle ein TodoItem Interface mit folgenden Properties:
// - id: number
// - title: string
// - completed: boolean
// - createdAt: Date


// ============================================================
// TODO 2: StorageService implementieren
// ============================================================

// TODO: Erstelle eine Klasse StorageService mit folgenden Methoden:
// - load<T>(key: string): T | null
//   → Versucht den Wert aus einem internen Map<string, string> zu laden
//   → Gibt null zurück, wenn der Key nicht existiert
//   → Nutze JSON.parse() zum Deserialisieren
//
// - save<T>(key: string, data: T): void
//   → Speichert den Wert als JSON-String in der internen Map
//   → Nutze JSON.stringify() zum Serialisieren
//
// Tipp: Nutze eine Map<string, string> als internen Speicher (statt localStorage,
// da wir in Node.js sind). In Angular würde man hier localStorage oder eine
// HTTP-API nutzen.


// ============================================================
// TODO 3: TodoService mit Constructor Injection
// ============================================================

// TODO: Erstelle eine Klasse TodoService die OnInit und OnDestroy implementiert.
//
// Konstruktor:
// - Nimmt einen StorageService als Parameter (Constructor Injection)
// - Speichere die Referenz als private Property
//
// Private Konstante für den Storage-Key:
// - STORAGE_KEY = "todos"


// ============================================================
// TODO 4: Signals im TodoService definieren
// ============================================================

// TODO: Füge dem TodoService folgende Signal-Properties hinzu:
// - todos: Signal<TodoItem[]> — initialisiert mit leerem Array
// - filter: Signal<TodoFilter> — initialisiert mit "all"
// - filteredTodos: computed Signal — filtert todos basierend auf filter:
//     "all" → alle Todos
//     "active" → nur completed === false
//     "completed" → nur completed === true
// - todoCount: computed Signal — gibt die Anzahl aller Todos zurück


// ============================================================
// TODO 5: CRUD-Methoden im TodoService
// ============================================================

// TODO: Implementiere folgende Methoden im TodoService:
//
// addTodo(title: string): void
//   → Erstellt ein neues TodoItem mit:
//     - id: fortlaufender Counter (z.B. private nextId = 1; dann this.nextId++)
//     - title: der übergebene String
//     - completed: false
//     - createdAt: new Date()
//   → Fügt es zum todos-Signal hinzu mit .update()
//
// toggleTodo(id: number): void
//   → Findet das Todo mit der gegebenen ID
//   → Togglet dessen completed-Status
//   → Nutze .update() mit .map() auf dem Array
//
// deleteTodo(id: number): void
//   → Entfernt das Todo mit der gegebenen ID
//   → Nutze .update() mit .filter() auf dem Array
//
// setFilter(filter: TodoFilter): void
//   → Setzt das filter-Signal auf den neuen Wert


// ============================================================
// TODO 6: Lifecycle-Methoden im TodoService
// ============================================================

// TODO: Implementiere die Lifecycle-Hooks:
//
// onInit(): void
//   → Versuche Todos aus dem StorageService zu laden (key: STORAGE_KEY)
//   → Wenn Daten vorhanden: setze das todos-Signal mit .set()
//   → Wenn keine Daten: todos bleibt leer
//   → Gib eine Log-Meldung aus: "TodoService initialisiert — X Todos geladen"
//
// onDestroy(): void
//   → Speichere die aktuellen Todos im StorageService (key: STORAGE_KEY)
//   → Gib eine Log-Meldung aus: "TodoService zerstört — X Todos gespeichert"


// Demonstration code - uncomment and run to test your implementation
/*
console.log("=== Todo-App mit Angular-Konzepten ===\n");

// DI: StorageService erstellen und injizieren
const storageService = new StorageService();
const todoService = new TodoService(storageService);

// Lifecycle: Initialisierung
todoService.onInit();

// Todos hinzufügen
console.log("\n--- Todos hinzufügen ---");
todoService.addTodo("TypeScript lernen");
todoService.addTodo("Angular Signals verstehen");
todoService.addTodo("DI-Pattern anwenden");
console.log("Anzahl Todos:", todoService.todoCount());
console.log("Alle Todos:", todoService.filteredTodos());

// Todo als erledigt markieren
console.log("\n--- Todo togglen ---");
const firstTodoId = todoService.todos()[0].id;
todoService.toggleTodo(firstTodoId);
console.log("Nach Toggle:", todoService.todos().map(t => `${t.title}: ${t.completed ? "✓" : "○"}`));

// Filter setzen
console.log("\n--- Filter: nur aktive ---");
todoService.setFilter("active");
console.log("Aktive Todos:", todoService.filteredTodos().map(t => t.title));

console.log("\n--- Filter: nur erledigte ---");
todoService.setFilter("completed");
console.log("Erledigte Todos:", todoService.filteredTodos().map(t => t.title));

console.log("\n--- Filter: alle ---");
todoService.setFilter("all");
console.log("Alle Todos:", todoService.filteredTodos().map(t => t.title));

// Todo löschen
console.log("\n--- Todo löschen ---");
todoService.deleteTodo(firstTodoId);
console.log("Nach Löschen:", todoService.todos().map(t => t.title));
console.log("Anzahl:", todoService.todoCount());

// Lifecycle: Cleanup (speichert in Storage)
console.log("\n--- Lifecycle: Destroy ---");
todoService.onDestroy();

// Beweis: Daten wurden gespeichert — neuer Service lädt sie
console.log("\n--- Neuer Service lädt gespeicherte Daten ---");
const todoService2 = new TodoService(storageService);
todoService2.onInit();
console.log("Geladene Todos:", todoService2.todos().map(t => t.title));
todoService2.onDestroy();
*/
