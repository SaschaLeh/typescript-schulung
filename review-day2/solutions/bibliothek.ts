/**
 * Wiederholungsübung Tag 2: Bibliotheks-Verwaltungssystem (LÖSUNG)
 *
 * Diese Lösung zeigt die vollständige Implementierung mit:
 *   - Enum für Medientypen
 *   - Interfaces für Strukturdefinition
 *   - Abstrakter Basisklasse mit gemeinsamer Logik
 *   - Konkreten Subklassen (Polymorphie über getInfo())
 *   - Verwaltungsklasse mit Suche und Ausleihe
 */


// ============================================================
// TEIL 1: Enums & Interfaces
// ============================================================

enum MediaType {
  Book = "Book",
  DVD = "DVD",
  Magazine = "Magazine",
}

interface IMedia {
  id: string;
  title: string;
  year: number;
  type: MediaType;
}

interface IBorrowable {
  isAvailable: boolean;
  borrowedBy: string | null;
  borrow(memberName: string): void;
  returnItem(): void;
}

interface IPrintable {
  getInfo(): string;
}


// ============================================================
// TEIL 2: Abstrakte Basisklasse
// ============================================================

abstract class Media implements IMedia, IBorrowable, IPrintable {
  public id: string;
  public title: string;
  public year: number;
  public type: MediaType;
  protected _isAvailable: boolean = true;
  protected _borrowedBy: string | null = null;

  constructor(id: string, title: string, year: number, type: MediaType) {
    this.id = id;
    this.title = title;
    this.year = year;
    this.type = type;
  }

  get isAvailable(): boolean {
    return this._isAvailable;
  }

  get borrowedBy(): string | null {
    return this._borrowedBy;
  }

  borrow(memberName: string): void {
    if (!this._isAvailable) {
      throw new Error(`'${this.title}' ist bereits ausgeliehen von ${this._borrowedBy}`);
    }
    if (!memberName || memberName.trim() === "") {
      throw new Error("Mitgliedsname darf nicht leer sein");
    }
    this._isAvailable = false;
    this._borrowedBy = memberName;
    console.log(`${memberName} hat '${this.title}' ausgeliehen`);
  }

  returnItem(): void {
    if (this._isAvailable) {
      throw new Error(`'${this.title}' ist nicht ausgeliehen`);
    }
    const previousBorrower = this._borrowedBy;
    this._isAvailable = true;
    this._borrowedBy = null;
    console.log(`${previousBorrower} hat '${this.title}' zurückgegeben`);
  }

  abstract getInfo(): string;
}


// ============================================================
// TEIL 3: Konkrete Klassen mit Vererbung
// ============================================================

class Book extends Media {
  public author: string;
  public pages: number;
  public isbn: string;

  constructor(id: string, title: string, year: number, author: string, pages: number, isbn: string) {
    super(id, title, year, MediaType.Book);
    this.author = author;
    this.pages = pages;
    this.isbn = isbn;
  }

  getInfo(): string {
    const status = this._isAvailable
      ? "verfügbar"
      : `ausgeliehen von ${this._borrowedBy}`;
    return `📖 '${this.title}' von ${this.author} (${this.year}) - ${this.pages} Seiten [ISBN: ${this.isbn}] | ${status}`;
  }
}

class DVD extends Media {
  public director: string;
  public durationMinutes: number;

  constructor(id: string, title: string, year: number, director: string, durationMinutes: number) {
    super(id, title, year, MediaType.DVD);
    this.director = director;
    this.durationMinutes = durationMinutes;
  }

  getInfo(): string {
    const status = this._isAvailable
      ? "verfügbar"
      : `ausgeliehen von ${this._borrowedBy}`;
    return `💿 '${this.title}' von ${this.director} (${this.year}) - ${this.durationMinutes} Min. | ${status}`;
  }
}

class Magazine extends Media {
  public publisher: string;
  public issueNumber: number;

  constructor(id: string, title: string, year: number, publisher: string, issueNumber: number) {
    super(id, title, year, MediaType.Magazine);
    this.publisher = publisher;
    this.issueNumber = issueNumber;
  }

  getInfo(): string {
    const status = this._isAvailable
      ? "verfügbar"
      : `ausgeliehen von ${this._borrowedBy}`;
    return `📰 '${this.title}' - Ausgabe ${this.issueNumber} (${this.publisher}, ${this.year}) | ${status}`;
  }
}


// ============================================================
// TEIL 4: Verwaltungsklasse & Polymorphie
// ============================================================

class Library {
  private media: Media[] = [];
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  addMedia(item: Media): void {
    if (this.media.find(m => m.id === item.id)) {
      throw new Error(`Medium mit ID '${item.id}' existiert bereits`);
    }
    this.media.push(item);
    console.log(`'${item.title}' wurde zur Bibliothek ${this.name} hinzugefügt`);
  }

  findById(id: string): Media | undefined {
    return this.media.find(m => m.id === id);
  }

  search(query: string): Media[] {
    const lowerQuery = query.toLowerCase();
    return this.media.filter(item => {
      // Suche im Titel (alle Medientypen)
      if (item.title.toLowerCase().includes(lowerQuery)) return true;

      // Typspezifische Suche mit instanceof
      if (item instanceof Book) {
        return item.author.toLowerCase().includes(lowerQuery);
      }
      if (item instanceof DVD) {
        return item.director.toLowerCase().includes(lowerQuery);
      }
      if (item instanceof Magazine) {
        return item.publisher.toLowerCase().includes(lowerQuery);
      }

      return false;
    });
  }

  borrowMedia(id: string, memberName: string): void {
    const item = this.findById(id);
    if (!item) {
      throw new Error(`Medium mit ID '${id}' nicht gefunden`);
    }
    item.borrow(memberName);
  }

  returnMedia(id: string): void {
    const item = this.findById(id);
    if (!item) {
      throw new Error(`Medium mit ID '${id}' nicht gefunden`);
    }
    item.returnItem();
  }

  getAvailableMedia(): Media[] {
    return this.media.filter(m => m.isAvailable);
  }

  getBorrowedMedia(): Media[] {
    return this.media.filter(m => !m.isAvailable);
  }

  // Polymorphie in Aktion: getInfo() liefert je nach konkretem Typ andere Ausgaben
  listAll(): void {
    console.log(`\n📚 ${this.name} — Bestand (${this.media.length} Medien):`);
    console.log("─".repeat(70));
    this.media.forEach(item => console.log(item.getInfo()));
    console.log("─".repeat(70));
  }
}


// ============================================================
// Demonstration
// ============================================================

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
