/**
 * Solution 2: Klassen & Generics
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

// Task 1: MultipleChoiceQuestion
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
    if (typeof answer !== "number") {
      return false;
    }
    return answer === this.correctOption;
  }

  getOptions(): string[] {
    return [...this.options];
  }
}

// Task 2: TrueFalseQuestion
export class TrueFalseQuestion implements Question {
  constructor(
    public id: string,
    public text: string,
    private correctAnswer: boolean,
    public points: number = 1,
    public category: string = "Allgemein"
  ) {}

  checkAnswer(answer: AnswerType): boolean {
    if (typeof answer !== "boolean") {
      return false;
    }
    return answer === this.correctAnswer;
  }
}

// Task 3: TextQuestion
export class TextQuestion implements Question {
  constructor(
    public id: string,
    public text: string,
    private correctAnswer: string,
    public points: number = 1,
    public category: string = "Allgemein"
  ) {}

  checkAnswer(answer: AnswerType): boolean {
    if (typeof answer !== "string") {
      return false;
    }
    return answer.toLowerCase() === this.correctAnswer.toLowerCase();
  }
}

// Task 4: filterByCategory
export function filterByCategory<T extends Question>(
  questions: T[],
  category: string
): T[] {
  return questions.filter((q) => q.category === category);
}

// Task 5: findById
export function findById<T extends { id: string }>(
  items: T[],
  id: string
): T | undefined {
  return items.find((item) => item.id === id);
}

// === Tests ===
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
