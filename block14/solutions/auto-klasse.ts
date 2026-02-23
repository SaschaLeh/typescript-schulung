/**
 * Exercise 1: Auto-Klasse (SOLUTION)
 *
 * Hinweis: currentSpeed und isEngineRunning sind hier als `protected` statt `private`
 * deklariert. Das ist der korrekte OOP-Ansatz, wenn Subklassen (SportsCar) darauf
 * zugreifen müssen. Die Übung sagt zunächst "private" — beim Implementieren von
 * SportsCar merkt man, dass `protected` die richtige Wahl ist.
 */

// Car Klasse mit Motor-Management und Geschwindigkeitsbegrenzung
class Car {
  public brand: string;
  public model: string;
  public year: number;
  public color: string;
  public maxSpeed: number;
  protected currentSpeed: number = 0;
  protected isEngineRunning: boolean = false;

  constructor(brand: string, model: string, year: number, color: string, maxSpeed: number = 200) {
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.color = color;
    this.maxSpeed = maxSpeed;
  }

  // Motor starten
  startEngine(): void {
    if (this.isEngineRunning) {
      throw new Error("Engine is already running");
    }
    this.isEngineRunning = true;
    console.log(`${this.brand} ${this.model}: Motor gestartet`);
  }

  // Motor stoppen
  stopEngine(): void {
    if (!this.isEngineRunning) {
      throw new Error("Engine is already off");
    }
    if (this.currentSpeed > 0) {
      throw new Error("Cannot stop engine while moving. Brake first!");
    }
    this.isEngineRunning = false;
    console.log(`${this.brand} ${this.model}: Motor gestoppt`);
  }

  // Beschleunigen mit maxSpeed-Begrenzung
  accelerate(amount: number): void {
    if (!this.isEngineRunning) {
      throw new Error("Start the engine first!");
    }
    if (amount < 0) {
      throw new Error("Amount must be positive. Use brake() to slow down.");
    }
    this.currentSpeed = Math.min(this.currentSpeed + amount, this.maxSpeed);
    console.log(`${this.brand} ${this.model} beschleunigt auf ${this.currentSpeed} km/h`);
  }

  // Bremsen (nicht unter 0)
  brake(amount: number): void {
    if (amount < 0) {
      throw new Error("Amount must be positive.");
    }
    this.currentSpeed = Math.max(0, this.currentSpeed - amount);
    console.log(`${this.brand} ${this.model} bremst auf ${this.currentSpeed} km/h`);
  }

  // Getter für aktuelle Geschwindigkeit (read-only von außen)
  get speed(): number {
    return this.currentSpeed;
  }

  // Formatierter Status
  getStatus(): string {
    const engineStatus = this.isEngineRunning ? "an" : "aus";
    return `${this.brand} ${this.model} (${this.year}) [${this.color}] | Motor: ${engineStatus} | ${this.currentSpeed}/${this.maxSpeed} km/h`;
  }
}

// SportsCar Subklasse mit Turbo-Boost
class SportsCar extends Car {
  private turboActive: boolean = false;

  constructor(brand: string, model: string, year: number, color: string, maxSpeed: number = 300) {
    super(brand, model, year, color, maxSpeed);
  }

  // Turbo-Boost: Geschwindigkeit * 1.5, maxSpeed respektieren
  turboBoost(): void {
    if (!this.isEngineRunning) {
      throw new Error("Start the engine first!");
    }
    if (this.turboActive) {
      throw new Error("Turbo is already active!");
    }
    this.turboActive = true;
    this.currentSpeed = Math.min(this.currentSpeed * 1.5, this.maxSpeed);
    console.log(`TURBO! ${this.brand} ${this.model} beschleunigt auf ${this.currentSpeed} km/h`);
  }

  // Turbo deaktivieren
  deactivateTurbo(): void {
    this.turboActive = false;
    console.log(`${this.brand} ${this.model}: Turbo deaktiviert`);
  }

  // Status mit Turbo-Anzeige
  getStatus(): string {
    const turboStatus = this.turboActive ? "an" : "aus";
    return `${super.getStatus()} | Turbo: ${turboStatus}`;
  }
}

// Demonstration code
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
