/**
 * Block 13: Das this-Keyword in TypeScript
 *
 * Dieses Beispiel zeigt die häufigsten Fallstricke mit `this` und
 * wie Arrow Functions und .bind() das Problem lösen.
 *
 * Merksatz:
 *   Normale Funktionen: this = Aufrufer
 *   Arrow Functions:    this = umgebende Klasse/Scope
 */

// ============================================================
// 1. Das Problem: `this` geht als Callback verloren
// ============================================================

class Button {
  label: string;

  constructor(label: string) {
    this.label = label;
  }

  // Reguläre Methode — `this` hängt vom Aufrufer ab
  handleClick(): void {
    console.log(`Button geklickt: ${this.label}`);
  }
}

const btn = new Button("Absenden");

// Direkter Aufruf — funktioniert
btn.handleClick(); // "Button geklickt: Absenden"

// Als Callback — `this` ist verloren!
const callback = btn.handleClick;
try {
  callback(); // TypeError: Cannot read properties of undefined (reading 'label')
} catch (e) {
  console.log("Fehler beim Callback:", (e as Error).message);
}


// ============================================================
// 2. Lösung 1: Arrow Function als Property
// ============================================================

class ButtonFixed1 {
  label: string;

  constructor(label: string) {
    this.label = label;
  }

  // Arrow Function als Property — `this` bleibt immer die Instanz
  handleClick = (): void => {
    console.log(`[Arrow] Button geklickt: ${this.label}`);
  };
}

const btn1 = new ButtonFixed1("Senden");
const cb1 = btn1.handleClick;
cb1(); // "[Arrow] Button geklickt: Senden" — funktioniert!


// ============================================================
// 3. Lösung 2: .bind(this) im Konstruktor
// ============================================================

class ButtonFixed2 {
  label: string;

  constructor(label: string) {
    this.label = label;
    // Methode dauerhaft an diese Instanz binden
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(): void {
    console.log(`[Bind] Button geklickt: ${this.label}`);
  }
}

const btn2 = new ButtonFixed2("OK");
const cb2 = btn2.handleClick;
cb2(); // "[Bind] Button geklickt: OK" — funktioniert!


// ============================================================
// 4. Timer-Beispiel: Reguläre Funktion vs Arrow Function
//    (direkt aus den Folien)
// ============================================================

class Timer {
  seconds: number = 0;

  // BROKEN: Reguläre Funktion in setInterval → `this` ist undefined
  startBroken(): void {
    console.log("\n--- Timer (broken) gestartet ---");
    const interval = setInterval(function (this: any) {
      // `this` ist hier NICHT die Timer-Instanz!
      // In strict mode: undefined, sonst: globalThis/window
      if (this && this.seconds !== undefined) {
        console.log(`Broken: ${this.seconds} Sekunden`);
      } else {
        console.log("Broken: `this` ist undefined oder hat kein .seconds!");
      }
    }, 100);

    // Stoppe nach 300ms für die Demo
    setTimeout(() => clearInterval(interval), 350);
  }

  // WORKING: Arrow Function in setInterval → `this` korrekt
  startWorking(): void {
    console.log("\n--- Timer (working) gestartet ---");
    const interval = setInterval(() => {
      this.seconds++;
      console.log(`Working: ${this.seconds} Sekunden`);
    }, 100);

    // Stoppe nach 300ms für die Demo
    setTimeout(() => clearInterval(interval), 350);
  }
}

// Demo ausführen
const timer = new Timer();

// Zuerst den kaputten Timer zeigen
timer.startBroken();

// Dann den funktionierenden Timer (leicht versetzt starten)
setTimeout(() => {
  timer.seconds = 0;
  timer.startWorking();
}, 500);
