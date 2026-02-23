# Block 14: Exercises

## Exercise 1: Auto-Klasse (`auto-klasse.ts`)

Baue eine vollständige Auto-Klasse mit Motor-Management, Geschwindigkeitsbegrenzung und eine SportsCar-Subklasse:

1. **Car Klasse** — `brand`, `model`, `year`, `color`, `maxSpeed` (public) sowie `currentSpeed` und `isEngineRunning` (private)
2. **Motor-Methoden** — `startEngine()` und `stopEngine()` mit Statusprüfung
3. **accelerate(amount)** — Geschwindigkeit erhöhen, `maxSpeed` respektieren, Error wenn Motor aus
4. **brake(amount)** — Geschwindigkeit verringern, nicht unter 0
5. **Getter & Status** — `speed` Getter, `getStatus()` gibt formatierten String zurück
6. **SportsCar extends Car** — Subklasse mit `turboBoost()` und höherem maxSpeed-Default

Tipps:
- Nutze `private` für interne Properties und einen `get`-Accessor für `speed`
- Validiere alle Eingaben (keine negativen Werte, Motor muss laufen)
- `SportsCar` erbt alles von `Car` und erweitert es um Turbo-Funktionalität
