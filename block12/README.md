# Block 12: Quiz Application Mini-Project

This directory contains a comprehensive TypeScript quiz application that demonstrates various TypeScript concepts covered throughout the course.

## Project Structure

```
block12/
├── models/
│   ├── question.ts     # Question interfaces and implementations
│   ├── quiz.ts         # Quiz class for managing questions and scoring
│   └── quiz-builder.ts # Builder pattern for creating quizzes
├── utils/
│   └── errors.ts       # Custom error types and error handling utilities
└── index.ts            # Main application entry point
```

## Key TypeScript Concepts Demonstrated

1. **Interfaces and Classes**
   - Using interfaces to define contracts (`Question`)
   - Implementing interfaces with classes
   - Abstract and concrete implementations

2. **Generics**
   - Generic type parameters in interfaces and classes
   - Type constraints
   - Generic utility functions

3. **Error Handling**
   - Custom error types
   - Type guards
   - Error handling patterns
   - Try/catch blocks

4. **Advanced Types**
   - Union types
   - Type predicates
   - Type guards
   - `Record<K, V>` utility type
   - Type narrowing and assertion

5. **Object-Oriented Programming**
   - Inheritance
   - Encapsulation
   - Polymorphism
   - Builder pattern

## Features

- Multiple question types (multiple choice, true/false, text, numeric)
- Detailed scoring system with category breakdowns
- Type-safe error handling
- Builder pattern for creating quizzes
- Quiz management functionality (submitting answers, tracking scores)

## Running the Application

To run the quiz application:

```bash
npx ts-node block12/index.ts
```

This will create a sample quiz with various question types, simulate answering the questions, and display the quiz results.

## Extending the Application

The application is designed to be easily extended:

1. **Add new question types**:
   - Create a new class that implements the `Question` interface
   - Add corresponding builder methods to `QuizBuilder`

2. **Add new error types**:
   - Create new classes extending `QuizError`
   - Implement type guards for type-safe error handling

3. **Enhance the quiz experience**:
   - Add a timer feature
   - Implement difficulty levels
   - Add a user interface (web or CLI)

This mini-project brings together all the TypeScript concepts learned throughout the course in a real-world application. 