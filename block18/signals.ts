export {};

/**
 * Block 18: Signals in TypeScript
 *
 * Angular Signals sind ein reaktives Primitiv für State-Management.
 * Hier bauen wir signal(), computed() und effect() in purem TypeScript nach,
 * um das Konzept hinter der Angular-API zu verstehen.
 */

// ============================================================
// 1. signal<T>(initial) — reaktiver Wert mit Getter/Setter
// ============================================================

type Signal<T> = {
  (): T;                          // Getter: signal() gibt aktuellen Wert zurück
  set(value: T): void;           // Neuen Wert setzen
  update(fn: (current: T) => T): void;  // Wert basierend auf aktuellem Wert ändern
  asReadonly(): () => T;          // Gibt nur den Getter zurück (kein set/update)
};

// Globaler Tracker: welcher effect() gerade läuft
let currentEffect: (() => void) | null = null;

function signal<T>(initial: T): Signal<T> {
  let value = initial;
  const subscribers = new Set<() => void>();

  // Die Signal-Funktion ist gleichzeitig der Getter
  const signalFn = function (): T {
    // Wenn gerade ein effect() ausgeführt wird, registriere ihn als Subscriber
    if (currentEffect) {
      subscribers.add(currentEffect);
    }
    return value;
  } as Signal<T>;

  signalFn.set = function (newValue: T): void {
    value = newValue;
    // Kopie der Subscriber iterieren (verhindert Probleme bei Änderungen während Iteration)
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


// ============================================================
// 2. computed(() => ...) — abgeleiteter Wert
// ============================================================

/**
 * Vereinfachte Version: berechnet den Wert bei jedem Lesen neu.
 * Angulars echte Implementierung cached den Wert intern und berechnet
 * nur neu, wenn sich Abhängigkeiten tatsächlich geändert haben.
 * Diese vereinfachte Version demonstriert das Kernkonzept korrekt:
 * computed-Werte werden aus Signals abgeleitet und bleiben automatisch aktuell.
 */
function computed<T>(computeFn: () => T): () => T {
  return function (): T {
    return computeFn();
  };
}


// ============================================================
// 3. effect(() => ...) — Side Effect bei Signal-Änderung
// ============================================================

/**
 * Führt die Funktion sofort aus und registriert sich bei allen
 * gelesenen Signals als Subscriber. Wenn ein Signal sich ändert,
 * wird der Effect automatisch erneut ausgeführt.
 */
function effect(effectFn: () => void): { destroy: () => void } {
  let isActive = true;

  const wrappedEffect = () => {
    if (!isActive) return;
    const previousEffect = currentEffect;
    currentEffect = wrappedEffect;
    effectFn();
    currentEffect = previousEffect;
  };

  // Sofort einmal ausführen, damit Abhängigkeiten erfasst werden
  wrappedEffect();

  return {
    destroy: () => { isActive = false; },
  };
}


// ============================================================
// 4. Demo: Counter mit Signal, Computed und Effect
// ============================================================

console.log("=== Angular Signals — nachgebaut in TypeScript ===\n");

// Signal erstellen (wie in Angular: count = signal(0))
const count = signal(0);
console.log("Initialer count:", count());  // 0

// Computed: abgeleiteter Wert (wie in Angular: doubleCount = computed(() => count() * 2))
const doubleCount = computed(() => count() * 2);
console.log("Initialer doubleCount:", doubleCount());  // 0

// Effect: Side-Effect bei Änderung (wie in Angular: effect(() => console.log(...)))
console.log("\nEffect registriert — reagiert automatisch auf Änderungen:");
const logEffect = effect(() => {
  console.log(`  [Effect] count = ${count()}, doubleCount = ${doubleCount()}`);
});

// Wert ändern mit .set()
console.log("\n--- count.set(5) ---");
count.set(5);

// Wert ändern mit .update()
console.log("\n--- count.update(c => c + 3) ---");
count.update((c) => c + 3);

// Noch eine Änderung
console.log("\n--- count.set(0) ---");
count.set(0);


// ============================================================
// 5. Readonly-Signal
// ============================================================

console.log("\n=== Readonly Signal ===");
const readonlyCount = count.asReadonly();
console.log("Readonly-Wert:", readonlyCount());  // 0
// readonlyCount.set(10);  // Kompilierungsfehler! set() existiert nicht auf dem Typ


// ============================================================
// 6. Praxisbeispiel: User-Profil mit Signals
// ============================================================

console.log("\n=== Praxisbeispiel: User-Profil ===");

interface UserProfile {
  firstName: string;
  lastName: string;
}

const user = signal<UserProfile>({ firstName: "Max", lastName: "Mustermann" });
const fullName = computed(() => `${user().firstName} ${user().lastName}`);

const profileEffect = effect(() => {
  console.log(`  [Profil-Effect] Vollständiger Name: ${fullName()}`);
});

console.log("\n--- User-Update: Vorname ändern ---");
user.update((u) => ({ ...u, firstName: "Anna" }));

console.log("\n--- User-Update: Nachname ändern ---");
user.update((u) => ({ ...u, lastName: "Schmidt" }));

// Effect aufräumen
logEffect.destroy();
profileEffect.destroy();

console.log("\n--- Nach destroy: count.set(99) löst keinen Effect mehr aus ---");
count.set(99);
console.log("count ist jetzt:", count());
