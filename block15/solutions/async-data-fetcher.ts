/**
 * Exercise 1: Async Data Fetcher (SOLUTION)
 */

// Task 1: ApiResponse<T> interface
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Task 2: User and Post interfaces
interface User {
  id: number;
  name: string;
  email: string;
}

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

// Task 2: fetchUser — simulated API call with setTimeout
function fetchUser(id: number): Promise<ApiResponse<User>> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id <= 0) {
        reject(new Error("User not found"));
        return;
      }
      resolve({
        data: { id, name: `User_${id}`, email: `user${id}@example.com` },
        status: 200,
        message: "OK",
      });
    }, 300);
  });
}

// Task 3: fetchUserPosts — simulated API call
function fetchUserPosts(userId: number): Promise<ApiResponse<Post[]>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: [
          { id: 1, userId, title: "Erster Beitrag", body: "Inhalt des ersten Beitrags" },
          { id: 2, userId, title: "Zweiter Beitrag", body: "Inhalt des zweiten Beitrags" },
          { id: 3, userId, title: "Dritter Beitrag", body: "Inhalt des dritten Beitrags" },
        ],
        status: 200,
        message: "OK",
      });
    }, 200);
  });
}

// Task 4: fetchUserWithPosts — combining both calls with async/await
async function fetchUserWithPosts(id: number): Promise<{ user: User; posts: Post[] }> {
  try {
    const userResponse = await fetchUser(id);
    const postsResponse = await fetchUserPosts(userResponse.data.id);
    return {
      user: userResponse.data,
      posts: postsResponse.data,
    };
  } catch (error) {
    const err = error as Error;
    throw new ApiError(`Failed to fetch user with posts: ${err.message}`, 500);
  }
}

// Task 5: ApiError class
class ApiError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
  }
}

// Task 6: Generic retry function
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function retry<T>(fn: () => Promise<T>, maxRetries: number): Promise<T> {
  let lastError: Error | undefined;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (attempt < maxRetries) {
        await delay(100);
      }
    }
  }

  throw lastError;
}

// Demo
async function testExercise1(): Promise<void> {
  console.log("=== Testing fetchUser ===");
  const userResponse = await fetchUser(1);
  console.log("User:", userResponse);

  console.log("\n=== Testing fetchUserPosts ===");
  const postsResponse = await fetchUserPosts(1);
  console.log("Posts:", postsResponse);

  console.log("\n=== Testing fetchUserWithPosts ===");
  const result = await fetchUserWithPosts(1);
  console.log("User with posts:", result);

  console.log("\n=== Testing error handling ===");
  try {
    await fetchUser(-1);
  } catch (error) {
    console.log("Error caught:", (error as Error).message);
  }

  console.log("\n=== Testing ApiError ===");
  try {
    await fetchUserWithPosts(-1);
  } catch (error) {
    if (error instanceof ApiError) {
      console.log(`ApiError: ${error.message} (Status: ${error.statusCode})`);
    }
  }

  console.log("\n=== Testing retry ===");
  let attempt = 0;
  const unreliable = (): Promise<string> => {
    attempt++;
    if (attempt < 3) {
      return Promise.reject(new Error(`Attempt ${attempt} failed`));
    }
    return Promise.resolve("Success on attempt " + attempt);
  };
  const retryResult = await retry(unreliable, 5);
  console.log("Retry result:", retryResult);

  console.log("\n=== Testing retry exhaustion ===");
  try {
    await retry(() => Promise.reject(new Error("Always fails")), 2);
  } catch (error) {
    console.log("All retries exhausted:", (error as Error).message);
  }
}

testExercise1();
