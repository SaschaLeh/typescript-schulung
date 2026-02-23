export {};

/**
 * Block 18: Dependency Injection in TypeScript
 *
 * Angular nutzt einen DI-Container, um Abhängigkeiten automatisch aufzulösen.
 * Hier bauen wir das Konzept in purem TypeScript nach:
 * - Container mit register() und resolve()
 * - Constructor Injection Pattern
 * - Singleton vs. Transient Lifecycle
 *
 * In Angular: @Injectable({ providedIn: 'root' }) registriert einen Service
 * global als Singleton. Unser Container macht dasselbe explizit.
 */

// ============================================================
// 1. DI-Container Klasse
// ============================================================

type Factory<T> = (container: Container) => T;

interface Registration<T> {
  factory: Factory<T>;
  singleton: boolean;
  instance?: T;
}

class Container {
  private registrations = new Map<string, Registration<unknown>>();

  /**
   * Service registrieren.
   * @param token  - Eindeutiger Name (in Angular: der Klassen-Typ selbst)
   * @param factory - Factory-Funktion, die den Service erstellt
   * @param singleton - true = eine Instanz (default), false = jedes Mal neu
   */
  register<T>(token: string, factory: Factory<T>, singleton: boolean = true): void {
    this.registrations.set(token, { factory, singleton });
  }

  /**
   * Service auflösen — erstellt oder gibt vorhandene Instanz zurück.
   * In Angular passiert das automatisch im Konstruktor.
   */
  resolve<T>(token: string): T {
    const registration = this.registrations.get(token);
    if (!registration) {
      throw new Error(`Service "${token}" ist nicht registriert! Hast du register() aufgerufen?`);
    }

    // Singleton: Instanz cachen
    if (registration.singleton) {
      if (!registration.instance) {
        registration.instance = registration.factory(this);
      }
      return registration.instance as T;
    }

    // Transient: jedes Mal eine neue Instanz
    return registration.factory(this) as T;
  }

  /**
   * Prüfen, ob ein Service registriert ist.
   */
  has(token: string): boolean {
    return this.registrations.has(token);
  }
}


// ============================================================
// 2. Services definieren (wie Angular Services)
// ============================================================

/**
 * LogService — wie ein Angular Service mit @Injectable()
 * In Angular: @Injectable({ providedIn: 'root' })
 */
class LogService {
  private logs: string[] = [];

  log(message: string): void {
    const timestamp = new Date().toISOString().substring(11, 19);
    const entry = `[${timestamp}] ${message}`;
    this.logs.push(entry);
    console.log(entry);
  }

  getHistory(): string[] {
    return [...this.logs];
  }
}

/**
 * HttpService — simuliert HTTP-Anfragen
 * In Angular: HttpClient wird über DI injiziert
 */
class HttpService {
  private logger: LogService;

  // Constructor Injection: Abhängigkeit wird im Konstruktor übergeben
  constructor(logger: LogService) {
    this.logger = logger;
  }

  async get<T>(url: string): Promise<T> {
    this.logger.log(`GET ${url}`);
    // Simulierte Antwort
    return { data: `Response von ${url}` } as unknown as T;
  }

  async post<T>(url: string, body: unknown): Promise<T> {
    this.logger.log(`POST ${url} — Body: ${JSON.stringify(body)}`);
    return { success: true } as unknown as T;
  }
}

/**
 * UserService — hängt von HttpService und LogService ab
 * In Angular: constructor(private http: HttpClient, private logger: LogService)
 */
class UserService {
  private http: HttpService;
  private logger: LogService;

  constructor(http: HttpService, logger: LogService) {
    this.http = http;
    this.logger = logger;
  }

  async getUser(id: number): Promise<{ id: number; name: string }> {
    this.logger.log(`UserService: Lade User #${id}`);
    const response = await this.http.get<{ data: string }>(`/api/users/${id}`);
    return { id, name: `User ${id}` };
  }

  async createUser(name: string): Promise<void> {
    this.logger.log(`UserService: Erstelle User "${name}"`);
    await this.http.post("/api/users", { name });
  }
}


// ============================================================
// 3. Services im Container registrieren
// ============================================================

console.log("=== Dependency Injection Container ===\n");

const container = new Container();

// Registrierung — vergleiche mit Angular:
// @Injectable({ providedIn: 'root' }) → Singleton
container.register<LogService>("LogService", () => new LogService());

// HttpService braucht LogService → container.resolve() im Factory
container.register<HttpService>("HttpService", (c) => {
  const logger = c.resolve<LogService>("LogService");
  return new HttpService(logger);
});

// UserService braucht HttpService + LogService
container.register<UserService>("UserService", (c) => {
  const http = c.resolve<HttpService>("HttpService");
  const logger = c.resolve<LogService>("LogService");
  return new UserService(http, logger);
});


// ============================================================
// 4. Services nutzen
// ============================================================

console.log("--- Services auflösen und nutzen ---\n");

const userService = container.resolve<UserService>("UserService");

// Async Demo
(async () => {
  await userService.getUser(1);
  await userService.getUser(42);
  await userService.createUser("Anna");

  // Singleton-Beweis: Gleiche LogService-Instanz überall
  const logger1 = container.resolve<LogService>("LogService");
  const logger2 = container.resolve<LogService>("LogService");
  console.log("\n--- Singleton-Beweis ---");
  console.log("Gleiche Instanz?", logger1 === logger2);  // true
  console.log("Log-Historie:", logger1.getHistory().length, "Einträge");


  // ============================================================
  // 5. Transient-Beispiel
  // ============================================================

  console.log("\n--- Transient vs Singleton ---");

  let instanceCount = 0;
  container.register<{ id: number }>(
    "TransientService",
    () => ({ id: ++instanceCount }),
    false  // transient: jedes Mal neu
  );

  const t1 = container.resolve<{ id: number }>("TransientService");
  const t2 = container.resolve<{ id: number }>("TransientService");
  const t3 = container.resolve<{ id: number }>("TransientService");

  console.log("Transient Instanz 1:", t1.id);  // 1
  console.log("Transient Instanz 2:", t2.id);  // 2
  console.log("Transient Instanz 3:", t3.id);  // 3
  console.log("Alle verschieden?", t1 !== t2 && t2 !== t3);  // true
})();
