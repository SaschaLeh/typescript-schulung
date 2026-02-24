/**
 * Block 13: Das this-Keyword in TypeScript
 *
 * Dieses Beispiel zeigt die häufigsten Fallstricke mit `this` und
 * wie Arrow Functions und .bind() das Problem lösen.
 *
 * Merksatz:
 *   Normale Funktionen: this = Aufrufer
 *   Arrow Functions:    this = umgebender Scope
 */

// ============================================================
// 1. Das Problem: `this` geht als Callback verloren
// ============================================================

const button = {
  label: "Absenden",

  // Reguläre Methode — `this` hängt vom Aufrufer ab
  handleClick(): void {
    console.log(`Button geklickt: ${this.label}`);
  },
};

// Direkter Aufruf — funktioniert
button.handleClick(); // "Button geklickt: Absenden"

// Als Callback — `this` ist verloren!
const callback = button.handleClick;
try {
  callback(); // TypeError: Cannot read properties of undefined (reading 'label')
} catch (e) {
  console.log("Fehler beim Callback:", (e as Error).message);
}


// ============================================================
// 2. Lösung 1: Arrow Function als Wrapper
// ============================================================

// Wenn wir die Methode als Callback übergeben, packen wir sie
// in eine Arrow Function — diese fängt `this` nicht neu ein
const callbackArrow = () => button.handleClick();
callbackArrow(); // "Button geklickt: Absenden" — funktioniert!

// Typisches Muster: als Event-Handler registrieren
function simuliereEvent(handler: () => void): void {
  console.log("Event ausgelöst:");
  handler();
}

simuliereEvent(() => button.handleClick());
// "Button geklickt: Absenden" — Arrow Function bewahrt den Kontext


// ============================================================
// 3. Lösung 2: .bind()
// ============================================================

// .bind() erzeugt eine neue Funktion, bei der `this` dauerhaft gesetzt ist
const gebundenerHandler = button.handleClick.bind(button);

gebundenerHandler(); // "Button geklickt: Absenden" — funktioniert!
simuliereEvent(gebundenerHandler); // funktioniert auch als Callback


// ============================================================
// 4. Mehrere Objekte: this zeigt auf den jeweiligen Aufrufer
// ============================================================

const speichern = {
  label: "Speichern",
  handleClick(): void {
    console.log(`Button geklickt: ${this.label}`);
  },
};

const abbrechen = {
  label: "Abbrechen",
  handleClick(): void {
    console.log(`Button geklickt: ${this.label}`);
  },
};

console.log("\n=== Mehrere Objekte ===");
speichern.handleClick(); // "Button geklickt: Speichern"
abbrechen.handleClick(); // "Button geklickt: Abbrechen"

// Methode "ausleihen" — this zeigt auf den neuen Aufrufer
const ausgeliehen = speichern.handleClick;
// ausgeliehen() → TypeError, weil this verloren geht

// Mit bind an ein anderes Objekt binden:
const anAbbrechen = speichern.handleClick.bind(abbrechen);
anAbbrechen(); // "Button geklickt: Abbrechen" — this zeigt auf abbrechen!


// ============================================================
// 5. Timer-Beispiel: Reguläre Funktion vs Arrow Function
// ============================================================

const timer = {
  seconds: 0,

  // BROKEN: Reguläre Funktion in setInterval — `this` ist verloren
  startBroken(): void {
    console.log("\n--- Timer (broken) gestartet ---");
    const interval = setInterval(function () {
      // `this` ist hier NICHT das timer-Objekt!
      // In strict mode: undefined, sonst: globalThis
      console.log("Broken: `this` ist hier nicht das timer-Objekt!");
    }, 100);

    setTimeout(() => clearInterval(interval), 150);
  },

  // WORKING: Arrow Function in setInterval — `this` korrekt
  startWorking(): void {
    console.log("\n--- Timer (working) gestartet ---");
    const interval = setInterval(() => {
      this.seconds++;
      console.log(`Working: ${this.seconds} Sekunden`);
    }, 100);

    setTimeout(() => clearInterval(interval), 350);
  },
};

// Demo ausführen
timer.startBroken();

// Dann den funktionierenden Timer (leicht versetzt starten)
setTimeout(() => {
  timer.seconds = 0;
  timer.startWorking();
}, 300);
