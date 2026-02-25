/**
 * Exercise 3: Error Handling
 *
 * In dieser Übung erstellst du eine Error-Hierarchie für die Quiz-App
 * und implementierst sichere Fehlerbehandlung mit try/catch.
 * Diese Konzepte kennst du aus Block 11.
 */

// --- Vorgegeben: Question-Interface aus den vorherigen Übungen ---

export type AnswerType = string | number | boolean;

export interface Question {
  id: string;
  text: string;
  points: number;
  category: string;
  checkAnswer(answer: AnswerType): boolean;
}

// Task 1: Implementiere die Basis-Klasse "QuizError"
// Die Klasse erweitert Error und setzt:
// - this.name auf "QuizError"
// - Den Prototyp korrekt (Object.setPrototypeOf)
// Hinweis: Der Constructor nimmt einen message-Parameter (string)
export class QuizError extends Error {
  constructor(message: string) {
    // Implementiere den Constructor
    // 1. Rufe super(message) auf
    // 2. Setze this.name = "QuizError"
    // 3. Setze Object.setPrototypeOf(this, QuizError.prototype)
    super(); // Ersetze diese Zeile
  }
}

// Task 2: Implementiere "QuestionNotFoundError"
// Die Klasse erweitert QuizError.
// Der Constructor nimmt eine questionId (string) und erzeugt die Nachricht:
// `Frage mit ID "${questionId}" nicht gefunden`
// Setze this.name auf "QuestionNotFoundError"
export class QuestionNotFoundError extends QuizError {
  constructor(questionId: string) {
    // Implementiere den Constructor
    super(""); // Ersetze diese Zeile
  }
}

// Task 3: Implementiere "EmptyQuizError"
// Die Klasse erweitert QuizError.
// Der Constructor nimmt keine Parameter und erzeugt die feste Nachricht:
// "Das Quiz enthält keine Fragen"
// Setze this.name auf "EmptyQuizError"
export class EmptyQuizError extends QuizError {
  constructor() {
    // Implementiere den Constructor
    super(""); // Ersetze diese Zeile
  }
}

// Task 4: Implementiere den Type Guard "isQuizError"
// Die Funktion prüft, ob ein unbekannter Wert eine Instanz von QuizError ist.
// Hinweis: Verwende instanceof
export function isQuizError(error: unknown): error is QuizError {
  // Implementiere diese Funktion
  return null as any; // Ersetze diese Zeile
}

// Task 5: Implementiere die Funktion "safeGetQuestion"
// Die Funktion sucht eine Frage anhand ihrer ID in einem Array.
// - Wenn die Frage gefunden wird, gib sie zurück.
// - Wenn sie NICHT gefunden wird, wirf einen QuestionNotFoundError.
// Hinweis: Verwende Array.find() und wirf mit "throw new QuestionNotFoundError(id)"
export function safeGetQuestion(
  questions: Question[],
  id: string
): Question {
  // Implementiere diese Funktion
  return null as any; // Ersetze diese Zeile
}

// === Tests ===
// Entkommentiere den gesamten Block wenn du fertig bist, um deine Lösung zu testen:
/*
function testExercise3() {
  console.log("=== Exercise 3: Error Handling ===\n");

  // Test Task 1: QuizError
  const quizError = new QuizError("Testfehler");
  console.log("QuizError name:", quizError.name); // QuizError
  console.log("QuizError message:", quizError.message); // Testfehler
  console.log("ist Error:", quizError instanceof Error); // true

  // Test Task 2: QuestionNotFoundError
  const notFoundError = new QuestionNotFoundError("q99");
  console.log("\nQuestionNotFoundError name:", notFoundError.name); // QuestionNotFoundError
  console.log("Message:", notFoundError.message); // Frage mit ID "q99" nicht gefunden
  console.log("ist QuizError:", notFoundError instanceof QuizError); // true

  // Test Task 3: EmptyQuizError
  const emptyError = new EmptyQuizError();
  console.log("\nEmptyQuizError name:", emptyError.name); // EmptyQuizError
  console.log("Message:", emptyError.message); // Das Quiz enthält keine Fragen

  // Test Task 4: isQuizError
  console.log("\nisQuizError:");
  console.log("QuizError:", isQuizError(quizError)); // true
  console.log("QuestionNotFoundError:", isQuizError(notFoundError)); // true
  console.log("normaler Error:", isQuizError(new Error("test"))); // false
  console.log("string:", isQuizError("fehler")); // false

  // Test Task 5: safeGetQuestion
  const questions: Question[] = [
    {
      id: "q1",
      text: "Testfrage",
      points: 1,
      category: "Test",
      checkAnswer: () => true,
    },
  ];

  console.log("\nsafeGetQuestion:");
  const found = safeGetQuestion(questions, "q1");
  console.log("Gefunden:", found.text); // Testfrage

  try {
    safeGetQuestion(questions, "q99");
  } catch (error) {
    if (isQuizError(error)) {
      console.log("Fehler abgefangen:", error.message); // Frage mit ID "q99" nicht gefunden
      console.log("Fehler-Typ:", error.name); // QuestionNotFoundError
    }
  }
}

testExercise3();
*/
