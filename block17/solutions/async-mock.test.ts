/**
 * Solution 2: Async Tests & Mocking
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
      const user = await userService.fetchUser(1);
      expect(user.name).toBe('Alice');
      expect(user.email).toBe('alice@example.com');
    });

    it('should return the correct user structure', async () => {
      const user = await userService.fetchUser(2);
      expect(user).toEqual({ id: 2, name: 'Bob', email: 'bob@example.com' });
    });

    it('should reject when user is not found', async () => {
      await expect(userService.fetchUser(999)).rejects.toThrow('not found');
    });
  });

  describe('fetchUsers', () => {
    it('should fetch all users', async () => {
      const users = await userService.fetchUsers();
      expect(users).toHaveLength(3);
    });

    it('should return user objects with correct properties', async () => {
      const users = await userService.fetchUsers();
      expect(users[0]).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          email: expect.any(String),
        })
      );
    });
  });

  // ============================================================
  // .resolves / .rejects Matchers
  // ============================================================
  describe('resolves and rejects matchers', () => {
    it('should resolve with user data (using .resolves)', () => {
      return expect(userService.fetchUser(1)).resolves.toEqual({
        id: 1,
        name: 'Alice',
        email: 'alice@example.com',
      });
    });

    it('should reject for invalid id (using .rejects)', () => {
      return expect(userService.fetchUser(999)).rejects.toThrow('not found');
    });
  });

  // ============================================================
  // Mocking with jest.fn()
  // ============================================================
  describe('with NotificationService mock', () => {
    let mockNotificationService: NotificationService;
    let userServiceWithNotifications: UserService;

    beforeEach(() => {
      mockNotificationService = {
        notify: jest.fn().mockResolvedValue(undefined),
      };
      userServiceWithNotifications = new UserService(mockNotificationService);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should call notify when creating a user', async () => {
      await userServiceWithNotifications.createUser('Dave', 'dave@example.com');
      expect(mockNotificationService.notify).toHaveBeenCalled();
    });

    it('should call notify with the correct message on create', async () => {
      await userServiceWithNotifications.createUser('Eve', 'eve@example.com');
      expect(mockNotificationService.notify).toHaveBeenCalledWith('User "Eve" created');
    });

    it('should call notify when deleting a user', async () => {
      await userServiceWithNotifications.deleteUser(1);
      expect(mockNotificationService.notify).toHaveBeenCalledWith('User "Alice" deleted');
    });

    it('should not call notify if no notification service is provided', async () => {
      const serviceWithoutNotifications = new UserService();
      await serviceWithoutNotifications.createUser('Frank', 'frank@example.com');
      expect(mockNotificationService.notify).not.toHaveBeenCalled();
    });
  });
});
