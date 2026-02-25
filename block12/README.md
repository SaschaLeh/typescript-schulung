# Block 12: Quiz Application Mini-Project

In diesem Block wendest du die Konzepte aus Block 9-11 praktisch an, indem du Teile einer Quiz-Anwendung selbst implementierst.

## Exercises

Im `exercises/`-Ordner findest du drei aufbauende Übungen:

1. **Exercise 1: Interfaces & Type Guards** (Block 9)
   - Union Types, Interfaces und Type Guards definieren

2. **Exercise 2: Klassen & Generics** (Block 9 + 10)
   - Frage-Klassen implementieren, generische Funktionen schreiben

3. **Exercise 3: Error Handling** (Block 11)
   - Custom Error-Klassen und sichere Fehlerbehandlung

```bash
npx ts-node block12/exercises/exercise1.ts
npx ts-node block12/exercises/exercise2.ts
npx ts-node block12/exercises/exercise3.ts
```

Die Lösungen findest du im `solutions/`-Ordner.

## Referenzcode

Die fertige Quiz-Anwendung liegt in `models/`, `utils/` und `index.ts` als Referenz. Du kannst dir den Code ansehen, um zu verstehen wie alles zusammenspielt:

```
block12/
├── exercises/         ← Hier arbeitest du
│   ├── exercise1.ts
│   ├── exercise2.ts
│   └── exercise3.ts
├── solutions/         ← Lösungen zum Vergleich
│   ├── solution1.ts
│   ├── solution2.ts
│   └── solution3.ts
├── models/            ← Referenzcode (fertige Implementierung)
│   ├── question.ts
│   ├── quiz.ts
│   └── quiz-builder.ts
├── utils/
│   └── errors.ts
└── index.ts
```

### Referenzcode ausführen

```bash
npx ts-node block12/index.ts
```

## Gelernte Konzepte

- **Block 9:** Union Types, Type Guards, Type Narrowing, `typeof`, `instanceof`
- **Block 10:** Generics, Type Constraints (`extends`), generische Funktionen
- **Block 11:** Custom Error-Klassen, `try/catch`, Type Guards für Errors
