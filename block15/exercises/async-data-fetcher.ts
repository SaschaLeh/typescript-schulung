/**
 * Exercise 1: Async Data Fetcher
 *
 * In this exercise, you'll build an async API layer with simulated
 * network calls, error handling, and a retry mechanism.
 */

// ============================================================
// Task 1: Define an ApiResponse<T> interface
// ============================================================
// Properties:
//   - data: T
//   - status: number
//   - message: string
//
// Example: ApiResponse<User> would have { data: User, status: 200, message: "OK" }

// TODO: Define the ApiResponse<T> interface here


// ============================================================
// Task 2: Define User and Post interfaces, then implement fetchUser()
// ============================================================
// User should have: id (number), name (string), email (string)
// Post should have:  id (number), userId (number), title (string), body (string)
//
// fetchUser(id: number): Promise<ApiResponse<User>>
//   - Simulate a network delay with setTimeout (300ms)
//   - If id <= 0, reject with an Error "User not found"
//   - Otherwise resolve with a valid ApiResponse containing a User

// TODO: Define the User interface here

// TODO: Define the Post interface here

// TODO: Implement fetchUser here
export function fetchUser(id: number): Promise<any> {
  // Implement this function
  return null as any; // Replace this line
}

// ============================================================
// Task 3: Implement fetchUserPosts()
// ============================================================
// fetchUserPosts(userId: number): Promise<ApiResponse<Post[]>>
//   - Simulate a network delay with setTimeout (200ms)
//   - Return 2-3 sample posts for the given userId

// TODO: Implement fetchUserPosts here
export function fetchUserPosts(userId: number): Promise<any> {
  // Implement this function
  return null as any; // Replace this line
}

// ============================================================
// Task 4: Implement fetchUserWithPosts() using async/await
// ============================================================
// fetchUserWithPosts(id: number): Promise<{ user: User; posts: Post[] }>
//   - Use async/await to first fetch the user, then fetch their posts
//   - Combine both results into a single object
//   - Use try/catch for error handling

// TODO: Implement fetchUserWithPosts here
export async function fetchUserWithPosts(id: number): Promise<any> {
  // Implement this function
  return null as any; // Replace this line
}

// ============================================================
// Task 5: Create an ApiError class
// ============================================================
// ApiError extends Error
// Properties:
//   - statusCode: number (public readonly)
//   - message: string (inherited from Error)
//
// Constructor: (message: string, statusCode: number)
// The name property should be set to "ApiError"

// TODO: Implement the ApiError class here


// ============================================================
// Task 6: Implement a generic retry() function
// ============================================================
// retry<T>(fn: () => Promise<T>, maxRetries: number): Promise<T>
//   - Call fn() and return its result if successful
//   - If fn() throws, retry up to maxRetries times
//   - Between retries, wait 100ms (use a delay helper)
//   - If all retries are exhausted, throw the last error
//
// Hint: Create a small helper function:
//   function delay(ms: number): Promise<void> {
//     return new Promise(resolve => setTimeout(resolve, ms));
//   }

// TODO: Implement the retry function here
export async function retry<T>(fn: () => Promise<T>, maxRetries: number): Promise<T> {
  // Implement this function
  return null as any; // Replace this line
}

// ============================================================
// Test your functions here
// ============================================================

async function testExercise1(): Promise<void> {
  console.log("=== Testing fetchUser ===");
  // const userResponse = await fetchUser(1);
  // console.log("User:", userResponse);

  console.log("\n=== Testing fetchUserPosts ===");
  // const postsResponse = await fetchUserPosts(1);
  // console.log("Posts:", postsResponse);

  console.log("\n=== Testing fetchUserWithPosts ===");
  // const result = await fetchUserWithPosts(1);
  // console.log("User with posts:", result);

  console.log("\n=== Testing error handling ===");
  // try {
  //   await fetchUser(-1);
  // } catch (error) {
  //   console.log("Error caught:", (error as Error).message);
  // }

  console.log("\n=== Testing retry ===");
  // let attempt = 0;
  // const unreliable = () => {
  //   attempt++;
  //   if (attempt < 3) return Promise.reject(new Error(`Attempt ${attempt} failed`));
  //   return Promise.resolve("Success on attempt " + attempt);
  // };
  // const result2 = await retry(unreliable, 5);
  // console.log("Retry result:", result2);
}

// Uncomment to run the test
// testExercise1();
