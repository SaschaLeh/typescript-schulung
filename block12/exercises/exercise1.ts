/**
 * Exercise 1: Interfaces & Type Guards
 *
 * In dieser Übung definierst du die Grundbausteine der Quiz-App:
 * Union Types, Interfaces und Type Guards.
 * Diese Konzepte kennst du bereits aus Block 9.
 */

// Task 1: Definiere einen Union Type "AnswerType"
// Eine Antwort kann ein string, eine number oder ein boolean sein.
// Beispiel: "Paris" (string), 42 (number), true (boolean)
export type AnswerType = unknown; // Ersetze "unknown" durch den richtigen Union Type

// Task 2: Vervollständige das Interface "Question"
// Eine Frage hat folgende Eigenschaften:
// - id: string
// - text: string
// - points: number
// - category: string
// - checkAnswer(answer: AnswerType): boolean  (Methode die prüft ob eine Antwort korrekt ist)
export interface Question {
  // Füge die Eigenschaften hier ein
}

// Task 3: Implementiere den Type Guard "isTextAnswer"
// Die Funktion prüft, ob eine Antwort vom Typ string ist.
// Hinweis: Verwende typeof
export function isTextAnswer(answer: unknown): answer is string {
  // Implementiere diese Funktion
  return null as any; // Ersetze diese Zeile
}

// Task 4: Implementiere den Type Guard "isNumericAnswer"
// Die Funktion prüft, ob eine Antwort vom Typ number ist.
// Hinweis: Verwende typeof
export function isNumericAnswer(answer: unknown): answer is number {
  // Implementiere diese Funktion
  return null as any; // Ersetze diese Zeile
}

// Task 5: Implementiere die Funktion "formatAnswer"
// Die Funktion nimmt eine AnswerType-Antwort und gibt einen formatierten String zurück:
// - string  → 'Antwort: "text"'     (mit Anführungszeichen)
// - number  → "Antwort: 42"
// - boolean → "Antwort: Ja" oder "Antwort: Nein"
// Hinweis: Verwende typeof für Type Narrowing
export function formatAnswer(answer: AnswerType): string {
  // Implementiere diese Funktion
  return null as any; // Ersetze diese Zeile
}

// === Tests ===
// Entkommentiere den gesamten Block wenn du fertig bist, um deine Lösung zu testen:
/*
function testExercise1() {
  console.log("=== Exercise 1: Interfaces & Type Guards ===\n");

  // Test Task 1 & 2
  const sampleQuestion: Question = {
    id: "q1",
    text: "Was ist die Hauptstadt von Frankreich?",
    points: 1,
    category: "Geografie",
    checkAnswer: (answer: AnswerType) => answer === "Paris",
  };
  console.log("Frage:", sampleQuestion.text);
  console.log("Punkte:", sampleQuestion.points);
  console.log("Korrekt ('Paris'):", sampleQuestion.checkAnswer("Paris")); // true
  console.log("Korrekt ('Berlin'):", sampleQuestion.checkAnswer("Berlin")); // false

  // Test Task 3 & 4
  console.log("\nType Guards:");
  console.log('isTextAnswer("hello"):', isTextAnswer("hello")); // true
  console.log("isTextAnswer(42):", isTextAnswer(42)); // false
  console.log("isNumericAnswer(42):", isNumericAnswer(42)); // true
  console.log('isNumericAnswer("hello"):', isNumericAnswer("hello")); // false

  // Test Task 5
  console.log("\nformatAnswer:");
  console.log(formatAnswer("Paris")); // Antwort: "Paris"
  console.log(formatAnswer(42)); // Antwort: 42
  console.log(formatAnswer(true)); // Antwort: Ja
  console.log(formatAnswer(false)); // Antwort: Nein
}

testExercise1();
*/
