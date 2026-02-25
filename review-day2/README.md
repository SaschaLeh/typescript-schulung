# Wiederholungsübung Tag 2: Bibliotheks-Verwaltungssystem

## Ziel

Diese Übung festigt alle OOP-Konzepte von Tag 2 in einem zusammenhängenden Szenario.

## Abgedeckte Konzepte

| Konzept | Block | Was geübt wird |
|---------|-------|-----------------|
| Objekt-Literale | Block 5 | Medien-Objekte erstellen und nutzen |
| Interfaces | Block 6 | `IMedia`, `IBorrowable`, `IPrintable` definieren |
| Klassen | Block 7 | Abstrakte Basisklasse, Konstruktoren, Getter |
| Vererbung & Polymorphie | Block 8 | `Book`, `DVD`, `Magazine` erweitern `Media` |

## Szenario

Du baust ein Verwaltungssystem für eine Stadtbibliothek:

- **Medien** (Bücher, DVDs, Magazine) haben gemeinsame Eigenschaften und typspezifische Details
- Medien können **ausgeliehen** und **zurückgegeben** werden
- Die **Bibliothek** verwaltet den Bestand mit Suche und Ausleihe
- **Polymorphie** sorgt dafür, dass `getInfo()` je nach Medientyp andere Ausgaben liefert

## Aufbau der Übung

Die Übung ist in 4 Teile gegliedert (9 TODOs):

1. **Enums & Interfaces** (TODO 1–4) — Typen und Strukturen definieren
2. **Abstrakte Basisklasse** (TODO 5) — Gemeinsame Logik in `Media`
3. **Konkrete Klassen** (TODO 6–8) — `Book`, `DVD`, `Magazine` mit Vererbung
4. **Verwaltungsklasse** (TODO 9) — `Library` mit Suche, Ausleihe und Polymorphie

## Starten

```bash
# Übungsdatei öffnen und die TODOs bearbeiten:
code review-day2/exercises/bibliothek.ts

# Kompilieren:
npm run build:review-day2

# Ausführen (nach dem Entkommentieren des Demoblocks):
npm start -- review-day2/exercises/bibliothek.ts
```

## Tipps

- Arbeite die TODOs **der Reihe nach** durch — sie bauen aufeinander auf
- Nutze `protected` statt `private` bei Properties, die Subklassen brauchen
- Die `search()`-Methode in `Library` ist eine gute Gelegenheit, `instanceof` zu üben
- Entkommentiere den Testcode am Ende schrittweise, um deine Lösung zu prüfen
