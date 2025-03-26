import { Question } from './question';

// Define a QuizResult interface to store quiz results
export interface QuizResult {
  totalQuestions: number;
  answeredQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  totalPoints: number;
  earnedPoints: number;
  percentage: number;
  categoryResults: Record<string, {
    totalQuestions: number;
    correctAnswers: number;
    totalPoints: number;
    earnedPoints: number;
    percentage: number;
  }>;
}

// Quiz class to manage questions and track answers
export class Quiz {
  private questions: Question[] = [];
  private answers: Map<string, unknown> = new Map();
  
  // Add a question to the quiz
  addQuestion(question: Question): void {
    this.questions.push(question);
  }
  
  // Add multiple questions to the quiz
  addQuestions(questions: Question[]): void {
    this.questions.push(...questions);
  }
  
  // Get all questions
  getQuestions(): Question[] {
    return [...this.questions];
  }
  
  // Get a specific question by ID
  getQuestion(id: string): Question | undefined {
    return this.questions.find(q => q.id === id);
  }
  
  // Submit an answer for a specific question
  submitAnswer(questionId: string, answer: unknown): boolean {
    const question = this.getQuestion(questionId);
    if (!question) {
      throw new Error(`Question with ID ${questionId} not found`);
    }
    
    this.answers.set(questionId, answer);
    return question.checkAnswer(answer);
  }
  
  // Get a submitted answer
  getAnswer(questionId: string): unknown | undefined {
    return this.answers.get(questionId);
  }
  
  // Check if a question has been answered
  isAnswered(questionId: string): boolean {
    return this.answers.has(questionId);
  }
  
  // Calculate quiz results
  calculateResults(): QuizResult {
    let totalPoints = 0;
    let earnedPoints = 0;
    let correctAnswers = 0;
    let incorrectAnswers = 0;
    
    // Initialize category results
    const categoryResults: Record<string, {
      totalQuestions: number;
      correctAnswers: number;
      totalPoints: number;
      earnedPoints: number;
      percentage: number;
    }> = {};
    
    // Process each question
    this.questions.forEach(question => {
      // Add to total points
      totalPoints += question.points;
      
      // Initialize category if not exists
      if (!categoryResults[question.category]) {
        categoryResults[question.category] = {
          totalQuestions: 0,
          correctAnswers: 0,
          totalPoints: 0,
          earnedPoints: 0,
          percentage: 0
        };
      }
      
      // Update category totals
      categoryResults[question.category].totalQuestions++;
      categoryResults[question.category].totalPoints += question.points;
      
      // Check if question was answered
      const answer = this.answers.get(question.id);
      if (answer !== undefined) {
        // Question was answered
        const isCorrect = question.checkAnswer(answer);
        
        if (isCorrect) {
          correctAnswers++;
          earnedPoints += question.points;
          categoryResults[question.category].correctAnswers++;
          categoryResults[question.category].earnedPoints += question.points;
        } else {
          incorrectAnswers++;
        }
      }
    });
    
    // Calculate percentages for each category
    Object.keys(categoryResults).forEach(category => {
      const catResult = categoryResults[category];
      catResult.percentage = catResult.totalPoints > 0 
        ? (catResult.earnedPoints / catResult.totalPoints) * 100 
        : 0;
    });
    
    // Create the final result
    return {
      totalQuestions: this.questions.length,
      answeredQuestions: this.answers.size,
      correctAnswers,
      incorrectAnswers,
      totalPoints,
      earnedPoints,
      percentage: totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : 0,
      categoryResults
    };
  }
  
  // Reset the quiz by clearing all answers
  reset(): void {
    this.answers.clear();
  }
} 