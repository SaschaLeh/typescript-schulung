// Base QuizError class
export class QuizError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'QuizError';
    Object.setPrototypeOf(this, QuizError.prototype);
  }
}

// Error when question is not found
export class QuestionNotFoundError extends QuizError {
  constructor(questionId: string) {
    super(`Question with ID "${questionId}" not found`);
    this.name = 'QuestionNotFoundError';
    Object.setPrototypeOf(this, QuestionNotFoundError.prototype);
  }
}

// Error when an invalid answer is provided
export class InvalidAnswerError extends QuizError {
  constructor(expectedType: string, receivedType: string) {
    super(`Expected answer of type "${expectedType}", but received "${receivedType}"`);
    this.name = 'InvalidAnswerError';
    Object.setPrototypeOf(this, InvalidAnswerError.prototype);
  }
}

// Error when creating a question with invalid parameters
export class InvalidQuestionError extends QuizError {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidQuestionError';
    Object.setPrototypeOf(this, InvalidQuestionError.prototype);
  }
}

// Error when trying to submit an answer for a question that's already answered
export class QuestionAlreadyAnsweredError extends QuizError {
  constructor(questionId: string) {
    super(`Question with ID "${questionId}" has already been answered`);
    this.name = 'QuestionAlreadyAnsweredError';
    Object.setPrototypeOf(this, QuestionAlreadyAnsweredError.prototype);
  }
}

// Error when quiz has no questions
export class EmptyQuizError extends QuizError {
  constructor() {
    super('Cannot start a quiz with no questions');
    this.name = 'EmptyQuizError';
    Object.setPrototypeOf(this, EmptyQuizError.prototype);
  }
}

// Type guard functions
export function isQuizError(error: unknown): error is QuizError {
  return error instanceof QuizError;
}

export function isQuestionNotFoundError(error: unknown): error is QuestionNotFoundError {
  return error instanceof QuestionNotFoundError;
}

export function isInvalidAnswerError(error: unknown): error is InvalidAnswerError {
  return error instanceof InvalidAnswerError;
}

// Safe error handling function
export function handleQuizError(error: unknown): string {
  if (isQuizError(error)) {
    return `Quiz error: ${error.message}`;
  } else if (error instanceof Error) {
    return `An error occurred: ${error.message}`;
  } else {
    return 'An unknown error occurred';
  }
} 