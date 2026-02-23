# Block 16: Generische Storage-Klasse — Exercises

## Exercise 1: generic-storage.ts

Implementiere eine vollständige, generische `DataStorage<T>`-Klasse, die als typsicherer Datenspeicher funktioniert.

### Anforderungen

Die Klasse soll intern eine `Map<string, T>` verwenden und folgende Methoden bereitstellen:

| Methode | Beschreibung |
|---------|-------------|
| `add(key, value)` | Fügt ein Element hinzu |
| `get(key)` | Gibt ein Element zurück oder `undefined` |
| `getAll()` | Gibt alle Werte als Array zurück |
| `has(key)` | Prüft ob ein Key existiert |
| `delete(key)` | Entfernt ein Element, gibt `true` zurück wenn es existierte |
| `clear()` | Entfernt alle Elemente |
| `size` (Getter) | Gibt die Anzahl der Elemente zurück |
| `find(predicate)` | Sucht das erste passende Element |
| `filter(predicate)` | Gibt alle passenden Elemente zurück |

### Lernziele

- Generics in Klassen anwenden (`class DataStorage<T>`)
- `Map<string, T>` als interne Datenstruktur nutzen
- Higher-Order-Funktionen mit Predicate-Pattern
- Getter als berechnete Properties
- Typsichere Wiederverwendbarkeit demonstrieren

### Testen

Entkommentiere den Demo-Code am Ende der Datei, um deine Implementierung zu testen:

```bash
npx ts-node block16/exercises/generic-storage.ts
```

Die Lösung findest du in `/solutions/generic-storage.ts`.
