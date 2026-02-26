// ============================================================
// Wiederholung Tag 3: Ticket-Buchungssystem
// ============================================================
// Themen: Union Types, Generics, Async/Await
// ============================================================

// ============================================================
// Teil 1: Union Types & Type Guards (Block 9)
// ============================================================

// TODO 1: Erstelle die Basis-Interfaces und den Discriminated Union Type
//
// a) Erstelle ein Interface "BaseEvent" mit:
//    - id: number
//    - title: string
//    - date: string
//    - price: number
//    - availableTickets: number
//
// b) Erstelle drei Interfaces die BaseEvent erweitern:
//    - Concert: kind = "concert", artist: string, genre: string
//    - Workshop: kind = "workshop", instructor: string, maxParticipants: number, topic: string
//    - Conference: kind = "conference", speakers: string[], days: number
//
// c) Erstelle den Union Type: type TicketEvent = Concert | Workshop | Conference
//    (Hinweis: "Event" ist ein reservierter DOM-Typ, daher "TicketEvent")

// TODO 2: Erstelle eine Funktion "formatEventDetails(event: TicketEvent): string"
//
// Nutze ein switch-Statement auf event.kind und gib zurück:
//   Concert:    "🎵 {title} - {artist} ({genre})"
//   Workshop:   "🔧 {title} - Leitung: {instructor}, Thema: {topic}"
//   Conference: "🎤 {title} - {speakers.length} Speaker, {days} Tage"
//
// Nutze exhaustive checking mit never für den default-Fall

// ============================================================
// Teil 2: Generics (Block 10 & 16)
// ============================================================

// TODO 3: Erstelle eine generische Repository<T extends { id: number }> Klasse
//
// Property:
//   - private items: Map<number, T>
//
// Methoden:
//   - add(item: T): void           → Fügt ein Element hinzu
//   - getById(id: number): T | undefined → Sucht nach ID
//   - getAll(): T[]                → Gibt alle Elemente zurück
//   - delete(id: number): boolean  → Löscht ein Element, gibt true/false zurück
//   - find(predicate: (item: T) => boolean): T | undefined → Findet erstes passendes Element
//   - filter(predicate: (item: T) => boolean): T[] → Filtert Elemente
//   - get size(): number           → Getter für die Anzahl

// ============================================================
// Teil 3: Async/Await (Block 15)
// ============================================================

// TODO 4: Erstelle async Hilfsfunktionen
//
// a) delay(ms: number): Promise<void>
//    → Gibt ein Promise zurück, das nach ms Millisekunden resolved
//
// b) fetchEvents(): Promise<TicketEvent[]>
//    → Simuliert einen API-Call (nutze delay(100))
//    → Gibt ein Array mit mindestens 3 Events zurück
//      (je eins pro Typ: Concert, Workshop, Conference)
//
// c) processPayment(amount: number): Promise<boolean>
//    → Simuliert Zahlungsverarbeitung (nutze delay(50))
//    → Gibt true zurück wenn amount > 0, sonst false

// TODO 5: Erstelle die async Funktion "bookEvent"
//
// a) Erstelle ein Interface "BookingConfirmation":
//    - bookingId: string
//    - eventTitle: string
//    - customerName: string
//    - numberOfTickets: number
//    - totalPrice: number
//
// b) async function bookEvent(
//      repo: Repository<TicketEvent>,
//      eventId: number,
//      customerName: string,
//      numberOfTickets: number
//    ): Promise<BookingConfirmation>
//
// Schritte:
//   1. Event im Repository suchen → throw new Error("Event nicht gefunden")
//   2. Prüfe ob genug Tickets verfügbar → throw new Error("Nicht genügend Tickets")
//   3. Zahlung verarbeiten mit processPayment() → throw new Error("Zahlung fehlgeschlagen")
//   4. Tickets aktualisieren:
//      - Altes Event löschen, neues mit reduzierten Tickets hinzufügen (Spread-Operator)
//   5. BookingConfirmation zurückgeben:
//      - bookingId: `BK-${Date.now()}`
//      - totalPrice: price * numberOfTickets

// ============================================================
// Demo-Block: Teste dein System
// ============================================================
// Entkommentiere den folgenden Code, wenn alle TODOs implementiert sind:

/*
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
*/
