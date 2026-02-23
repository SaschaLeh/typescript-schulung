/**
 * Block 13: Closures in TypeScript
 *
 * Eine Closure entsteht, wenn eine Funktion auf Variablen aus ihrem
 * umgebenden Scope zugreift — auch nachdem die äußere Funktion
 * bereits zurückgekehrt ist.
 */

// ============================================================
// 1. Counter-Factory (wie in den Folien)
// ============================================================

function erstelleZähler(): () => number {
  let count = 0; // private Variable — nur über die zurückgegebene Funktion erreichbar

  return function (): number {
    count++;
    return count;
  };
}

// Zwei unabhängige Zähler mit eigenem Speicher
const zähler1 = erstelleZähler();
const zähler2 = erstelleZähler();

console.log("=== Counter-Factory ===");
console.log("Zähler 1:", zähler1()); // 1
console.log("Zähler 1:", zähler1()); // 2
console.log("Zähler 1:", zähler1()); // 3

console.log("Zähler 2:", zähler2()); // 1  — eigener Speicher!
console.log("Zähler 2:", zähler2()); // 2

console.log("Zähler 1:", zähler1()); // 4  — unabhängig von Zähler 2


// ============================================================
// 2. Validator mit Versuchszähler (wie in den Folien)
// ============================================================

function erstelleValidator(minLänge: number): (eingabe: string) => boolean {
  let versuche = 0; // privater Zähler

  return function (eingabe: string): boolean {
    versuche++;
    const gültig = eingabe.length >= minLänge;
    console.log(
      `Versuch ${versuche}: "${eingabe}" → ${gültig ? "gültig" : "ungültig"} (min. ${minLänge} Zeichen)`
    );
    return gültig;
  };
}

console.log("\n=== Validator ===");
const prüfePasswort = erstelleValidator(8);
prüfePasswort("abc");       // Versuch 1: ungültig
prüfePasswort("hallo");     // Versuch 2: ungültig
prüfePasswort("sicheresPasswort123"); // Versuch 3: gültig

const prüfeName = erstelleValidator(2);
prüfeName("A");             // Versuch 1: ungültig (eigener Zähler!)
prüfeName("Anna");          // Versuch 2: gültig


// ============================================================
// 3. var-in-Loop Falle und Fix mit let
// ============================================================

console.log("\n=== var-in-Loop Falle ===");

// PROBLEM: var hat Function-Scope, nicht Block-Scope
const funktionenVar: (() => void)[] = [];
for (var i = 0; i < 3; i++) {
  funktionenVar.push(function () {
    console.log("var-Loop Wert:", i);
  });
}

// Alle drei drucken "3", weil sie dasselbe `i` referenzieren!
console.log("Mit var (alle drucken 3):");
funktionenVar.forEach((fn) => fn());

// FIX: let hat Block-Scope — jede Iteration hat eigenes `i`
const funktionenLet: (() => void)[] = [];
for (let j = 0; j < 3; j++) {
  funktionenLet.push(function () {
    console.log("let-Loop Wert:", j);
  });
}

console.log("\nMit let (korrekte Werte 0, 1, 2):");
funktionenLet.forEach((fn) => fn());


// ============================================================
// 4. Praktisches Beispiel: Multiplikator-Factory
// ============================================================

function erstelleMultiplikator(faktor: number): (wert: number) => number {
  return (wert: number): number => faktor * wert;
}

console.log("\n=== Multiplikator-Factory ===");
const verdopple = erstelleMultiplikator(2);
const verdreifache = erstelleMultiplikator(3);
const mwst = erstelleMultiplikator(1.19);

console.log("verdopple(5):", verdopple(5));       // 10
console.log("verdreifache(5):", verdreifache(5)); // 15
console.log("mwst(100):", mwst(100));             // 119
