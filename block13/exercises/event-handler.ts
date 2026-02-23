/**
 * Exercise 2: EventEmitter & this-Binding
 *
 * In dieser Übung baust du einen eigenen EventEmitter und demonstrierst,
 * wie `this` als Callback verloren geht und wie man es repariert.
 * Follow the instructions below to complete the implementation.
 */


// TODO 1: Implementiere eine EventEmitter Klasse
// - Private Property: listeners als Map<string, Function[]>
// - on(event: string, handler: Function): void — Handler für Event registrieren
// - off(event: string, handler: Function): void — Handler entfernen
// - emit(event: string, ...args: any[]): void — Alle Handler für das Event aufrufen
// Tipp: Beim emit() alle registrierten Handler mit den übergebenen Argumenten aufrufen


// TODO 2: Implementiere eine Logger Klasse
// - Property: prefix (string) — z.B. "[App]" oder "[DB]"
// - Constructor nimmt prefix als Parameter
// - Methode log(message: string): void — gibt `${this.prefix} ${message}` aus
// - Methode warn(message: string): void — gibt `${this.prefix} WARNUNG: ${message}` aus


// TODO 3: Demonstriere das this-Problem
// - Erstelle einen EventEmitter und einen Logger mit prefix "[App]"
// - Registriere logger.log als Handler für das Event "message"
// - Emitte "message" mit einem Text → this.prefix ist undefined!
// - Gib einen Kommentar aus, der erklärt warum this verloren geht


// TODO 4: Repariere das this-Problem auf zwei Arten
// Fix A: Arrow Function als Wrapper
//   emitter.on("message", (msg: string) => logger.log(msg));
//
// Fix B: .bind(this)
//   emitter.on("message", logger.log.bind(logger));
//
// Teste beide Fixes und zeige, dass this.prefix jetzt korrekt ist


// Demonstration code - uncomment and run to test your implementation
/*
console.log("=== EventEmitter Grundfunktion ===");
const emitter = new EventEmitter();

emitter.on("greet", (name: string) => {
  console.log(`Hallo, ${name}!`);
});

emitter.on("greet", (name: string) => {
  console.log(`Willkommen, ${name}!`);
});

emitter.emit("greet", "TypeScript");
// → "Hallo, TypeScript!"
// → "Willkommen, TypeScript!"

console.log("\n=== this-Problem ===");
const logger = new Logger("[App]");
logger.log("Direkter Aufruf funktioniert");  // "[App] Direkter Aufruf funktioniert"

const emitter2 = new EventEmitter();
emitter2.on("msg", logger.log);  // Handler OHNE Binding!
emitter2.emit("msg", "this geht verloren");  // "undefined this geht verloren" ← Fehler!

console.log("\n=== Fix A: Arrow Function ===");
const emitter3 = new EventEmitter();
emitter3.on("msg", (msg: string) => logger.log(msg));
emitter3.emit("msg", "Arrow Fix funktioniert");  // "[App] Arrow Fix funktioniert"

console.log("\n=== Fix B: .bind() ===");
const emitter4 = new EventEmitter();
emitter4.on("msg", logger.log.bind(logger));
emitter4.emit("msg", "Bind Fix funktioniert");  // "[App] Bind Fix funktioniert"
*/
