/**
 * Exercise: Generische Storage-Klasse (SOLUTION)
 *
 * Vollständige Implementierung der DataStorage<T>-Klasse
 * mit allen CRUD-Operationen, Suche und Filterung.
 *
 * Hinweis: Wir nennen die Klasse "DataStorage" statt "Storage",
 * da "Storage" bereits als Browser-API existiert (localStorage, sessionStorage).
 */

export {};

// ============================================================
// Interfaces für den Demo-Code
// ============================================================

interface User {
  name: string;
  age: number;
  active: boolean;
}

interface Product {
  name: string;
  price: number;
  inStock: boolean;
}

// ============================================================
// DataStorage<T> Klasse — Vollständige Implementierung
// ============================================================

class DataStorage<T> {
  private items: Map<string, T> = new Map();

  // TODO 2: add
  add(key: string, value: T): void {
    this.items.set(key, value);
  }

  // TODO 3: get
  get(key: string): T | undefined {
    return this.items.get(key);
  }

  // TODO 4: getAll
  getAll(): T[] {
    return Array.from(this.items.values());
  }

  // TODO 5: has, delete, clear, size
  has(key: string): boolean {
    return this.items.has(key);
  }

  delete(key: string): boolean {
    return this.items.delete(key);
  }

  clear(): void {
    this.items.clear();
  }

  get size(): number {
    return this.items.size;
  }

  // TODO 6: find
  find(predicate: (item: T) => boolean): T | undefined {
    for (const item of this.items.values()) {
      if (predicate(item)) {
        return item;
      }
    }
    return undefined;
  }

  // TODO 7: filter
  filter(predicate: (item: T) => boolean): T[] {
    return Array.from(this.items.values()).filter(predicate);
  }
}

// ============================================================
// Demo-Code
// ============================================================

// --- DataStorage<User> ---
console.log("=== DataStorage<User> ===");
const userStorage = new DataStorage<User>();

userStorage.add("u1", { name: "Alice", age: 30, active: true });
userStorage.add("u2", { name: "Bob", age: 25, active: false });
userStorage.add("u3", { name: "Charlie", age: 35, active: true });

console.log("Alle User:", userStorage.getAll());
console.log("User u2:", userStorage.get("u2"));
console.log("Anzahl:", userStorage.size);
console.log("Hat u1?", userStorage.has("u1"));
console.log("Hat u99?", userStorage.has("u99"));

const activeUser = userStorage.find(u => u.active);
console.log("Erster aktiver User:", activeUser);

const olderUsers = userStorage.filter(u => u.age > 28);
console.log("User über 28:", olderUsers);

userStorage.delete("u2");
console.log("Nach Löschen von u2:", userStorage.getAll());
console.log("Neue Anzahl:", userStorage.size);

// --- DataStorage<Product> ---
console.log("\n=== DataStorage<Product> ===");
const productStorage = new DataStorage<Product>();

productStorage.add("p1", { name: "Laptop", price: 999, inStock: true });
productStorage.add("p2", { name: "Maus", price: 29, inStock: false });
productStorage.add("p3", { name: "Tastatur", price: 79, inStock: true });

console.log("Alle Produkte:", productStorage.getAll());

const cheapProducts = productStorage.filter(p => p.price < 100);
console.log("Günstige Produkte:", cheapProducts);

const firstAvailable = productStorage.find(p => p.inStock);
console.log("Erstes verfügbares:", firstAvailable);

productStorage.clear();
console.log("Nach clear():", productStorage.size);

// --- DataStorage<number> ---
console.log("\n=== DataStorage<number> ===");
const numberStorage = new DataStorage<number>();

numberStorage.add("pi", 3.14159);
numberStorage.add("e", 2.71828);
numberStorage.add("phi", 1.61803);

console.log("Alle Zahlen:", numberStorage.getAll());
console.log("Pi:", numberStorage.get("pi"));

const greaterThanTwo = numberStorage.filter(n => n > 2);
console.log("Größer als 2:", greaterThanTwo);
