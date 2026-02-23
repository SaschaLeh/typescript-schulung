export {};

/**
 * Exercise: Todo-App mit Angular-Konzepten (SOLUTION)
 */


// ============================================================
// Signal-Implementierung (wiederverwendbar)
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
// Lifecycle-Interfaces
// ============================================================

interface OnInit {
  onInit(): void;
}

interface OnDestroy {
  onDestroy(): void;
}


// ============================================================
// Filter-Typ
// ============================================================

type TodoFilter = "all" | "active" | "completed";


// ============================================================
// TODO 1: TodoItem Interface
// ============================================================

interface TodoItem {
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
}


// ============================================================
// TODO 2: StorageService
// ============================================================

class StorageService {
  private store = new Map<string, string>();

  load<T>(key: string): T | null {
    const data = this.store.get(key);
    if (data === undefined) {
      return null;
    }
    return JSON.parse(data) as T;
  }

  save<T>(key: string, data: T): void {
    this.store.set(key, JSON.stringify(data));
  }
}


// ============================================================
// TODO 3–6: TodoService mit Constructor Injection, Signals,
//           CRUD-Methoden und Lifecycle
// ============================================================

class TodoService implements OnInit, OnDestroy {
  private storage: StorageService;
  private readonly STORAGE_KEY = "todos";
  private nextId = 1;

  // TODO 4: Signals
  todos: Signal<TodoItem[]>;
  filter: Signal<TodoFilter>;
  filteredTodos: () => TodoItem[];
  todoCount: () => number;

  // TODO 3: Constructor Injection
  constructor(storage: StorageService) {
    this.storage = storage;

    // Signals initialisieren
    this.todos = signal<TodoItem[]>([]);
    this.filter = signal<TodoFilter>("all");

    // Computed Signals: abgeleitete Werte
    this.filteredTodos = computed(() => {
      const allTodos = this.todos();
      const currentFilter = this.filter();

      switch (currentFilter) {
        case "active":
          return allTodos.filter((todo) => !todo.completed);
        case "completed":
          return allTodos.filter((todo) => todo.completed);
        case "all":
        default:
          return allTodos;
      }
    });

    this.todoCount = computed(() => this.todos().length);
  }

  // TODO 5: CRUD-Methoden
  addTodo(title: string): void {
    const newTodo: TodoItem = {
      id: this.nextId++,
      title,
      completed: false,
      createdAt: new Date(),
    };
    this.todos.update((current) => [...current, newTodo]);
  }

  toggleTodo(id: number): void {
    this.todos.update((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  deleteTodo(id: number): void {
    this.todos.update((current) => current.filter((todo) => todo.id !== id));
  }

  setFilter(filter: TodoFilter): void {
    this.filter.set(filter);
  }

  // TODO 6: Lifecycle-Methoden
  onInit(): void {
    const savedTodos = this.storage.load<TodoItem[]>(this.STORAGE_KEY);
    if (savedTodos) {
      this.todos.set(savedTodos);
    }
    console.log(`TodoService initialisiert — ${this.todos().length} Todos geladen`);
  }

  onDestroy(): void {
    this.storage.save(this.STORAGE_KEY, this.todos());
    console.log(`TodoService zerstört — ${this.todos().length} Todos gespeichert`);
  }
}


// ============================================================
// Demonstration
// ============================================================

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
console.log("Alle Todos:", todoService.filteredTodos().map((t) => t.title));

// Todo als erledigt markieren
console.log("\n--- Todo togglen ---");
const firstTodoId = todoService.todos()[0].id;
todoService.toggleTodo(firstTodoId);
console.log(
  "Nach Toggle:",
  todoService.todos().map((t) => `${t.title}: ${t.completed ? "✓" : "○"}`)
);

// Filter setzen
console.log("\n--- Filter: nur aktive ---");
todoService.setFilter("active");
console.log("Aktive Todos:", todoService.filteredTodos().map((t) => t.title));

console.log("\n--- Filter: nur erledigte ---");
todoService.setFilter("completed");
console.log("Erledigte Todos:", todoService.filteredTodos().map((t) => t.title));

console.log("\n--- Filter: alle ---");
todoService.setFilter("all");
console.log("Alle Todos:", todoService.filteredTodos().map((t) => t.title));

// Todo löschen
console.log("\n--- Todo löschen ---");
todoService.deleteTodo(firstTodoId);
console.log("Nach Löschen:", todoService.todos().map((t) => t.title));
console.log("Anzahl:", todoService.todoCount());

// Lifecycle: Cleanup (speichert in Storage)
console.log("\n--- Lifecycle: Destroy ---");
todoService.onDestroy();

// Beweis: Daten wurden gespeichert — neuer Service lädt sie
console.log("\n--- Neuer Service lädt gespeicherte Daten ---");
const todoService2 = new TodoService(storageService);
todoService2.onInit();
console.log("Geladene Todos:", todoService2.todos().map((t) => t.title));
todoService2.onDestroy();
