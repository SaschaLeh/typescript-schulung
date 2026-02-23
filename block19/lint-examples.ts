export {};

/**
 * Block 19: ESLint & Prettier — Problematischer Code
 *
 * Diese Datei enthält absichtliche Lint-Probleme und Formatierungsfehler.
 * Jedes Problem ist mit der zugehörigen ESLint-Regel kommentiert.
 * Vergleiche mit lint-fixed.ts für die korrigierte Version.
 */

console.log("=== ESLint & Prettier — Lint-Probleme Demo ===\n");


// ============================================================
// 1. any-Typen — @typescript-eslint/no-explicit-any
// ============================================================
// ❌ "any" umgeht das gesamte Typsystem — Fehler werden erst zur Laufzeit entdeckt

function processData(data: any): any {
  // @typescript-eslint/no-explicit-any: Unexpected any. Specify a proper type.
  return data.value;
}

const result = processData({ value: 42 });
console.log("1. any-Typ:", result);


// ============================================================
// 2. Fehlende Return-Typen — @typescript-eslint/explicit-function-return-type
// ============================================================
// ❌ Ohne expliziten Return-Typ ist der Rückgabewert nur durch Inferenz bestimmt

function calculateDiscount(price: number, discount: number) {
  // @typescript-eslint/explicit-function-return-type: Missing return type on function.
  return price - (price * discount);
}

function formatUser(name: string, age: number) {
  // @typescript-eslint/explicit-function-return-type: Missing return type on function.
  return name + " ist " + age + " Jahre alt";
  // prefer-template: Unexpected string concatenation. Use template literals.
}

console.log("2. Fehlende Return-Typen:", calculateDiscount(100, 0.2));
console.log("   formatUser:", formatUser("Max", 30));


// ============================================================
// 3. var statt const/let — no-var, prefer-const
// ============================================================
// ❌ "var" hat Function-Scope statt Block-Scope und wird gehoisted

var serverUrl = "https://api.example.com";
// no-var: Unexpected var, use let or const instead.

let apiVersion = "v2";
// prefer-const: 'apiVersion' is never reassigned. Use 'const' instead.

console.log("3. var/let:", serverUrl, apiVersion);


// ============================================================
// 4. == statt === — eqeqeq
// ============================================================
// ❌ Lose Gleichheit führt zu unerwarteten Typ-Konvertierungen

function isAdult(age: number): boolean {
  if (age == 18) {
    // eqeqeq: Expected '===' and instead saw '=='.
    return true;
  }
  return age > 18;
}

const emptyString = "";
const zero = 0;
// Lose Gleichheit: "" == 0 ist true! (beide werden zu 0 konvertiert)
console.log("4. Lose Gleichheit:");
console.log("   '' == 0:", emptyString == zero as unknown as string);
console.log("   isAdult(18):", isAdult(18));


// ============================================================
// 5. Unused Variables — @typescript-eslint/no-unused-vars
// ============================================================
// ❌ Unbenutzte Variablen sind toter Code und verwirren

const unusedConfig = { debug: true, verbose: false };
// @typescript-eslint/no-unused-vars: 'unusedConfig' is defined but never used.

function multiply(a: number, b: number, precision: number): number {
  // @typescript-eslint/no-unused-vars: 'precision' is defined but never used.
  return a * b;
}

console.log("5. Unused Variables: multiply(3, 4):", multiply(3, 4, 2));


// ============================================================
// 6. Magic Numbers — no-magic-numbers
// ============================================================
// ❌ Zahlen ohne Kontext machen Code schwer verständlich

function calculateShipping(weight: number): number {
  if (weight > 30) {
    // no-magic-numbers: No magic number: 30
    return weight * 2.5 + 15.99;
    // no-magic-numbers: No magic number: 2.5, 15.99
  }
  return 4.99;
  // no-magic-numbers: No magic number: 4.99
}

function isEligibleForDiscount(totalItems: number, totalPrice: number): boolean {
  return totalItems >= 5 && totalPrice > 49.99;
  // no-magic-numbers: No magic number: 5, 49.99
}

console.log("6. Magic Numbers:");
console.log("   Shipping (25kg):", calculateShipping(25));
console.log("   Discount eligible:", isEligibleForDiscount(6, 55));


// ============================================================
// 7. String-Konkatenation statt Template Literals — prefer-template
// ============================================================
// ❌ Konkatenation mit + ist weniger lesbar als Template Literals

function greet(firstName: string, lastName: string) {
  return "Hallo, " + firstName + " " + lastName + "! Willkommen.";
  // prefer-template: Unexpected string concatenation.
}

function buildUrl(base: string, path: string, query: string) {
  return base + "/" + path + "?" + query;
  // prefer-template: Unexpected string concatenation.
}

console.log("7. String-Konkatenation:");
console.log("   " + greet("Max", "Mustermann"));
console.log("   " + buildUrl("https://api.com", "users", "active=true"));


// ============================================================
// 8. Inkonsistente Formatierung — Prettier-Verstöße
// ============================================================
// ❌ Inkonsistente Einrückung, Leerzeichen und Zeilenumbrüche

interface  UserData{
  name:string;
  email:string;
  age :number;
    isActive:  boolean;
}

const users:UserData[]=[
{name:"Anna",email:"anna@test.de",age:28,isActive:true},
{name:"Bob",email:"bob@test.de",age:35,isActive:false},
{name:"Clara",email:"clara@test.de",age:42,isActive:true}
];

function   filterActiveUsers(  userList:UserData[]  ){
  return userList.filter(function(user){return user.isActive===true})
}

console.log("8. Formatierung:", filterActiveUsers(users).length, "aktive User");


// ============================================================
// 9. Naming-Conventions — @typescript-eslint/naming-convention
// ============================================================
// ❌ Inkonsistente Benennungen erschweren Lesbarkeit

interface user_response {
  // @typescript-eslint/naming-convention: Interface name must be in PascalCase.
  user_name: string;
  User_Age: number;
}

function GetUserData(): user_response {
  // @typescript-eslint/naming-convention: Function name must be in camelCase.
  const User_Name = "Max";
  // @typescript-eslint/naming-convention: Variable must be in camelCase or UPPER_CASE.
  return { user_name: User_Name, User_Age: 25 };
}

console.log("9. Naming:", GetUserData());


// ============================================================
// 10. Zusammenfassung: typische Probleme auf einen Blick
// ============================================================

console.log("\n=== Zusammenfassung der Lint-Probleme ===");
console.log("┌──────────────────────────────────────────────────────────────┐");
console.log("│ Regel                                  │ Problem            │");
console.log("├──────────────────────────────────────────────────────────────┤");
console.log("│ no-explicit-any                        │ any-Typen          │");
console.log("│ explicit-function-return-type           │ Fehlender Return   │");
console.log("│ no-var / prefer-const                  │ var statt const    │");
console.log("│ eqeqeq                                │ == statt ===       │");
console.log("│ no-unused-vars                         │ Toter Code         │");
console.log("│ no-magic-numbers                       │ Magische Zahlen    │");
console.log("│ prefer-template                        │ String + String    │");
console.log("│ Prettier                               │ Formatierung       │");
console.log("│ naming-convention                      │ Inkonsistente Namen│");
console.log("└──────────────────────────────────────────────────────────────┘");
console.log("\n→ Vergleiche mit lint-fixed.ts für die korrigierte Version!");
