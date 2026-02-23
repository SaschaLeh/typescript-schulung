/**
 * Block 14: Auto-Klasse — Vehicle Basisklasse (Lehrbeispiel)
 *
 * Dieses Beispiel zeigt eine einfache Fahrzeug-Klasse als Warm-up
 * vor der Übung. Konzepte: Klassen, private Properties, Getter, Validierung.
 */

// Einfache Vehicle Basisklasse
class Vehicle {
  public brand: string;
  public model: string;
  private _speed: number = 0;

  constructor(brand: string, model: string) {
    this.brand = brand;
    this.model = model;
  }

  // Getter für die aktuelle Geschwindigkeit (read-only von außen)
  get speed(): number {
    return this._speed;
  }

  // Beschleunigen mit Validierung
  accelerate(amount: number): void {
    if (amount < 0) {
      throw new Error("Amount must be positive. Use brake() to slow down.");
    }
    this._speed += amount;
    console.log(`${this.brand} ${this.model} beschleunigt auf ${this._speed} km/h`);
  }

  // Bremsen mit Validierung (nicht unter 0)
  brake(amount: number): void {
    if (amount < 0) {
      throw new Error("Amount must be positive.");
    }
    this._speed = Math.max(0, this._speed - amount);
    console.log(`${this.brand} ${this.model} bremst auf ${this._speed} km/h`);
  }

  // Status-Ausgabe
  toString(): string {
    return `${this.brand} ${this.model} | ${this._speed} km/h`;
  }
}

// Demonstration
console.log("=== Vehicle Basisklasse ===");

const vehicle = new Vehicle("Toyota", "Corolla");
console.log(vehicle.toString());

vehicle.accelerate(50);
vehicle.accelerate(30);
vehicle.brake(20);
console.log(`Aktuelle Geschwindigkeit: ${vehicle.speed} km/h`);

vehicle.brake(100); // Kann nicht unter 0 fallen
console.log(`Nach starkem Bremsen: ${vehicle.speed} km/h`);

console.log("\n=== Fehlerbehandlung ===");
try {
  vehicle.accelerate(-10);
} catch (e) {
  console.log("Error:", (e as Error).message);
}
