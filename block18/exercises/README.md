# Angular-Konzepte Exercises

Dieses Verzeichnis enthält eine umfassende Übung, die alle drei Angular-Konzepte kombiniert:

1. **todo-app.ts** - Todo-App mit Signals, Dependency Injection und Lifecycle Hooks
   - `TodoItem` Interface definieren
   - `StorageService` für Persistenz implementieren
   - `TodoService` mit Constructor Injection erstellen
   - Signals für reaktiven State nutzen (todos, filter, filteredTodos, todoCount)
   - CRUD-Operationen implementieren (add, toggle, delete, filter)
   - Lifecycle: init() lädt aus Storage, destroy() speichert

Die Übung baut auf den drei Beispieldateien auf:
- `signals.ts` — signal(), computed(), effect()
- `dependency-injection.ts` — DI-Container, Constructor Injection
- `component-lifecycle.ts` — OnInit, OnDestroy, OnChanges

Complete the exercise by following the TODO instructions in the comments.
Check your solution against the provided solution file.

Run the exercise with:
```bash
npx ts-node block18/exercises/todo-app.ts
```
