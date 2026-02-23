/**
 * Exercise: Generische Storage-Klasse
 *
 * Implementiere eine vollständige, generische DataStorage<T>-Klasse.
 * Die Klasse soll als typsicherer Datenspeicher funktionieren,
 * der mit beliebigen Typen (User, Product, number, ...) verwendet werden kann.
 *
 * Intern wird eine Map<string, T> als Datenstruktur verwendet.
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
// TODO 1: DataStorage<T> Klasse mit private items: Map<string, T>
// ============================================================
// Erstelle eine Klasse DataStorage mit einem Typ-Parameter T.
// Die Klasse soll eine private Property "items" vom Typ Map<string, T> haben.
// Initialisiere die Map im Konstruktor (oder direkt bei der Deklaration).


// ============================================================
// TODO 2: add(key: string, value: T): void
// ============================================================
// Füge ein Element zur Map hinzu.
// Der Key ist ein String, der Value hat den generischen Typ T.


// ============================================================
// TODO 3: get(key: string): T | undefined
// ============================================================
// Gibt das Element mit dem gegebenen Key zurück.
// Wenn der Key nicht existiert, wird undefined zurückgegeben.


// ============================================================
// TODO 4: getAll(): T[]
// ============================================================
// Gibt alle Werte der Map als Array zurück.
// Tipp: Array.from(map.values()) oder [...map.values()]


// ============================================================
// TODO 5: has(key: string): boolean, delete(key: string): boolean,
//         clear(): void, size Getter
// ============================================================
// has(key)    → Prüft ob der Key in der Map existiert
// delete(key) → Entfernt das Element, gibt true zurück wenn es existierte
// clear()     → Entfernt alle Elemente aus der Map
// get size()  → Getter, der die Anzahl der Elemente zurückgibt


// ============================================================
// TODO 6: find(predicate: (item: T) => boolean): T | undefined
// ============================================================
// Durchsucht alle Werte und gibt das erste Element zurück,
// für das die predicate-Funktion true liefert.
// Wenn kein Element passt, wird undefined zurückgegeben.
// Tipp: Iteriere über this.items.values()


// ============================================================
// TODO 7: filter(predicate: (item: T) => boolean): T[]
// ============================================================
// Gibt alle Elemente als Array zurück, für die
// die predicate-Funktion true liefert.
// Tipp: Konvertiere die Map-Values in ein Array und nutze Array.filter()


// ============================================================
// Demo-Code — Entkommentiere nach der Implementierung
// ============================================================

/*
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
*/
