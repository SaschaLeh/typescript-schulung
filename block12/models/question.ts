// Define the base Question interface
export interface Question {
  id: string;
  text: string;
  points: number;
  category: string;
  checkAnswer(answer: unknown): boolean;
  getCorrectAnswer(): unknown;
}

// Multiple choice question implementation
export class MultipleChoiceQuestion implements Question {
  id: string;
  text: string;
  points: number;
  category: string;
  private options: string[];
  private correctOption: number;

  constructor(
    id: string,
    text: string,
    options: string[],
    correctOption: number,
    points: number = 1,
    category: string = 'General'
  ) {
    if (options.length < 2) {
      throw new Error('Multiple choice questions must have at least 2 options');
    }
    if (correctOption < 0 || correctOption >= options.length) {
      throw new Error(`Correct option index must be between 0 and ${options.length - 1}`);
    }

    this.id = id;
    this.text = text;
    this.options = options;
    this.correctOption = correctOption;
    this.points = points;
    this.category = category;
  }

  getOptions(): string[] {
    return [...this.options];
  }

  checkAnswer(answer: unknown): boolean {
    if (typeof answer !== 'number') {
      return false;
    }
    return answer === this.correctOption;
  }

  getCorrectAnswer(): number {
    return this.correctOption;
  }
}

// True/False question implementation
export class TrueFalseQuestion implements Question {
  id: string;
  text: string;
  points: number;
  category: string;
  private correctAnswer: boolean;

  constructor(
    id: string,
    text: string,
    correctAnswer: boolean,
    points: number = 1,
    category: string = 'General'
  ) {
    this.id = id;
    this.text = text;
    this.correctAnswer = correctAnswer;
    this.points = points;
    this.category = category;
  }

  checkAnswer(answer: unknown): boolean {
    if (typeof answer !== 'boolean') {
      return false;
    }
    return answer === this.correctAnswer;
  }

  getCorrectAnswer(): boolean {
    return this.correctAnswer;
  }
}

// Text question implementation
export class TextQuestion implements Question {
  id: string;
  text: string;
  points: number;
  category: string;
  private correctAnswer: string;
  private caseSensitive: boolean;

  constructor(
    id: string,
    text: string,
    correctAnswer: string,
    caseSensitive: boolean = false,
    points: number = 1,
    category: string = 'General'
  ) {
    this.id = id;
    this.text = text;
    this.correctAnswer = correctAnswer;
    this.caseSensitive = caseSensitive;
    this.points = points;
    this.category = category;
  }

  checkAnswer(answer: unknown): boolean {
    if (typeof answer !== 'string') {
      return false;
    }
    
    if (this.caseSensitive) {
      return answer === this.correctAnswer;
    } else {
      return answer.toLowerCase() === this.correctAnswer.toLowerCase();
    }
  }

  getCorrectAnswer(): string {
    return this.correctAnswer;
  }
}

// Numeric question implementation
export class NumericQuestion implements Question {
  id: string;
  text: string;
  points: number;
  category: string;
  private correctAnswer: number;
  private tolerance: number;

  constructor(
    id: string,
    text: string,
    correctAnswer: number,
    tolerance: number = 0,
    points: number = 1,
    category: string = 'General'
  ) {
    this.id = id;
    this.text = text;
    this.correctAnswer = correctAnswer;
    this.tolerance = tolerance;
    this.points = points;
    this.category = category;
  }

  checkAnswer(answer: unknown): boolean {
    if (typeof answer !== 'number') {
      return false;
    }
    
    const difference = Math.abs(answer - this.correctAnswer);
    return difference <= this.tolerance;
  }

  getCorrectAnswer(): number {
    return this.correctAnswer;
  }
} 