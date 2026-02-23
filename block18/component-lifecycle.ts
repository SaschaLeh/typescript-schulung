export {};

/**
 * Block 18: Component Lifecycle in TypeScript
 *
 * Angular-Komponenten durchlaufen einen Lebenszyklus mit definierten Hooks:
 * - OnInit: nach Erstellung, für Initialisierung
 * - OnChanges: wenn sich Input-Properties ändern
 * - OnDestroy: vor dem Entfernen, für Cleanup
 *
 * Hier bauen wir diese Patterns in purem TypeScript nach.
 */

// ============================================================
// 1. Lifecycle-Interfaces (wie in Angular)
// ============================================================

/**
 * In Angular: import { OnInit } from '@angular/core';
 * Wird aufgerufen, nachdem die Komponente erstellt wurde.
 */
interface OnInit {
  onInit(): void;
}

/**
 * In Angular: import { OnDestroy } from '@angular/core';
 * Wird aufgerufen, bevor die Komponente entfernt wird.
 * Hier räumt man Subscriptions, Timer, Event-Listener auf.
 */
interface OnDestroy {
  onDestroy(): void;
}

/**
 * In Angular: import { OnChanges, SimpleChanges } from '@angular/core';
 * Wird aufgerufen, wenn sich @Input()-Properties ändern.
 */
interface SimpleChange<T = unknown> {
  previousValue: T;
  currentValue: T;
  firstChange: boolean;
}

type SimpleChanges = Record<string, SimpleChange>;

interface OnChanges {
  onChanges(changes: SimpleChanges): void;
}


// ============================================================
// 2. Component-Basisklasse mit Hook-Aufrufen
// ============================================================

abstract class Component {
  private _initialized = false;
  private _destroyed = false;

  /**
   * Simuliert Angular's Komponentenerstellung.
   * Ruft onInit() auf, falls implementiert.
   */
  init(): void {
    if (this._initialized) {
      console.warn(`${this.constructor.name}: bereits initialisiert!`);
      return;
    }

    console.log(`[Lifecycle] ${this.constructor.name}: Erstellt`);

    if (this.implementsOnInit()) {
      console.log(`[Lifecycle] ${this.constructor.name}: onInit()`);
      (this as unknown as OnInit).onInit();
    }

    this._initialized = true;
  }

  /**
   * Simuliert Angular's Komponentenzerstörung.
   * Ruft onDestroy() auf, falls implementiert.
   */
  destroy(): void {
    if (this._destroyed) {
      console.warn(`${this.constructor.name}: bereits zerstört!`);
      return;
    }

    if (this.implementsOnDestroy()) {
      console.log(`[Lifecycle] ${this.constructor.name}: onDestroy()`);
      (this as unknown as OnDestroy).onDestroy();
    }

    console.log(`[Lifecycle] ${this.constructor.name}: Entfernt`);
    this._destroyed = true;
  }

  /**
   * Simuliert Angular's Change Detection für @Input()-Properties.
   */
  detectChanges(changes: SimpleChanges): void {
    if (this.implementsOnChanges()) {
      console.log(`[Lifecycle] ${this.constructor.name}: onChanges()`, Object.keys(changes));
      (this as unknown as OnChanges).onChanges(changes);
    }
  }

  private implementsOnInit(): boolean {
    return typeof (this as unknown as OnInit).onInit === "function";
  }

  private implementsOnDestroy(): boolean {
    return typeof (this as unknown as OnDestroy).onDestroy === "function";
  }

  private implementsOnChanges(): boolean {
    return typeof (this as unknown as OnChanges).onChanges === "function";
  }
}


// ============================================================
// 3. TimerComponent — klassisches Lifecycle-Beispiel
// ============================================================

/**
 * Startet einen Timer in onInit(), räumt ihn in onDestroy() auf.
 * In Angular ein häufiges Pattern für setInterval/Subscriptions.
 */
class TimerComponent extends Component implements OnInit, OnDestroy {
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private ticks = 0;

  onInit(): void {
    console.log("  TimerComponent: Timer gestartet (jede Sekunde)");
    this.intervalId = setInterval(() => {
      this.ticks++;
      console.log(`  TimerComponent: Tick ${this.ticks}`);
    }, 1000);
  }

  onDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log(`  TimerComponent: Timer gestoppt nach ${this.ticks} Ticks`);
    }
  }
}


// ============================================================
// 4. DashboardComponent — mit OnChanges
// ============================================================

class DashboardComponent extends Component implements OnInit, OnChanges, OnDestroy {
  title = "";
  private subscriptions: string[] = [];

  onInit(): void {
    console.log("  DashboardComponent: Initialisierung — Daten laden...");
    this.subscriptions.push("DataSubscription");
    this.subscriptions.push("NotificationSubscription");
    console.log(`  DashboardComponent: ${this.subscriptions.length} Subscriptions aktiv`);
  }

  onChanges(changes: SimpleChanges): void {
    if (changes["title"]) {
      const change = changes["title"];
      if (change.firstChange) {
        console.log(`  DashboardComponent: Titel initial gesetzt auf "${change.currentValue}"`);
      } else {
        console.log(
          `  DashboardComponent: Titel geändert von "${change.previousValue}" zu "${change.currentValue}"`
        );
      }
      this.title = change.currentValue as string;
    }
  }

  onDestroy(): void {
    console.log(`  DashboardComponent: ${this.subscriptions.length} Subscriptions aufräumen`);
    this.subscriptions.forEach((sub) => {
      console.log(`    Unsubscribe: ${sub}`);
    });
    this.subscriptions = [];
  }
}


// ============================================================
// 5. SimpleComponent — nur OnInit, kein Cleanup nötig
// ============================================================

class SimpleComponent extends Component implements OnInit {
  onInit(): void {
    console.log("  SimpleComponent: Einmalige Initialisierung — fertig!");
  }
}


// ============================================================
// 6. Demo: Lifecycle in Aktion
// ============================================================

console.log("=== Component Lifecycle — nachgebaut in TypeScript ===\n");

// --- TimerComponent ---
console.log("--- TimerComponent ---");
const timer = new TimerComponent();
timer.init();

// Timer 3 Sekunden laufen lassen, dann aufräumen
setTimeout(() => {
  timer.destroy();

  // --- DashboardComponent ---
  console.log("\n--- DashboardComponent ---");
  const dashboard = new DashboardComponent();
  dashboard.init();

  // Simulierte @Input()-Änderungen
  dashboard.detectChanges({
    title: { previousValue: undefined, currentValue: "Willkommen", firstChange: true },
  });

  dashboard.detectChanges({
    title: { previousValue: "Willkommen", currentValue: "Dashboard v2", firstChange: false },
  });

  dashboard.destroy();

  // --- SimpleComponent ---
  console.log("\n--- SimpleComponent ---");
  const simple = new SimpleComponent();
  simple.init();
  simple.destroy();  // kein onDestroy implementiert — nur "Entfernt"

  console.log("\n=== Alle Komponenten durchliefen ihren Lifecycle ===");
}, 3500);
