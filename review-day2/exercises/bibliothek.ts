/**
 * Wiederholungsübung Tag 2: Bibliotheks-Verwaltungssystem
 *
 * Diese Übung festigt alle Konzepte von Tag 2:
 *   - Objekt-Literale (Block 5)
 *   - Interfaces (Block 6)
 *   - Klassen mit Konstruktoren, Gettern und Access Modifiers (Block 7)
 *   - Vererbung, abstrakte Klassen und Polymorphie (Block 8)
 *
 * Szenario: Du baust ein Verwaltungssystem für eine Bibliothek.
 * Medien (Bücher, DVDs, Magazine) können ausgeliehen und zurückgegeben werden.
 */


// ============================================================
// TEIL 1: Enums & Interfaces (Block 5 + 6)
// ============================================================

// TODO 1: Erstelle ein Enum "MediaType" mit den Werten:
//   Book, DVD, Magazine


// TODO 2: Erstelle ein Interface "IMedia" mit folgenden Properties:
//   - id: string
//   - title: string
//   - year: number
//   - type: MediaType


// TODO 3: Erstelle ein Interface "IBorrowable" mit folgenden Properties/Methoden:
//   - isAvailable: boolean
//   - borrowedBy: string | null     (Name des Ausleihers oder null)
//   - borrow(memberName: string): void
//   - returnItem(): void


// TODO 4: Erstelle ein Interface "IPrintable" mit einer Methode:
//   - getInfo(): string             (gibt eine formatierte Beschreibung zurück)


// ============================================================
// TEIL 2: Abstrakte Basisklasse (Block 7 + 8)
// ============================================================

// TODO 5: Erstelle eine abstrakte Klasse "Media" die IMedia, IBorrowable und IPrintable implementiert
//
//   Protected Properties:
//     - _isAvailable: boolean = true
//     - _borrowedBy: string | null = null
//
//   Constructor: nimmt id, title, year und type entgegen
//
//   Getter (public, read-only von außen):
//     - get isAvailable(): boolean
//     - get borrowedBy(): string | null
//
//   Methode borrow(memberName: string): void
//     - Wenn nicht verfügbar: Error werfen ("'{title}' ist bereits ausgeliehen von {borrowedBy}")
//     - Wenn memberName leer: Error werfen ("Mitgliedsname darf nicht leer sein")
//     - Setzt _isAvailable auf false und _borrowedBy auf memberName
//     - Ausgabe: "{memberName} hat '{title}' ausgeliehen"
//
//   Methode returnItem(): void
//     - Wenn bereits verfügbar: Error werfen ("'{title}' ist nicht ausgeliehen")
//     - Merke dir den alten Ausleiher für die Ausgabe
//     - Setzt _isAvailable auf true und _borrowedBy auf null
//     - Ausgabe: "{alterAusleiher} hat '{title}' zurückgegeben"
//
//   Abstrakte Methode (muss von Subklassen implementiert werden):
//     - abstract getInfo(): string


// ============================================================
// TEIL 3: Konkrete Klassen mit Vererbung (Block 8)
// ============================================================

// TODO 6: Erstelle die Klasse "Book" die Media erweitert
//   - Zusätzliche Properties: author (string), pages (number), isbn (string)
//   - Constructor: nimmt id, title, year, author, pages und isbn entgegen
//     (ruft super() mit MediaType.Book auf)
//   - Implementiere getInfo():
//     Rückgabe: "📖 '{title}' von {author} ({year}) - {pages} Seiten [ISBN: {isbn}]"
//     Status: verfügbar/ausgeliehen von {borrowedBy}


// TODO 7: Erstelle die Klasse "DVD" die Media erweitert
//   - Zusätzliche Properties: director (string), durationMinutes (number)
//   - Constructor: nimmt id, title, year, director und durationMinutes entgegen
//     (ruft super() mit MediaType.DVD auf)
//   - Implementiere getInfo():
//     Rückgabe: "💿 '{title}' von {director} ({year}) - {durationMinutes} Min."
//     Status: verfügbar/ausgeliehen von {borrowedBy}


// TODO 8: Erstelle die Klasse "Magazine" die Media erweitert
//   - Zusätzliche Properties: publisher (string), issueNumber (number)
//   - Constructor: nimmt id, title, year, publisher und issueNumber entgegen
//     (ruft super() mit MediaType.Magazine auf)
//   - Implementiere getInfo():
//     Rückgabe: "📰 '{title}' - Ausgabe {issueNumber} ({publisher}, {year})"
//     Status: verfügbar/ausgeliehen von {borrowedBy}


// ============================================================
// TEIL 4: Verwaltungsklasse & Polymorphie (Block 7 + 8)
// ============================================================

// TODO 9: Erstelle die Klasse "Library"
//   - Private Property: media (Array von Media-Objekten, startet leer)
//   - Private Property: name (string)
//   - Constructor: nimmt den Bibliotheksnamen entgegen
//
//   Methoden:
//
//   addMedia(item: Media): void
//     - Prüfe, ob eine Media mit gleicher ID bereits existiert
//     - Wenn ja: Error werfen ("Medium mit ID '{id}' existiert bereits")
//     - Füge das Medium zum Array hinzu
//     - Ausgabe: "'{title}' wurde zur Bibliothek {name} hinzugefügt"
//
//   findById(id: string): Media | undefined
//     - Sucht und gibt das Medium mit der gegebenen ID zurück
//
//   search(query: string): Media[]
//     - Durchsucht alle Medien nach dem Suchbegriff (case-insensitive)
//     - Sucht in title und prüft auch:
//       - Bei Book: auch in author
//       - Bei DVD: auch in director
//       - Bei Magazine: auch in publisher
//     - Tipp: Nutze instanceof um den Typ zu prüfen!
//
//   borrowMedia(id: string, memberName: string): void
//     - Findet das Medium per ID, wirft Error wenn nicht gefunden: "Medium mit ID '{id}' nicht gefunden"
//     - Ruft borrow() auf dem Medium auf (Fehlerbehandlung vom Medium übernehmen)
//
//   returnMedia(id: string): void
//     - Findet das Medium per ID, wirft Error wenn nicht gefunden
//     - Ruft returnItem() auf dem Medium auf
//
//   getAvailableMedia(): Media[]
//     - Gibt alle verfügbaren Medien zurück
//
//   getBorrowedMedia(): Media[]
//     - Gibt alle ausgeliehenen Medien zurück
//
//   listAll(): void   (nutzt Polymorphie!)
//     - Gibt den Bibliotheksnamen aus
//     - Iteriert über alle Medien und ruft getInfo() auf jedem auf
//     - getInfo() liefert je nach Typ (Book/DVD/Magazine) andere Ausgaben — das ist Polymorphie!


// ============================================================
// Demonstration — Entkommentiere den Code um deine Lösung zu testen
// ============================================================

/*
console.log("========================================");
console.log("  BIBLIOTHEKS-VERWALTUNGSSYSTEM");
console.log("========================================\n");

// --- Bibliothek erstellen ---
const bib = new Library("Stadtbibliothek München");

// --- Medien erstellen (Objekte mit verschiedenen Klassen) ---
const book1 = new Book("B001", "Der Herr der Ringe", 1954, "J.R.R. Tolkien", 1178, "978-3-608-93981-0");
const book2 = new Book("B002", "Clean Code", 2008, "Robert C. Martin", 464, "978-0-13-235088-4");
const book3 = new Book("B003", "TypeScript in 50 Lessons", 2020, "Stefan Baumgartner", 464, "978-3-945749-22-2");

const dvd1 = new DVD("D001", "Inception", 2010, "Christopher Nolan", 148);
const dvd2 = new DVD("D002", "Matrix", 1999, "Lana Wachowski", 136);

const mag1 = new Magazine("M001", "c't", 2024, "Heise", 15);
const mag2 = new Magazine("M002", "iX Developer", 2024, "Heise", 3);

// --- Medien hinzufügen ---
console.log("=== Medien hinzufügen ===");
bib.addMedia(book1);
bib.addMedia(book2);
bib.addMedia(book3);
bib.addMedia(dvd1);
bib.addMedia(dvd2);
bib.addMedia(mag1);
bib.addMedia(mag2);

// --- Duplikat testen ---
console.log("\n=== Duplikat-Test ===");
try {
  bib.addMedia(new Book("B001", "Duplikat", 2024, "Test", 100, "000"));
} catch (e) {
  console.log("Error:", (e as Error).message);
}

// --- Alle Medien auflisten (Polymorphie!) ---
console.log("\n=== Alle Medien ===");
bib.listAll();

// --- Ausleihen ---
console.log("\n=== Ausleihen ===");
bib.borrowMedia("B001", "Anna Schmidt");
bib.borrowMedia("D001", "Max Müller");
bib.borrowMedia("M001", "Lisa Weber");

// --- Doppelt ausleihen versuchen ---
console.log("\n=== Doppelt ausleihen ===");
try {
  bib.borrowMedia("B001", "Peter Pan");
} catch (e) {
  console.log("Error:", (e as Error).message);
}

// --- Status nach Ausleihen ---
console.log("\n=== Verfügbare Medien ===");
const available = bib.getAvailableMedia();
console.log(`${available.length} Medien verfügbar:`);
available.forEach(m => console.log(`  - ${m.title}`));

console.log("\n=== Ausgeliehene Medien ===");
const borrowed = bib.getBorrowedMedia();
console.log(`${borrowed.length} Medien ausgeliehen:`);
borrowed.forEach(m => console.log(`  - ${m.title} (von ${m.borrowedBy})`));

// --- Suche (mit instanceof-basierter Feldsuche) ---
console.log("\n=== Suche nach 'Tolkien' ===");
const results1 = bib.search("Tolkien");
results1.forEach(m => console.log(m.getInfo()));

console.log("\n=== Suche nach 'Heise' ===");
const results2 = bib.search("Heise");
results2.forEach(m => console.log(m.getInfo()));

console.log("\n=== Suche nach 'Code' ===");
const results3 = bib.search("code");
results3.forEach(m => console.log(m.getInfo()));

// --- Rückgabe ---
console.log("\n=== Rückgabe ===");
bib.returnMedia("B001");
bib.returnMedia("D001");

// --- Nicht gefundenes Medium ---
console.log("\n=== Nicht existierendes Medium ===");
try {
  bib.borrowMedia("X999", "Ghost");
} catch (e) {
  console.log("Error:", (e as Error).message);
}

// --- Finaler Status ---
console.log("\n=== Finaler Status ===");
bib.listAll();
*/
