export {};

/**
 * Block 19: ESLint & Prettier — Korrigierter Code
 *
 * Diese Datei zeigt die korrigierte Version von lint-examples.ts.
 * Jede Korrektur ist mit der zugehörigen ESLint-Regel kommentiert.
 * Vergleiche Side-by-Side mit lint-examples.ts.
 */

console.log('=== ESLint & Prettier — Korrigierter Code ===\n');


// ============================================================
// 1. Strikte Typen statt any — @typescript-eslint/no-explicit-any ✅
// ============================================================
// ✅ Konkrete Interfaces statt "any" — Fehler werden zur Compile-Zeit erkannt

interface DataWithValue {
  value: number;
}

function processData(data: DataWithValue): number {
  return data.value;
}

const result: number = processData({ value: 42 });
console.log('1. Strikter Typ:', result);


// ============================================================
// 2. Explizite Return-Typen — @typescript-eslint/explicit-function-return-type ✅
// ============================================================
// ✅ Return-Typ dokumentiert die Funktion und verhindert versehentliche Änderungen

function calculateDiscount(price: number, discount: number): number {
  return price - (price * discount);
}

function formatUser(name: string, age: number): string {
  return `${name} ist ${age} Jahre alt`;
  // ✅ Template Literal statt String-Konkatenation
}

console.log('2. Explizite Return-Typen:', calculateDiscount(100, 0.2));
console.log(`   formatUser: ${formatUser('Max', 30)}`);


// ============================================================
// 3. const/let statt var — no-var, prefer-const ✅
// ============================================================
// ✅ const für unveränderliche Werte, let nur wenn Reassignment nötig

const serverUrl = 'https://api.example.com';
// ✅ const statt var — Block-Scope, kein Hoisting

const apiVersion = 'v2';
// ✅ const statt let — wird nie reassigned

console.log('3. const:', serverUrl, apiVersion);


// ============================================================
// 4. === statt == — eqeqeq ✅
// ============================================================
// ✅ Strikte Gleichheit vermeidet unerwartete Typ-Konvertierungen

function isAdult(age: number): boolean {
  if (age === 18) {
    // ✅ Strikte Gleichheit mit ===
    return true;
  }
  return age > 18;
}

const emptyString = '';
const zero = 0;
// Strikte Gleichheit: "" === 0 ist false (verschiedene Typen)
console.log('4. Strikte Gleichheit:');
console.log(`   '' === 0: ${emptyString === (zero as unknown as string)}`);
console.log(`   isAdult(18): ${isAdult(18)}`);


// ============================================================
// 5. Keine ungenutzten Variablen — @typescript-eslint/no-unused-vars ✅
// ============================================================
// ✅ Entferne ungenutzten Code oder nutze _ Prefix für absichtlich ignorierte Parameter

// unusedConfig entfernt — war toter Code

function multiply(a: number, b: number, _precision: number): number {
  // ✅ Underscore-Prefix für absichtlich ignorierte Parameter
  return a * b;
}

console.log('5. Kein toter Code: multiply(3, 4):', multiply(3, 4, 2));


// ============================================================
// 6. Benannte Konstanten statt Magic Numbers — no-magic-numbers ✅
// ============================================================
// ✅ Konstanten mit sprechenden Namen machen den Code verständlich

const MAX_STANDARD_WEIGHT_KG = 30;
const HEAVY_RATE_PER_KG = 2.5;
const HEAVY_BASE_FEE = 15.99;
const STANDARD_SHIPPING_FEE = 4.99;

function calculateShipping(weight: number): number {
  if (weight > MAX_STANDARD_WEIGHT_KG) {
    return weight * HEAVY_RATE_PER_KG + HEAVY_BASE_FEE;
  }
  return STANDARD_SHIPPING_FEE;
}

const MIN_ITEMS_FOR_DISCOUNT = 5;
const MIN_PRICE_FOR_DISCOUNT = 49.99;

function isEligibleForDiscount(totalItems: number, totalPrice: number): boolean {
  return totalItems >= MIN_ITEMS_FOR_DISCOUNT && totalPrice > MIN_PRICE_FOR_DISCOUNT;
}

console.log('6. Benannte Konstanten:');
console.log(`   Shipping (25kg): ${calculateShipping(25)}`);
console.log(`   Discount eligible: ${isEligibleForDiscount(6, 55)}`);


// ============================================================
// 7. Template Literals statt Konkatenation — prefer-template ✅
// ============================================================
// ✅ Template Literals sind lesbarer und weniger fehleranfällig

function greet(firstName: string, lastName: string): string {
  return `Hallo, ${firstName} ${lastName}! Willkommen.`;
  // ✅ Template Literal statt "Hallo, " + firstName + " " + ...
}

function buildUrl(base: string, path: string, query: string): string {
  return `${base}/${path}?${query}`;
  // ✅ Template Literal statt base + "/" + path + "?" + query
}

console.log('7. Template Literals:');
console.log(`   ${greet('Max', 'Mustermann')}`);
console.log(`   ${buildUrl('https://api.com', 'users', 'active=true')}`);


// ============================================================
// 8. Konsistente Formatierung — Prettier ✅
// ============================================================
// ✅ Einheitliche Einrückung, Leerzeichen und Zeilenumbrüche

interface UserData {
  name: string;
  email: string;
  age: number;
  isActive: boolean;
}

const users: UserData[] = [
  { name: 'Anna', email: 'anna@test.de', age: 28, isActive: true },
  { name: 'Bob', email: 'bob@test.de', age: 35, isActive: false },
  { name: 'Clara', email: 'clara@test.de', age: 42, isActive: true },
];

function filterActiveUsers(userList: UserData[]): UserData[] {
  return userList.filter((user) => user.isActive);
  // ✅ Arrow Function statt function-Keyword, kein === true nötig
}

console.log(`8. Formatierung: ${filterActiveUsers(users).length} aktive User`);


// ============================================================
// 9. Naming-Conventions — @typescript-eslint/naming-convention ✅
// ============================================================
// ✅ Konsistente Benennungen: PascalCase für Typen, camelCase für Variablen/Funktionen

interface UserResponse {
  // ✅ PascalCase für Interface-Namen
  userName: string;
  userAge: number;
}

function getUserData(): UserResponse {
  // ✅ camelCase für Funktionsnamen
  const userName = 'Max';
  // ✅ camelCase für Variablen
  return { userName, userAge: 25 };
}

console.log('9. Naming:', getUserData());


// ============================================================
// 10. Zusammenfassung: alle Probleme behoben
// ============================================================

console.log('\n=== Zusammenfassung der Korrekturen ===');
console.log('┌──────────────────────────────────────────────────────────────┐');
console.log('│ Regel                                  │ Korrektur          │');
console.log('├──────────────────────────────────────────────────────────────┤');
console.log('│ no-explicit-any                        │ Konkrete Typen     │');
console.log('│ explicit-function-return-type           │ Return-Typ `: T`   │');
console.log('│ no-var / prefer-const                  │ const / let        │');
console.log('│ eqeqeq                                │ === statt ==       │');
console.log('│ no-unused-vars                         │ Entfernt / _prefix │');
console.log('│ no-magic-numbers                       │ Benannte Konstanten│');
console.log('│ prefer-template                        │ Template Literals  │');
console.log('│ Prettier                               │ Auto-Formatierung  │');
console.log('│ naming-convention                      │ PascalCase/camelCase│');
console.log('└──────────────────────────────────────────────────────────────┘');
console.log('\n✅ Alle Lint-Regeln erfüllt, Prettier-konform formatiert!');
