import { 
  ValidationError, 
  RequiredFieldError, 
  InvalidEmailError, 
  MinLengthError 
} from './custom-errors';

// Define the form data interface
interface FormData {
  username: string;
  email: string;
  password: string;
  age?: number; // Optional field
}

// Result type for validation
type ValidationResult = {
  valid: boolean;
  errors: ValidationError[];
};

// Form validation function
function validateForm(form: FormData): ValidationResult {
  const errors: ValidationError[] = [];

  // Check required fields
  if (!form.username.trim()) {
    errors.push(new RequiredFieldError('username'));
  } else if (form.username.length < 3) {
    errors.push(new MinLengthError('username', 3));
  }

  // Validate email format
  if (!form.email.trim()) {
    errors.push(new RequiredFieldError('email'));
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      errors.push(new InvalidEmailError(form.email));
    }
  }

  // Password validation
  if (!form.password.trim()) {
    errors.push(new RequiredFieldError('password'));
  } else if (form.password.length < 8) {
    errors.push(new MinLengthError('password', 8));
  }

  // Age validation (optional field)
  if (form.age !== undefined) {
    if (form.age < 18 || form.age > 120) {
      errors.push(new ValidationError('Age must be between 18 and 120'));
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

// Type-safe error handling with specific error types
function processForm(formData: FormData): void {
  try {
    const result = validateForm(formData);
    
    if (!result.valid) {
      // Handle different types of validation errors
      result.errors.forEach(error => {
        if (error instanceof RequiredFieldError) {
          console.error(`Required field error: ${error.message}`);
        } else if (error instanceof InvalidEmailError) {
          console.error(`Email format error: ${error.message}`);
        } else if (error instanceof MinLengthError) {
          console.error(`Length error: ${error.message}`);
        } else {
          console.error(`Validation error: ${error.message}`);
        }
      });
      
      // Re-throw the first error if needed
      throw result.errors[0];
    }
    
    console.log('Form validation successful!');
    // Process the valid form data...
    console.log('Processing form:', formData);
  } catch (error) {
    if (error instanceof ValidationError) {
      console.error('Form processing failed due to validation error:', error.message);
    } else if (error instanceof Error) {
      console.error('Unexpected error during form processing:', error.message);
    } else {
      console.error('Unknown error during form processing');
    }
  }
}

// Test cases
const validForm: FormData = {
  username: 'johndoe',
  email: 'john.doe@example.com',
  password: 'securepassword123',
  age: 30
};

const invalidForm: FormData = {
  username: 'jo',  // Too short
  email: 'not-an-email',  // Invalid format
  password: 'short',  // Too short
  age: 15  // Too young
};

console.log('\n--- Testing valid form ---');
processForm(validForm);

console.log('\n--- Testing invalid form ---');
processForm(invalidForm); 