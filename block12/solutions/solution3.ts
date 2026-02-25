/**
 * Solution 3: Error Handling
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

// Task 1: QuizError
export class QuizError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "QuizError";
    Object.setPrototypeOf(this, QuizError.prototype);
  }
}

// Task 2: QuestionNotFoundError
export class QuestionNotFoundError extends QuizError {
  constructor(questionId: string) {
    super(`Frage mit ID "${questionId}" nicht gefunden`);
    this.name = "QuestionNotFoundError";
    Object.setPrototypeOf(this, QuestionNotFoundError.prototype);
  }
}

// Task 3: EmptyQuizError
export class EmptyQuizError extends QuizError {
  constructor() {
    super("Das Quiz enthält keine Fragen");
    this.name = "EmptyQuizError";
    Object.setPrototypeOf(this, EmptyQuizError.prototype);
  }
}

// Task 4: isQuizError
export function isQuizError(error: unknown): error is QuizError {
  return error instanceof QuizError;
}

// Task 5: safeGetQuestion
export function safeGetQuestion(
  questions: Question[],
  id: string
): Question {
  const question = questions.find((q) => q.id === id);
  if (!question) {
    throw new QuestionNotFoundError(id);
  }
  return question;
}

// === Tests ===
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
