/**
 * Date API
 *
 * Demonstrates common pitfalls and best practices with the JavaScript Date API.
 * Based on the workshop slides covering Date creation, mutation, and formatting.
 */

// ============================================================
// 1. Date erstellen — Vorsicht: Monate sind 0-indiziert!
// ============================================================

// Monat 0 = Januar, Monat 11 = Dezember
const jan15 = new Date(2024, 0, 15); // 15. Januar 2024
console.log("new Date(2024, 0, 15):", jan15.toLocaleDateString("de-DE"));
// → 15.1.2024

const jun1 = new Date(2024, 5, 1); // 1. Juni 2024 (NICHT Mai!)
console.log("new Date(2024, 5, 1):", jun1.toLocaleDateString("de-DE"));
// → 1.6.2024

// Häufiger Fehler: new Date(2024, 3, 1) ist April, nicht März!
const april = new Date(2024, 3, 1);
console.log("new Date(2024, 3, 1) ist:", april.toLocaleDateString("de-DE", { month: "long" }));
// → April

// Sichere Alternative: ISO-String (Monate 1-basiert)
const fromISO = new Date("2024-03-15"); // 15. März — hier ist 03 = März
console.log("new Date('2024-03-15'):", fromISO.toLocaleDateString("de-DE"));

// ============================================================
// 2. Mutation-Pitfall: set-Methoden verändern das Original!
// ============================================================

console.log("\n--- Mutation Pitfall ---");

const original = new Date(2024, 0, 15); // 15. Januar 2024
console.log("Original:", original.toLocaleDateString("de-DE"));

// ACHTUNG: setMonth verändert das Original-Objekt!
original.setMonth(5); // Jetzt ist original der 15. Juni
console.log("Nach setMonth(5) — Original verändert:", original.toLocaleDateString("de-DE"));

// Besser: Neues Date-Objekt erstellen (immutable Ansatz)
function setMonthImmutable(date: Date, month: number): Date {
  const copy = new Date(date.getTime());
  copy.setMonth(month);
  return copy;
}

const basis = new Date(2024, 0, 15);
const modified = setMonthImmutable(basis, 5);
console.log("Basis unverändert:", basis.toLocaleDateString("de-DE")); // 15.1.2024
console.log("Neues Datum:", modified.toLocaleDateString("de-DE")); // 15.6.2024

// ============================================================
// 3. Intl.DateTimeFormat — Locale-aware Formatierung
// ============================================================

console.log("\n--- Intl.DateTimeFormat ---");

const now = new Date();

// Deutsch
const deFormatter = new Intl.DateTimeFormat("de-DE", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});
console.log("Deutsch:", deFormatter.format(now));
// → z.B. "Donnerstag, 20. Februar 2025"

// Englisch (US)
const enFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});
console.log("English:", enFormatter.format(now));

// Nur Zeit
const timeFormatter = new Intl.DateTimeFormat("de-DE", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});
console.log("Zeit:", timeFormatter.format(now));

// Kompakt
console.log("Kompakt:", now.toLocaleDateString("de-DE"));
console.log("ISO:", now.toISOString());

// ============================================================
// 4. Nützliche Date-Methoden
// ============================================================

console.log("\n--- Nützliche Methoden ---");

const d = new Date(2024, 5, 15, 14, 30); // 15. Juni 2024, 14:30

console.log("getFullYear():", d.getFullYear()); // 2024
console.log("getMonth():", d.getMonth()); // 5 (Juni, 0-indiziert!)
console.log("getDate():", d.getDate()); // 15
console.log("getDay():", d.getDay()); // 6 (Samstag, 0=Sonntag)
console.log("getHours():", d.getHours()); // 14
console.log("getTime():", d.getTime()); // Millisekunden seit 1.1.1970

// Differenz zwischen zwei Daten in Tagen
const start = new Date(2024, 0, 1);
const end = new Date(2024, 11, 31);
const diffMs = end.getTime() - start.getTime();
const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
console.log(`\nTage zwischen 1.1. und 31.12.2024: ${diffDays}`);

// ============================================================
// 5. Empfehlungen für die Praxis
// ============================================================

console.log("\n--- Empfehlungen ---");
console.log("1. Für komplexe Datumsoperationen: date-fns (https://date-fns.org)");
console.log("2. Zukunft: Temporal API (Stage 3 Proposal) — immutable, timezone-aware");
console.log("3. Intl.DateTimeFormat für Formatierung statt eigener Logik");
console.log("4. Immer immutable arbeiten: new Date(original.getTime())");

export { setMonthImmutable };
