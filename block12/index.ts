import { QuizBuilder } from './models/quiz-builder';
import { Quiz, QuizResult } from './models/quiz';
import { 
  QuizError, 
  QuestionNotFoundError, 
  InvalidAnswerError,
  EmptyQuizError, 
  handleQuizError 
} from './utils/errors';

/**
 * Sample Quiz Application
 * 
 * This application demonstrates TypeScript concepts including:
 * - Interfaces and Classes
 * - Generics
 * - Custom Error Types
 * - Type Guards
 * - Error Handling
 */

// Function to display quiz questions in a CLI format
function displayQuestion(quiz: Quiz, questionId: string): void {
  const question = quiz.getQuestion(questionId);
  
  if (!question) {
    throw new QuestionNotFoundError(questionId);
  }
  
  console.log(`\nQuestion: ${question.text} (${question.points} points)`);
  
  // For multiple choice questions, display options
  if ('getOptions' in question) {
    const options = (question as any).getOptions();
    options.forEach((option: string, index: number) => {
      console.log(`  ${index}: ${option}`);
    });
  }
}

// Function to display quiz results
function displayResults(results: QuizResult): void {
  console.log('\n===== QUIZ RESULTS =====');
  console.log(`Total Questions: ${results.totalQuestions}`);
  console.log(`Answered Questions: ${results.answeredQuestions}`);
  console.log(`Correct Answers: ${results.correctAnswers}`);
  console.log(`Incorrect Answers: ${results.incorrectAnswers}`);
  console.log(`Total Points: ${results.totalPoints}`);
  console.log(`Earned Points: ${results.earnedPoints}`);
  console.log(`Overall Score: ${results.percentage.toFixed(2)}%`);
  
  console.log('\n===== CATEGORY BREAKDOWN =====');
  Object.entries(results.categoryResults).forEach(([category, result]) => {
    console.log(`\n${category}:`);
    console.log(`  Questions: ${result.totalQuestions}`);
    console.log(`  Correct: ${result.correctAnswers}`);
    console.log(`  Points: ${result.earnedPoints}/${result.totalPoints}`);
    console.log(`  Score: ${result.percentage.toFixed(2)}%`);
  });
}

// Create a sample quiz
function createSampleQuiz(): Quiz {
  try {
    const builder = new QuizBuilder();
    
    // Add multiple choice questions
    builder.addMultipleChoiceQuestion(
      'q1',
      'What is the capital of France?',
      ['London', 'Berlin', 'Paris', 'Madrid'],
      2,
      1,
      'Geography'
    );
    
    builder.addMultipleChoiceQuestion(
      'q2',
      'Which programming language is TypeScript based on?',
      ['Java', 'C#', 'Python', 'JavaScript'],
      3,
      2,
      'Programming'
    );
    
    // Add true/false questions
    builder.addTrueFalseQuestion(
      'q3',
      'TypeScript is a superset of JavaScript.',
      true,
      1,
      'Programming'
    );
    
    builder.addTrueFalseQuestion(
      'q4',
      'The Earth is flat.',
      false,
      1,
      'Science'
    );
    
    // Add text questions
    builder.addTextQuestion(
      'q5',
      'What keyword is used to define a variable in TypeScript that cannot be reassigned?',
      'const',
      false,
      2,
      'Programming'
    );
    
    // Add numeric questions
    builder.addNumericQuestion(
      'q6',
      'What is the value of π (pi) to 2 decimal places?',
      3.14,
      0.01,
      2,
      'Mathematics'
    );
    
    builder.addNumericQuestion(
      'q7',
      'In what year was TypeScript first released?',
      2012,
      0,
      1,
      'Programming'
    );
    
    // Shuffle the questions and build the quiz
    return builder.shuffle().build();
  } catch (error) {
    console.error(handleQuizError(error));
    throw new Error('Failed to create quiz');
  }
}

// Function to simulate taking a quiz
function simulateQuiz(): void {
  try {
    console.log('Creating quiz...');
    const quiz = createSampleQuiz();
    
    if (quiz.getQuestions().length === 0) {
      throw new EmptyQuizError();
    }
    
    console.log(`Quiz created with ${quiz.getQuestions().length} questions.`);
    
    // Simulate answering each question
    // (In a real application, this would involve user input)
    const questionIds = quiz.getQuestions().map(q => q.id);
    
    // Sample answers (some correct, some incorrect)
    const sampleAnswers: Record<string, unknown> = {
      'q1': 2,  // Correct (Paris)
      'q2': 3,  // Correct (JavaScript)
      'q3': true,  // Correct
      'q4': true,  // Incorrect (Earth is not flat)
      'q5': 'const',  // Correct
      'q6': 3.14159,  // Correct (within tolerance)
      'q7': 2015  // Incorrect (TypeScript was released in 2012)
    };
    
    // Submit answers
    questionIds.forEach(id => {
      try {
        displayQuestion(quiz, id);
        
        // Get the sample answer or use a default
        const answer = sampleAnswers[id] || null;
        console.log(`Submitting answer: ${answer}`);
        
        const isCorrect = quiz.submitAnswer(id, answer);
        console.log(`Result: ${isCorrect ? 'Correct!' : 'Incorrect!'}`);
      } catch (error) {
        if (error instanceof QuestionNotFoundError) {
          console.error(`Error: ${error.message}`);
        } else {
          console.error(`Unknown error: ${error instanceof Error ? error.message : String(error)}`);
        }
      }
    });
    
    // Calculate and display results
    const results = quiz.calculateResults();
    displayResults(results);
    
  } catch (error) {
    console.error('Failed to complete quiz:', handleQuizError(error));
  }
}

// Run the simulation
console.log('=== TypeScript Quiz Application ===');
simulateQuiz(); 