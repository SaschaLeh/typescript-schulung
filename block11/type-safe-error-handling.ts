// Type-safe error handling pattern using Result type

// Define a Result type that can represent success or failure
type CustomResult<T, E extends Error> = 
  | { success: true; value: T }
  | { success: false; error: E };

// Custom error types
class DatabaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DatabaseError';
    Object.setPrototypeOf(this, DatabaseError.prototype);
  }
}

class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NetworkError';
    Object.setPrototypeOf(this, NetworkError.prototype);
  }
}

class NotFoundError extends Error {
  constructor(id: string) {
    super(`Item with id ${id} not found`);
    this.name = 'NotFoundError';
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

// User type
interface User {
  id: string;
  name: string;
  email: string;
}

// Simulate database operations with Result types
function fetchUser(id: string): CustomResult<User, DatabaseError | NetworkError | NotFoundError> {
  // Simulate different outcomes based on id
  if (id === '404') {
    return {
      success: false,
      error: new NotFoundError(id)
    };
  } else if (id === 'network-error') {
    return {
      success: false,
      error: new NetworkError('Failed to connect to the database')
    };
  } else if (id === 'db-error') {
    return {
      success: false,
      error: new DatabaseError('Database query failed')
    };
  }

  // Success case
  return {
    success: true,
    value: {
      id,
      name: 'John Doe',
      email: 'john.doe@example.com'
    }
  };
}

// Helper function to handle results
function handleResult<T, E extends Error>(
  result: CustomResult<T, E>,
  onSuccess: (value: T) => void,
  onError: (error: E) => void
): void {
  if (result.success) {
    onSuccess(result.value);
  } else {
    onError(result.error);
  }
}

// Test with different IDs
const userIds = ['123', '404', 'network-error', 'db-error'];

userIds.forEach(id => {
  console.log(`\nFetching user with ID: ${id}`);
  const result = fetchUser(id);
  
  handleResult(
    result,
    (user) => {
      console.log('User found:', user);
      // Process user...
    },
    (error) => {
      if (error instanceof NotFoundError) {
        console.error('User not found:', error.message);
      } else if (error instanceof NetworkError) {
        console.error('Network issue:', error.message);
      } else if (error instanceof DatabaseError) {
        console.error('Database issue:', error.message);
      } else {
        console.error('Unknown error:', String(error));
      }
    }
  );
}); 