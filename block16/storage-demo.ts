/**
 * Block 16: Generische Storage-Klasse — Lehrbeispiel
 *
 * Dieses Beispiel zeigt, wie Generics in der Praxis eingesetzt werden,
 * um typsichere, wiederverwendbare Datenstrukturen zu bauen.
 */

export {};

// ============================================================
// 1. Generischer Container<T> — Grundidee
// ============================================================

/**
 * Ein einfacher generischer Container, der einen einzelnen Wert hält.
 * T ist ein Platzhalter für den konkreten Typ.
 */
class Container<T> {
  private value: T;

  constructor(value: T) {
    this.value = value;
  }

  getValue(): T {
    return this.value;
  }

  setValue(newValue: T): void {
    this.value = newValue;
  }

  /**
   * Transformiert den Wert mit einer Funktion.
   * Beachte: U kann ein anderer Typ als T sein!
   */
  map<U>(fn: (value: T) => U): Container<U> {
    return new Container(fn(this.value));
  }
}

// Demo: Container mit verschiedenen Typen
const numberContainer = new Container(42);
console.log("Number:", numberContainer.getValue()); // 42

const stringContainer = new Container("Hallo Generics");
console.log("String:", stringContainer.getValue()); // "Hallo Generics"

// map: number → string (Typ ändert sich!)
const mapped = numberContainer.map((n) => `Wert ist ${n}`);
console.log("Mapped:", mapped.getValue()); // "Wert ist 42"

// ============================================================
// 2. Map<string, T> als typsichere Datenstruktur
// ============================================================

/**
 * Ein einfacher Key-Value-Store, der Map<string, T> verwendet.
 * Map ist die moderne Alternative zu einfachen Objekten als Dictionary.
 */
class KeyValueStore<T> {
  private data: Map<string, T> = new Map();

  set(key: string, value: T): void {
    this.data.set(key, value);
  }

  get(key: string): T | undefined {
    return this.data.get(key);
  }

  has(key: string): boolean {
    return this.data.has(key);
  }

  get size(): number {
    return this.data.size;
  }

  /**
   * Gibt alle Werte als Array zurück.
   * Map.values() liefert einen Iterator — Array.from() konvertiert ihn.
   */
  values(): T[] {
    return Array.from(this.data.values());
  }
}

// Demo: KeyValueStore<number> für Noten
const noten = new KeyValueStore<number>();
noten.set("Mathe", 2);
noten.set("Deutsch", 1);
noten.set("Sport", 3);

console.log("\n--- KeyValueStore<number> ---");
console.log("Mathe:", noten.get("Mathe"));       // 2
console.log("Physik:", noten.get("Physik"));      // undefined
console.log("Anzahl:", noten.size);               // 3
console.log("Alle Noten:", noten.values());       // [2, 1, 3]

// ============================================================
// 3. Higher-Order-Funktionen mit generischen Prädikaten
// ============================================================

/**
 * Predicate = Eine Funktion, die T entgegennimmt und boolean zurückgibt.
 * Wird für find(), filter() etc. verwendet.
 */

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

/**
 * Generische Suchfunktion: funktioniert mit jedem Typ T.
 */
function findFirst<T>(items: T[], predicate: (item: T) => boolean): T | undefined {
  for (const item of items) {
    if (predicate(item)) {
      return item;
    }
  }
  return undefined;
}

/**
 * Generische Filterfunktion: gibt alle passenden Elemente zurück.
 */
function filterItems<T>(items: T[], predicate: (item: T) => boolean): T[] {
  return items.filter(predicate);
}

// Demo mit User[]
const users: User[] = [
  { name: "Alice", age: 30, active: true },
  { name: "Bob", age: 25, active: false },
  { name: "Charlie", age: 35, active: true },
];

console.log("\n--- Generische Prädikate ---");
const firstActive = findFirst(users, (u) => u.active);
console.log("Erster aktiver User:", firstActive?.name); // "Alice"

const olderUsers = filterItems(users, (u) => u.age > 28);
console.log("User über 28:", olderUsers.map((u) => u.name)); // ["Alice", "Charlie"]

// Demo mit Product[] — gleiche Funktionen, anderer Typ!
const products: Product[] = [
  { name: "Laptop", price: 999, inStock: true },
  { name: "Maus", price: 29, inStock: false },
  { name: "Tastatur", price: 79, inStock: true },
];

const cheapProducts = filterItems(products, (p) => p.price < 100);
console.log("Günstige Produkte:", cheapProducts.map((p) => p.name)); // ["Maus", "Tastatur"]

const firstAvailable = findFirst(products, (p) => p.inStock);
console.log("Erstes verfügbares Produkt:", firstAvailable?.name); // "Laptop"

// ============================================================
// 4. Zusammenfassung
// ============================================================

console.log("\n--- Zusammenfassung ---");
console.log("Container<T>      → Ein Wert, typsicher verpackt");
console.log("KeyValueStore<T>  → Map<string, T> als Dictionary");
console.log("findFirst<T>()    → Generische Suche mit Predicate");
console.log("filterItems<T>()  → Generischer Filter mit Predicate");
console.log("\n→ In der Übung baust du eine vollständige DataStorage<T> Klasse,");
console.log("  die all diese Konzepte kombiniert!");
