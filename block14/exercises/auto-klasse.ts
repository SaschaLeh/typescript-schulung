/**
 * Exercise 1: Auto-Klasse
 *
 * In dieser Übung baust du eine vollständige Auto-Klasse mit Motor-Management,
 * Geschwindigkeitsbegrenzung und eine SportsCar-Subklasse mit Turbo-Boost.
 * Follow the instructions below to complete the implementation.
 */


// TODO 1: Implementiere die Car Klasse
// - Public Properties: brand (string), model (string), year (number), color (string), maxSpeed (number)
// - Private Properties: currentSpeed (number, startet bei 0), isEngineRunning (boolean, startet bei false)
// - Constructor: nimmt brand, model, year, color und optionalen maxSpeed (default: 200) entgegen


// TODO 2: Implementiere startEngine() und stopEngine()
// - startEngine(): Setzt isEngineRunning auf true, gibt Meldung aus
//   - Wenn Motor bereits läuft: Error werfen ("Engine is already running")
// - stopEngine(): Setzt isEngineRunning auf false, gibt Meldung aus
//   - Wenn currentSpeed > 0: Error werfen ("Cannot stop engine while moving. Brake first!")
//   - Wenn Motor bereits aus: Error werfen ("Engine is already off")


// TODO 3: Implementiere accelerate(amount: number): void
// - Erhöht currentSpeed um amount
// - Wenn Motor nicht läuft: Error werfen ("Start the engine first!")
// - Wenn amount negativ: Error werfen ("Amount must be positive. Use brake() to slow down.")
// - Wenn currentSpeed + amount > maxSpeed: currentSpeed = maxSpeed (begrenzen, nicht Error)
// - Ausgabe: "{brand} {model} beschleunigt auf {currentSpeed} km/h"


// TODO 4: Implementiere brake(amount: number): void
// - Verringert currentSpeed um amount
// - Wenn amount negativ: Error werfen ("Amount must be positive.")
// - currentSpeed darf nicht unter 0 fallen (Math.max verwenden)
// - Ausgabe: "{brand} {model} bremst auf {currentSpeed} km/h"


// TODO 5: Implementiere den Getter und getStatus()
// - get speed(): number — gibt currentSpeed zurück (read-only von außen)
// - getStatus(): string — gibt formatierten String zurück:
//   "{brand} {model} ({year}) [{color}] | Motor: {an/aus} | {currentSpeed}/{maxSpeed} km/h"


// TODO 6: Implementiere SportsCar extends Car
// - Constructor: brand, model, year, color, optionaler maxSpeed (default: 300 statt 200)
// - Neue Eigenschaft: private turboActive (boolean, startet bei false)
// - turboBoost(): void
//   - Aktiviert Turbo: currentSpeed * 1.5, aber maxSpeed respektieren
//   - Wenn Motor aus: Error werfen ("Start the engine first!")
//   - Wenn Turbo bereits aktiv: Error werfen ("Turbo is already active!")
//   - Setzt turboActive auf true
//   - Ausgabe: "TURBO! {brand} {model} beschleunigt auf {currentSpeed} km/h"
// - deactivateTurbo(): void — Setzt turboActive auf false
// - Überschreibe getStatus(): Füge "| Turbo: {an/aus}" am Ende hinzu


// Demonstration code - uncomment and run to test your implementation
/*
console.log("=== Car erstellen ===");
const myCar = new Car("VW", "Golf", 2023, "blau");
console.log(myCar.getStatus());

console.log("\n=== Motor starten & fahren ===");
myCar.startEngine();
myCar.accelerate(50);
myCar.accelerate(30);
console.log(`Aktuelle Geschwindigkeit: ${myCar.speed} km/h`);

console.log("\n=== Bremsen ===");
myCar.brake(20);
console.log(myCar.getStatus());

console.log("\n=== Geschwindigkeitsbegrenzung ===");
myCar.accelerate(300); // Wird auf maxSpeed begrenzt
console.log(`Begrenzt auf: ${myCar.speed} km/h`);

console.log("\n=== Bremsen & Motor aus ===");
myCar.brake(999);
myCar.stopEngine();
console.log(myCar.getStatus());

console.log("\n=== Fehlerbehandlung ===");
try {
  myCar.accelerate(50); // Motor ist aus!
} catch (e) {
  console.log("Error:", (e as Error).message);
}

try {
  myCar.startEngine();
  myCar.accelerate(50);
  myCar.stopEngine(); // Fährt noch!
} catch (e) {
  console.log("Error:", (e as Error).message);
}

console.log("\n=== SportsCar ===");
const porsche = new SportsCar("Porsche", "911", 2024, "rot");
console.log(porsche.getStatus());

porsche.startEngine();
porsche.accelerate(100);
console.log(porsche.getStatus());

console.log("\n=== Turbo Boost ===");
porsche.turboBoost();
console.log(porsche.getStatus());

porsche.deactivateTurbo();
porsche.brake(999);
porsche.stopEngine();
console.log(porsche.getStatus());
*/
