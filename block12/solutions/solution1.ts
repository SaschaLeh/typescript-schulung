/**
 * Solution 1: Interfaces & Type Guards
 */

// Task 1: Union Type "AnswerType"
export type AnswerType = string | number | boolean;

// Task 2: Interface "Question"
export interface Question {
  id: string;
  text: string;
  points: number;
  category: string;
  checkAnswer(answer: AnswerType): boolean;
}

// Task 3: Type Guard "isTextAnswer"
export function isTextAnswer(answer: unknown): answer is string {
  return typeof answer === "string";
}

// Task 4: Type Guard "isNumericAnswer"
export function isNumericAnswer(answer: unknown): answer is number {
  return typeof answer === "number";
}

// Task 5: Funktion "formatAnswer"
export function formatAnswer(answer: AnswerType): string {
  if (typeof answer === "string") {
    return `Antwort: "${answer}"`;
  } else if (typeof answer === "number") {
    return `Antwort: ${answer}`;
  } else {
    return `Antwort: ${answer ? "Ja" : "Nein"}`;
  }
}

// === Tests ===
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
