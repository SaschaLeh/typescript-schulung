/**
 * Exercise 2: Async Tests & Mocking
 *
 * In this exercise, you'll practice:
 * - Testing async functions with async/await
 * - Using .resolves and .rejects matchers
 * - Creating mocks with jest.fn()
 * - Verifying mock calls with toHaveBeenCalledWith()
 * - Using beforeEach/afterEach for setup and cleanup
 *
 * The UserService class simulates API calls with async methods.
 * The NotificationService is an interface that should be mocked.
 */

import { UserService, NotificationService, User } from '../src/async-service';

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    userService = new UserService();
  });

  // ============================================================
  // Async/Await Tests
  // ============================================================
  describe('fetchUser', () => {
    it('should fetch an existing user by id', async () => {
      // TODO: Use await to fetch user with id 1
      // Assert: name should be 'Alice', email should be 'alice@example.com'
    });

    it('should return the correct user structure', async () => {
      // TODO: Fetch user with id 2
      // Assert: Use toEqual() to check the complete user object
      // Expected: { id: 2, name: 'Bob', email: 'bob@example.com' }
    });

    it('should reject when user is not found', async () => {
      // TODO: Use try/catch or .rejects to test that fetching id 999 throws
      // Assert: Error message should contain 'not found'
    });
  });

  describe('fetchUsers', () => {
    it('should fetch all users', async () => {
      // TODO: Fetch all users
      // Assert: Array should have length 3
    });

    it('should return user objects with correct properties', async () => {
      // TODO: Fetch all users
      // Assert: First user should have properties 'id', 'name', 'email'
      // Hint: Use expect.objectContaining() or check individual properties
    });
  });

  // ============================================================
  // .resolves / .rejects Matchers
  // ============================================================
  describe('resolves and rejects matchers', () => {
    it('should resolve with user data (using .resolves)', () => {
      // TODO: Use expect(...).resolves.toEqual() to test fetchUser(1)
      // Hint: return the expect() statement (no async/await needed)
    });

    it('should reject for invalid id (using .rejects)', () => {
      // TODO: Use expect(...).rejects.toThrow() to test fetchUser(999)
      // Hint: return the expect() statement
    });
  });

  // ============================================================
  // Mocking with jest.fn()
  // ============================================================
  describe('with NotificationService mock', () => {
    let mockNotificationService: NotificationService;
    let userServiceWithNotifications: UserService;

    beforeEach(() => {
      // TODO 1: Create a mock NotificationService using jest.fn()
      // The notify method should be a jest.fn() that resolves to undefined
      // Hint: jest.fn().mockResolvedValue(undefined)

      // TODO 2: Create a new UserService instance with the mock
    });

    afterEach(() => {
      // TODO 3: Clear all mocks after each test
      // Hint: jest.clearAllMocks()
    });

    it('should call notify when creating a user', async () => {
      // TODO 4: Create a user with name 'Dave' and email 'dave@example.com'
      // Assert: mockNotificationService.notify should have been called
      // Hint: Use toHaveBeenCalled()
    });

    it('should call notify with the correct message on create', async () => {
      // TODO 5: Create a user with name 'Eve'
      // Assert: notify was called with 'User "Eve" created'
      // Hint: Use toHaveBeenCalledWith()
    });

    it('should call notify when deleting a user', async () => {
      // TODO 6: Delete user with id 1 (Alice)
      // Assert: notify was called with message containing 'Alice' and 'deleted'
    });

    it('should not call notify if no notification service is provided', async () => {
      // TODO 7: Create a UserService WITHOUT notification service
      // Create a user, then assert that mockNotificationService.notify was NOT called
      // Hint: Use not.toHaveBeenCalled()
    });
  });
});
