// Custom error types in TypeScript

// Base custom error class
class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
    
    // This line is needed for proper prototype chain in TypeScript
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

// Specific validation error types
class RequiredFieldError extends ValidationError {
  constructor(fieldName: string) {
    super(`The field "${fieldName}" is required`);
    this.name = 'RequiredFieldError';
    Object.setPrototypeOf(this, RequiredFieldError.prototype);
  }
}

class InvalidEmailError extends ValidationError {
  constructor(email: string) {
    super(`"${email}" is not a valid email address`);
    this.name = 'InvalidEmailError';
    Object.setPrototypeOf(this, InvalidEmailError.prototype);
  }
}

class MinLengthError extends ValidationError {
  constructor(fieldName: string, minLength: number) {
    super(`The field "${fieldName}" must be at least ${minLength} characters long`);
    this.name = 'MinLengthError';
    Object.setPrototypeOf(this, MinLengthError.prototype);
  }
}

// Export the custom error types
export { 
  ValidationError, 
  RequiredFieldError, 
  InvalidEmailError, 
  MinLengthError 
}; 