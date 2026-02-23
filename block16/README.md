# Block 16: Generische Storage-Klasse

Aufbauend auf den Generics-Grundlagen aus Block 10 wird hier eine vollständige, generische `DataStorage<T>`-Klasse entwickelt. Der Fokus liegt auf der praktischen Anwendung von Generics mit `Map<string, T>`, Predicate-Funktionen und typensicheren CRUD-Operationen.

## Examples

1. **storage-demo.ts**
   - Generischer `Container<T>` als Einstieg
   - `Map<string, T>` als typsichere Datenstruktur
   - Higher-Order-Funktionen mit generischen Prädikaten
   - Praktische Anwendung: `Container<User>`, `Container<Product>`, `Container<number>`

## Exercises

The `/exercises` folder contains practice exercises:

1. **generic-storage.ts** - Implementiere eine vollständige `DataStorage<T>`-Klasse mit CRUD-Operationen, Suche und Filterung

Solutions can be found in the `/solutions` folder.

## How to Run

```bash
# Beispiel ausführen
npx ts-node block16/storage-demo.ts

# Lösung ausführen
npx ts-node block16/solutions/generic-storage.ts

# Block kompilieren
npm run build:block16
```
