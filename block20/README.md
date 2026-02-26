# Block 20: Abschlussaufgabe — Angular Todo-App

## Ziel

Erstelle eine vollständige **Todo-Anwendung** mit Angular. Diese Aufgabe bringt alle Konzepte des Workshops zusammen: TypeScript-Typen, Interfaces, Services, Komponenten und Signals.

## Voraussetzungen

- Node.js und npm installiert
- Angular CLI installiert (`npm install -g @angular/cli`)

## Schritt 1: Projekt erstellen

Erstelle ein neues Angular-Projekt mit der Angular CLI:

```bash
ng new todo-app --style=scss --ssr=false
cd todo-app
```

Starte den Entwicklungsserver, um deine Fortschritte live zu sehen:

```bash
ng serve
```

Die App ist unter `http://localhost:4200` erreichbar.

---

## Schritt 2: Todo-Model erstellen

Erstelle eine Datei für das Todo-Interface:

```bash
ng generate interface models/todo
```

**Datei:** `src/app/models/todo.ts`

Definiere ein `Todo`-Interface mit folgenden Properties:

| Property      | Typ       | Beschreibung                     |
|---------------|-----------|----------------------------------|
| `id`          | `number`  | Eindeutige ID                    |
| `title`       | `string`  | Beschreibung der Aufgabe         |
| `completed`   | `boolean` | Erledigt-Status                  |
| `createdAt`   | `Date`    | Erstellungsdatum                 |

---

## Schritt 3: TodoService erstellen

Erstelle einen Service, der den gesamten State und die Logik verwaltet:

```bash
ng generate service services/todo
```

**Datei:** `src/app/services/todo.service.ts`

### State (als Signals)

Nutze Angular Signals für den reaktiven State:

- `todos` — ein `signal<Todo[]>([])` das alle Todos enthält
- `filter` — ein `signal<'all' | 'active' | 'completed'>('all')` für den aktuellen Filter
- `filteredTodos` — ein `computed()` das die Todos basierend auf dem Filter zurückgibt
- `remainingCount` — ein `computed()` das die Anzahl der nicht erledigten Todos zurückgibt

### Methoden

Implementiere folgende Methoden:

| Methode                                  | Beschreibung                                                    |
|------------------------------------------|-----------------------------------------------------------------|
| `addTodo(title: string): void`           | Neues Todo hinzufügen (mit `Date.now()` als ID)                |
| `toggleTodo(id: number): void`           | `completed`-Status eines Todos umschalten                       |
| `removeTodo(id: number): void`           | Ein Todo nach ID entfernen                                      |
| `updateTodoTitle(id: number, title: string): void` | Den Titel eines Todos aktualisieren                  |
| `setFilter(filter: 'all' \| 'active' \| 'completed'): void` | Den aktiven Filter setzen              |
| `clearCompleted(): void`                 | Alle erledigten Todos entfernen                                 |

> **Tipp:** Verwende `.update()` auf dem Signal mit `.map()` und `.filter()` um den State immutable zu aktualisieren.

---

## Schritt 4: Komponenten erstellen

Erstelle die folgenden Komponenten:

```bash
ng generate component components/todo-input
ng generate component components/todo-item
ng generate component components/todo-list
ng generate component components/todo-footer
```

### Komponentenstruktur

```
AppComponent
├── TodoInputComponent        ← Eingabefeld für neue Todos
├── TodoListComponent         ← Liste der Todos
│   └── TodoItemComponent     ← Einzelnes Todo (wird pro Todo wiederholt)
└── TodoFooterComponent       ← Filter-Buttons und Zähler
```

---

## Schritt 5: `TodoInputComponent`

**Datei:** `src/app/components/todo-input/todo-input.component.ts`

### Aufgabe

- Ein Textfeld (`<input>`) in dem der Benutzer einen neuen Todo-Titel eingibt
- Bei **Enter** wird `TodoService.addTodo()` aufgerufen
- Nach dem Hinzufügen wird das Eingabefeld geleert
- Leere Eingaben (nur Leerzeichen) werden ignoriert

### Hinweise

- Injiziere den `TodoService` mit `inject(TodoService)`
- Nutze `(keyup.enter)` für das Enter-Event
- Verwende eine Template-Variable (`#inputField`) oder ein `signal<string>` für den Input-Wert

---

## Schritt 6: `TodoItemComponent`

**Datei:** `src/app/components/todo-item/todo-item.component.ts`

### Aufgabe

- Empfängt ein einzelnes `Todo`-Objekt als **Input** (`input<Todo>()`)
- Zeigt eine Checkbox und den Todo-Titel an
- Die Checkbox spiegelt den `completed`-Status wider
- Bei Klick auf die Checkbox wird `TodoService.toggleTodo()` aufgerufen
- Ein Löschen-Button (z.B. "X") ruft `TodoService.removeTodo()` auf
- Erledigte Todos werden visuell durchgestrichen (`text-decoration: line-through`)

### Hinweise

- Nutze `[class.completed]="todo().completed"` für bedingtes Styling
- Nutze `[checked]="todo().completed"` für die Checkbox

---

## Schritt 7: `TodoListComponent`

**Datei:** `src/app/components/todo-list/todo-list.component.ts`

### Aufgabe

- Liest `filteredTodos` aus dem `TodoService`
- Rendert eine `<app-todo-item>` Komponente für jedes Todo
- Zeigt eine Nachricht an, wenn keine Todos vorhanden sind (z.B. "Keine Aufgaben vorhanden")

### Hinweise

- Nutze `@for` um über die Todos zu iterieren:
  ```html
  @for (todo of filteredTodos(); track todo.id) {
    <app-todo-item [todo]="todo" />
  }
  ```
- Nutze `@empty` um den leeren Zustand anzuzeigen:
  ```html
  @for (todo of filteredTodos(); track todo.id) {
    <app-todo-item [todo]="todo" />
  } @empty {
    <p>Keine Aufgaben vorhanden</p>
  }
  ```

---

## Schritt 8: `TodoFooterComponent`

**Datei:** `src/app/components/todo-footer/todo-footer.component.ts`

### Aufgabe

- Zeigt die Anzahl der verbleibenden (nicht erledigten) Todos an
- Bietet drei Filter-Buttons: **Alle**, **Aktiv**, **Erledigt**
- Der aktive Filter-Button wird hervorgehoben
- Ein Button "Erledigte löschen" ruft `TodoService.clearCompleted()` auf

### Hinweise

- Nutze `remainingCount()` aus dem Service für den Zähler
- Nutze `[class.active]="filter() === 'all'"` um den aktiven Filter zu markieren

---

## Schritt 9: `AppComponent` zusammenbauen

**Datei:** `src/app/app.component.ts`

### Aufgabe

Baue die Komponenten im Template zusammen:

```html
<div class="todo-app">
  <h1>Angular Todo App</h1>
  <app-todo-input />
  <app-todo-list />
  <app-todo-footer />
</div>
```

### Hinweise

- Importiere alle Kindkomponenten im `imports`-Array der `AppComponent`
- Entferne den generierten Standard-Inhalt aus dem Template

---

## Schritt 10: Styling (optional)

Füge grundlegendes Styling hinzu, damit die App ansprechend aussieht.

**Datei:** `src/styles.scss` (globale Styles)

Vorschläge:

- Zentriere die App mit `max-width: 600px` und `margin: 0 auto`
- Gib dem Eingabefeld die volle Breite
- Style die Todo-Items als Zeilen mit Checkbox, Text und Löschen-Button
- Durchgestrichener Text für erledigte Todos
- Hervorhebung des aktiven Filter-Buttons

---

## Erwartetes Ergebnis

Die fertige App soll folgende Funktionen haben:

- [ ] Neue Todos per Enter-Taste hinzufügen
- [ ] Todos als erledigt markieren (Checkbox)
- [ ] Einzelne Todos löschen
- [ ] Filtern nach: Alle / Aktiv / Erledigt
- [ ] Anzeige der verbleibenden Aufgaben
- [ ] Alle erledigten Todos auf einmal löschen
- [ ] Erledigte Todos werden durchgestrichen dargestellt

---

## Bonus-Aufgaben (wenn Zeit bleibt)

1. **LocalStorage-Persistenz:** Speichere die Todos im `localStorage` und lade sie beim App-Start. Nutze dafür einen `effect()` im Service.

2. **Inline-Editing:** Doppelklick auf einen Todo-Titel aktiviert ein Eingabefeld zur Bearbeitung. Bei Enter oder Fokusverlust wird der neue Titel gespeichert.

3. **Animationen:** Füge Fade-In/Fade-Out Animationen hinzu wenn Todos hinzugefügt oder entfernt werden (Angular `@angular/animations`).
