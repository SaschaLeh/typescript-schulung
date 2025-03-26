import { 
  Question, 
  MultipleChoiceQuestion, 
  TrueFalseQuestion, 
  TextQuestion, 
  NumericQuestion 
} from './question';
import { Quiz } from './quiz';

// QuizBuilder class to help construct different quizzes
export class QuizBuilder {
  private questions: Question[] = [];
  
  // Add a multiple choice question
  addMultipleChoiceQuestion(
    id: string,
    text: string,
    options: string[],
    correctOption: number,
    points: number = 1,
    category: string = 'General'
  ): QuizBuilder {
    const question = new MultipleChoiceQuestion(
      id,
      text,
      options,
      correctOption,
      points,
      category
    );
    this.questions.push(question);
    return this;
  }
  
  // Add a true/false question
  addTrueFalseQuestion(
    id: string,
    text: string,
    correctAnswer: boolean,
    points: number = 1,
    category: string = 'General'
  ): QuizBuilder {
    const question = new TrueFalseQuestion(
      id,
      text,
      correctAnswer,
      points,
      category
    );
    this.questions.push(question);
    return this;
  }
  
  // Add a text question
  addTextQuestion(
    id: string,
    text: string,
    correctAnswer: string,
    caseSensitive: boolean = false,
    points: number = 1,
    category: string = 'General'
  ): QuizBuilder {
    const question = new TextQuestion(
      id,
      text,
      correctAnswer,
      caseSensitive,
      points,
      category
    );
    this.questions.push(question);
    return this;
  }
  
  // Add a numeric question
  addNumericQuestion(
    id: string,
    text: string,
    correctAnswer: number,
    tolerance: number = 0,
    points: number = 1,
    category: string = 'General'
  ): QuizBuilder {
    const question = new NumericQuestion(
      id,
      text,
      correctAnswer,
      tolerance,
      points,
      category
    );
    this.questions.push(question);
    return this;
  }
  
  // Add a custom question
  addQuestion(question: Question): QuizBuilder {
    this.questions.push(question);
    return this;
  }
  
  // Build the quiz
  build(): Quiz {
    const quiz = new Quiz();
    quiz.addQuestions(this.questions);
    return quiz;
  }
  
  // Filter questions by category
  filterByCategory(category: string): QuizBuilder {
    const filteredBuilder = new QuizBuilder();
    const filteredQuestions = this.questions.filter(q => q.category === category);
    filteredQuestions.forEach(q => filteredBuilder.addQuestion(q));
    return filteredBuilder;
  }
  
  // Limit the number of questions
  limitQuestions(limit: number): QuizBuilder {
    const limitedBuilder = new QuizBuilder();
    const limitedQuestions = this.questions.slice(0, limit);
    limitedQuestions.forEach(q => limitedBuilder.addQuestion(q));
    return limitedBuilder;
  }
  
  // Shuffle the questions
  shuffle(): QuizBuilder {
    const shuffledBuilder = new QuizBuilder();
    const shuffledQuestions = [...this.questions];
    
    // Fisher-Yates shuffle algorithm
    for (let i = shuffledQuestions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledQuestions[i], shuffledQuestions[j]] = 
        [shuffledQuestions[j], shuffledQuestions[i]];
    }
    
    shuffledQuestions.forEach(q => shuffledBuilder.addQuestion(q));
    return shuffledBuilder;
  }
} 