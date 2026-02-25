/**
 * Exercise 2: Klassen & Generics
 *
 * In dieser Übung implementierst du Frage-Klassen, die das Question-Interface
 * umsetzen, und schreibst generische Hilfsfunktionen.
 * Diese Konzepte kennst du aus Block 9 (Interfaces) und Block 10 (Generics).
 */

// --- Vorgegeben: Interface und Typen aus Exercise 1 ---

export type AnswerType = string | number | boolean;

export interface Question {
  id: string;
  text: string;
  points: number;
  category: string;
  checkAnswer(answer: AnswerType): boolean;
}

// Task 1: Implementiere die Methode "checkAnswer" der MultipleChoiceQuestion-Klasse
// Die Methode soll prüfen ob die übergebene Antwort (number) dem correctOption-Index entspricht.
// Wenn die Antwort keine number ist, soll false zurückgegeben werden.
export class MultipleChoiceQuestion implements Question {
  constructor(
    public id: string,
    public text: string,
    public options: string[],
    private correctOption: number,
    public points: number = 1,
    public category: string = "Allgemein"
  ) {}

  checkAnswer(answer: AnswerType): boolean {
    // Implementiere diese Methode
    // Hinweis: Prüfe zuerst mit typeof ob answer eine number ist
    return null as any; // Ersetze diese Zeile
  }

  getOptions(): string[] {
    return [...this.options];
  }
}

// Task 2: Implementiere die Methode "checkAnswer" der TrueFalseQuestion-Klasse
// Die Methode soll prüfen ob die übergebene Antwort (boolean) der correctAnswer entspricht.
// Wenn die Antwort kein boolean ist, soll false zurückgegeben werden.
export class TrueFalseQuestion implements Question {
  constructor(
    public id: string,
    public text: string,
    private correctAnswer: boolean,
    public points: number = 1,
    public category: string = "Allgemein"
  ) {}

  checkAnswer(answer: AnswerType): boolean {
    // Implementiere diese Methode
    // Hinweis: Prüfe zuerst mit typeof ob answer ein boolean ist
    return null as any; // Ersetze diese Zeile
  }
}

// Task 3: Implementiere die Methode "checkAnswer" der TextQuestion-Klasse
// Die Methode soll prüfen ob die übergebene Antwort (string) der correctAnswer entspricht.
// Der Vergleich soll NICHT case-sensitive sein (d.h. "Paris" === "paris").
// Wenn die Antwort kein string ist, soll false zurückgegeben werden.
// Hinweis: Verwende .toLowerCase() für den Vergleich
export class TextQuestion implements Question {
  constructor(
    public id: string,
    public text: string,
    private correctAnswer: string,
    public points: number = 1,
    public category: string = "Allgemein"
  ) {}

  checkAnswer(answer: AnswerType): boolean {
    // Implementiere diese Methode
    return null as any; // Ersetze diese Zeile
  }
}

// Task 4: Implementiere die generische Funktion "filterByCategory"
// Die Funktion filtert ein Array von Fragen nach einer bestimmten Kategorie.
// Der generische Typ T muss das Question-Interface erweitern (T extends Question).
// Beispiel: filterByCategory(questions, "Geografie") → nur Geografie-Fragen
export function filterByCategory<T extends Question>(
  questions: T[],
  category: string
): T[] {
  // Implementiere diese Funktion
  // Hinweis: Verwende die Array-Methode .filter()
  return null as any; // Ersetze diese Zeile
}

// Task 5: Implementiere die generische Funktion "findById"
// Die Funktion sucht in einem Array nach einem Element mit einer bestimmten id.
// Der generische Typ T muss ein Objekt mit einer id-Eigenschaft sein.
// Gibt das gefundene Element zurück oder undefined.
export function findById<T extends { id: string }>(
  items: T[],
  id: string
): T | undefined {
  // Implementiere diese Funktion
  // Hinweis: Verwende die Array-Methode .find()
  return null as any; // Ersetze diese Zeile
}

// === Tests ===
// Entkommentiere den gesamten Block wenn du fertig bist, um deine Lösung zu testen:
/*
function testExercise2() {
  console.log("=== Exercise 2: Klassen & Generics ===\n");

  // Test Task 1: MultipleChoiceQuestion
  const mcQuestion = new MultipleChoiceQuestion(
    "q1",
    "Was ist die Hauptstadt von Frankreich?",
    ["London", "Berlin", "Paris", "Madrid"],
    2,
    1,
    "Geografie"
  );
  console.log("Multiple Choice:");
  console.log("Optionen:", mcQuestion.getOptions());
  console.log("Antwort 2 (Paris):", mcQuestion.checkAnswer(2)); // true
  console.log("Antwort 0 (London):", mcQuestion.checkAnswer(0)); // false
  console.log('Antwort "Paris":', mcQuestion.checkAnswer("Paris")); // false (kein number)

  // Test Task 2: TrueFalseQuestion
  const tfQuestion = new TrueFalseQuestion(
    "q2",
    "TypeScript ist eine Obermenge von JavaScript.",
    true,
    1,
    "Programmierung"
  );
  console.log("\nTrue/False:");
  console.log("Antwort true:", tfQuestion.checkAnswer(true)); // true
  console.log("Antwort false:", tfQuestion.checkAnswer(false)); // false

  // Test Task 3: TextQuestion
  const textQuestion = new TextQuestion(
    "q3",
    "Wie heißt die Hauptstadt von Deutschland?",
    "Berlin",
    2,
    "Geografie"
  );
  console.log("\nText:");
  console.log('Antwort "Berlin":', textQuestion.checkAnswer("Berlin")); // true
  console.log('Antwort "berlin":', textQuestion.checkAnswer("berlin")); // true (case-insensitive)
  console.log('Antwort "München":', textQuestion.checkAnswer("München")); // false

  // Test Task 4: filterByCategory
  const allQuestions: Question[] = [mcQuestion, tfQuestion, textQuestion];
  const geoQuestions = filterByCategory(allQuestions, "Geografie");
  console.log("\nfilterByCategory('Geografie'):");
  console.log("Anzahl:", geoQuestions.length); // 2
  console.log(
    "Fragen:",
    geoQuestions.map((q) => q.text)
  );

  // Test Task 5: findById
  const found = findById(allQuestions, "q2");
  console.log("\nfindById('q2'):");
  console.log("Gefunden:", found?.text); // TypeScript ist eine Obermenge von JavaScript.
  const notFound = findById(allQuestions, "q99");
  console.log("findById('q99'):", notFound); // undefined
}

testExercise2();
*/
