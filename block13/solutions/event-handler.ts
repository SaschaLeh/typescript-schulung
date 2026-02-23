/**
 * Exercise 2: EventEmitter & this-Binding (SOLUTION)
 */

// EventEmitter Klasse mit on, off, emit
class EventEmitter {
  private listeners: Map<string, Function[]> = new Map();

  on(event: string, handler: Function): void {
    const handlers = this.listeners.get(event) || [];
    handlers.push(handler);
    this.listeners.set(event, handlers);
  }

  off(event: string, handler: Function): void {
    const handlers = this.listeners.get(event);
    if (!handlers) return;

    const index = handlers.indexOf(handler);
    if (index !== -1) {
      handlers.splice(index, 1);
    }
  }

  emit(event: string, ...args: any[]): void {
    const handlers = this.listeners.get(event);
    if (!handlers) return;

    for (const handler of handlers) {
      handler(...args);
    }
  }
}

// Logger Klasse mit prefix und this-abhängigen Methoden
class Logger {
  prefix: string;

  constructor(prefix: string) {
    this.prefix = prefix;
  }

  log(message: string): void {
    console.log(`${this.prefix} ${message}`);
  }

  warn(message: string): void {
    console.log(`${this.prefix} WARNUNG: ${message}`);
  }
}

// Demonstration code
console.log("=== EventEmitter Grundfunktion ===");
const emitter = new EventEmitter();

emitter.on("greet", (name: string) => {
  console.log(`Hallo, ${name}!`);
});

emitter.on("greet", (name: string) => {
  console.log(`Willkommen, ${name}!`);
});

emitter.emit("greet", "TypeScript");

console.log("\n=== this-Problem demonstrieren ===");
const logger = new Logger("[App]");
logger.log("Direkter Aufruf funktioniert");  // "[App] Direkter Aufruf funktioniert"

const emitter2 = new EventEmitter();
emitter2.on("msg", logger.log);  // Handler OHNE Binding!
try {
  emitter2.emit("msg", "this geht verloren");
} catch (e) {
  console.log("TypeError gefangen:", (e as Error).message);
  console.log("→ this.prefix ist undefined, weil `this` im Callback nicht mehr auf logger zeigt");
}

console.log("\n=== Fix A: Arrow Function als Wrapper ===");
const emitter3 = new EventEmitter();
emitter3.on("msg", (msg: string) => logger.log(msg));
emitter3.emit("msg", "Arrow Fix funktioniert");  // "[App] Arrow Fix funktioniert"

console.log("\n=== Fix B: .bind() ===");
const emitter4 = new EventEmitter();
emitter4.on("msg", logger.log.bind(logger));
emitter4.emit("msg", "Bind Fix funktioniert");  // "[App] Bind Fix funktioniert"

console.log("\n=== off() demonstrieren ===");
const emitter5 = new EventEmitter();
const boundLog = logger.log.bind(logger);
emitter5.on("test", boundLog);
emitter5.emit("test", "Nachricht 1");  // "[App] Nachricht 1"
emitter5.off("test", boundLog);
emitter5.emit("test", "Nachricht 2");  // nichts — Handler wurde entfernt
console.log("(Handler entfernt, keine Ausgabe für Nachricht 2)");
