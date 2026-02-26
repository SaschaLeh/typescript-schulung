# Wiederholungsübung Tag 3: Ticket-Buchungssystem

## Ziel

Diese Übung festigt alle Advanced-TypeScript-Konzepte von Tag 3 in einem zusammenhängenden Szenario.

## Abgedeckte Konzepte

| Konzept | Block | Was geübt wird |
|---------|-------|-----------------|
| Union Types | Block 9 | Discriminated Unions, switch mit exhaustive checking |
| Generics | Block 10/16 | Generische Klasse mit Constraint, Map-basiertes Repository |
| Async/Await | Block 15 | Promises, simulierte API-Calls, try/catch |

## Szenario

Du baust ein Ticket-Buchungssystem für Veranstaltungen:

- **Events** (Konzerte, Workshops, Konferenzen) werden als Discriminated Union modelliert
- Ein generisches **Repository** speichert und verwaltet Events mit CRUD-Operationen
- **Async Funktionen** simulieren API-Calls zum Laden von Events und Verarbeiten von Zahlungen
- **try/catch** fängt Fehler bei der Buchung ab

## Aufbau der Übung

Die Übung ist in 3 Teile gegliedert (5 TODOs):

1. **Union Types & Discriminated Unions** (TODO 1–2) — Event-Typen, switch mit exhaustive checking
2. **Generics** (TODO 3) — Generische Repository-Klasse mit Map
3. **Async/Await** (TODO 4–5) — Simulierte API-Calls und Buchungslogik mit try/catch

## Starten

```bash
# Übungsdatei öffnen und die TODOs bearbeiten:
code review-day3/exercises/ticket-system.ts

# Kompilieren:
npm run build:review-day3

# Ausführen (nach dem Entkommentieren des Demoblocks):
npm start -- review-day3/exercises/ticket-system.ts
```

## Tipps

- Arbeite die TODOs **der Reihe nach** durch — sie bauen aufeinander auf
- Bei Teil 1: Denke an die `kind`-Property als Diskriminante für den Union Type
- Bei Teil 2: Der Constraint `T extends { id: number }` stellt sicher, dass jedes Element eine ID hat
- Bei Teil 3: Nutze `await` für sequentielle Operationen und `{...obj}` (Spread) zum Kopieren von Events
- Entkommentiere den Testcode am Ende schrittweise, um deine Lösung zu prüfen
