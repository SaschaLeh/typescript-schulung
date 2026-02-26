// ============================================================
// Wiederholung Tag 3: Ticket-Buchungssystem - LÖSUNG
// ============================================================

// ============================================================
// Teil 1: Union Types & Type Guards (Block 9)
// ============================================================

// TODO 1: Basis-Interfaces und Discriminated Union Type

interface BaseEvent {
  id: number;
  title: string;
  date: string;
  price: number;
  availableTickets: number;
}

interface Concert extends BaseEvent {
  kind: "concert";
  artist: string;
  genre: string;
}

interface Workshop extends BaseEvent {
  kind: "workshop";
  instructor: string;
  maxParticipants: number;
  topic: string;
}

interface Conference extends BaseEvent {
  kind: "conference";
  speakers: string[];
  days: number;
}

type TicketEvent = Concert | Workshop | Conference;

// TODO 2: formatEventDetails mit exhaustive checking

function formatEventDetails(event: TicketEvent): string {
  switch (event.kind) {
    case "concert":
      return `🎵 ${event.title} - ${event.artist} (${event.genre})`;
    case "workshop":
      return `🔧 ${event.title} - Leitung: ${event.instructor}, Thema: ${event.topic}`;
    case "conference":
      return `🎤 ${event.title} - ${event.speakers.length} Speaker, ${event.days} Tage`;
    default: {
      const _exhaustive: never = event;
      return _exhaustive;
    }
  }
}

// ============================================================
// Teil 2: Generics (Block 10 & 16)
// ============================================================

// TODO 3: Generische Repository-Klasse

class Repository<T extends { id: number }> {
  private items: Map<number, T> = new Map();

  add(item: T): void {
    this.items.set(item.id, item);
  }

  getById(id: number): T | undefined {
    return this.items.get(id);
  }

  getAll(): T[] {
    return Array.from(this.items.values());
  }

  delete(id: number): boolean {
    return this.items.delete(id);
  }

  find(predicate: (item: T) => boolean): T | undefined {
    return this.getAll().find(predicate);
  }

  filter(predicate: (item: T) => boolean): T[] {
    return this.getAll().filter(predicate);
  }

  get size(): number {
    return this.items.size;
  }
}

// ============================================================
// Teil 3: Async/Await (Block 15)
// ============================================================

// TODO 4: Async Hilfsfunktionen

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchEvents(): Promise<TicketEvent[]> {
  await delay(100);
  return [
    {
      id: 1,
      title: "Rock am Ring",
      date: "2025-06-15",
      price: 89.99,
      availableTickets: 500,
      kind: "concert",
      artist: "Die Toten Hosen",
      genre: "Rock",
    },
    {
      id: 2,
      title: "TypeScript Masterclass",
      date: "2025-07-20",
      price: 149.0,
      availableTickets: 20,
      kind: "workshop",
      instructor: "Dr. Weber",
      maxParticipants: 20,
      topic: "Advanced Generics",
    },
    {
      id: 3,
      title: "DevConf 2025",
      date: "2025-09-10",
      price: 299.0,
      availableTickets: 200,
      kind: "conference",
      speakers: ["Anna Schmidt", "Bob Miller", "Clara Fischer"],
      days: 3,
    },
    {
      id: 4,
      title: "Jazz Nacht",
      date: "2025-08-05",
      price: 45.0,
      availableTickets: 0,
      kind: "concert",
      artist: "Miles Davis Tribute",
      genre: "Jazz",
    },
  ];
}

async function processPayment(amount: number): Promise<boolean> {
  await delay(50);
  return amount > 0;
}

// TODO 5: bookEvent Funktion

interface BookingConfirmation {
  bookingId: string;
  eventTitle: string;
  customerName: string;
  numberOfTickets: number;
  totalPrice: number;
}

async function bookEvent(
  repo: Repository<TicketEvent>,
  eventId: number,
  customerName: string,
  numberOfTickets: number
): Promise<BookingConfirmation> {
  // 1. Event suchen
  const event = repo.getById(eventId);
  if (!event) {
    throw new Error("Event nicht gefunden");
  }

  // 2. Tickets prüfen
  if (event.availableTickets < numberOfTickets) {
    throw new Error("Nicht genügend Tickets");
  }

  // 3. Zahlung verarbeiten
  const totalPrice = event.price * numberOfTickets;
  const paymentOk = await processPayment(totalPrice);
  if (!paymentOk) {
    throw new Error("Zahlung fehlgeschlagen");
  }

  // 4. Tickets aktualisieren
  repo.delete(event.id);
  repo.add({
    ...event,
    availableTickets: event.availableTickets - numberOfTickets,
  });

  // 5. Bestätigung zurückgeben
  return {
    bookingId: `BK-${Date.now()}`,
    eventTitle: event.title,
    customerName,
    numberOfTickets,
    totalPrice,
  };
}

// ============================================================
// Demo
// ============================================================

async function main(): Promise<void> {
  console.log("=== Ticket-Buchungssystem ===\n");

  // Events laden
  const events = await fetchEvents();
  console.log(`${events.length} Events geladen\n`);

  // Repository erstellen und befüllen
  const repo = new Repository<TicketEvent>();
  events.forEach((e) => repo.add(e));
  console.log(`Repository: ${repo.size} Events\n`);

  // Events formatiert ausgeben
  console.log("--- Alle Events ---");
  repo.getAll().forEach((e) => console.log(formatEventDetails(e)));

  // Discriminated Union: Nur Konzerte filtern
  console.log("\n--- Nur Konzerte ---");
  repo.getAll().forEach((e) => {
    if (e.kind === "concert") {
      console.log(`  ${e.title} von ${e.artist}`);
    }
  });

  // Buchung durchführen
  console.log("\n--- Buchung ---");
  try {
    const confirmation = await bookEvent(repo, 1, "Max Mustermann", 2);
    console.log("Buchung erfolgreich!");
    console.log(`  Buchungs-ID: ${confirmation.bookingId}`);
    console.log(`  Event: ${confirmation.eventTitle}`);
    console.log(`  Tickets: ${confirmation.numberOfTickets}`);
    console.log(`  Gesamt: ${confirmation.totalPrice} EUR`);
  } catch (error) {
    console.log(`Buchung fehlgeschlagen: ${(error as Error).message}`);
  }

  // Fehlgeschlagene Buchung testen
  console.log("\n--- Fehlerhafte Buchung ---");
  try {
    await bookEvent(repo, 999, "Max Mustermann", 2);
  } catch (error) {
    console.log(`Erwartet fehlgeschlagen: ${(error as Error).message}`);
  }

  // Verfügbare Tickets nach Buchung
  console.log("\n--- Verfügbare Tickets nach Buchung ---");
  const event1 = repo.getById(1);
  if (event1) {
    console.log(
      `  ${event1.title}: ${event1.availableTickets} Tickets verfügbar`
    );
  }
}

main().catch(console.error);
