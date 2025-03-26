import { UserManager, User } from './user-manager';
import { NotificationService } from './notification.service';

describe('UserManager', () => {
  let userManager: UserManager;
  let mockNotificationService: jest.Mocked<NotificationService>;
  
  const testUser: User = {
    id: '1',
    email: 'test@example.com',
    phone: '123-456-7890',
    name: 'Test User'
  };

  const anotherTestUser: User = {
    id: '2',
    email: 'another@example.com',
    phone: '987-654-3210',
    name: 'Another User'
  };

  beforeEach(() => {
    // Create a mock NotificationService
    mockNotificationService = {
      sendEmail: jest.fn(),
      sendSMS: jest.fn()
    } as jest.Mocked<NotificationService>;
    
    // Create a UserManager with the mock service
    userManager = new UserManager(mockNotificationService);
  });

  describe('createUser', () => {
    it('should add a new user to the list', () => {
      const result = userManager.createUser(testUser);
      
      expect(result).toEqual(testUser);
      expect(userManager.getAllUsers()).toHaveLength(1);
      expect(userManager.getAllUsers()[0]).toEqual(testUser);
    });

    it('should send a welcome email', () => {
      userManager.createUser(testUser);
      
      expect(mockNotificationService.sendEmail).toHaveBeenCalledTimes(1);
      expect(mockNotificationService.sendEmail).toHaveBeenCalledWith(
        testUser.email,
        'Welcome to our platform!',
        expect.stringContaining(testUser.name)
      );
    });

    it('should not send notifications when disabled', () => {
      // Create a UserManager with notifications disabled
      userManager = new UserManager(mockNotificationService, false);
      
      userManager.createUser(testUser);
      
      expect(mockNotificationService.sendEmail).not.toHaveBeenCalled();
    });

    it('should throw an error when user ID already exists', () => {
      userManager.createUser(testUser);
      
      expect(() => userManager.createUser(testUser))
        .toThrow(`User with ID ${testUser.id} already exists`);
    });
  });

  describe('updateUser', () => {
    beforeEach(() => {
      userManager.createUser(testUser);
      // Reset the mock calls after creating the user
      mockNotificationService.sendEmail.mockClear();
    });

    it('should update user information', () => {
      const updates = { name: 'Updated Name', phone: '555-123-4567' };
      const updatedUser = userManager.updateUser(testUser.id, updates);
      
      expect(updatedUser.name).toBe(updates.name);
      expect(updatedUser.phone).toBe(updates.phone);
      // Email should remain unchanged
      expect(updatedUser.email).toBe(testUser.email);
    });

    it('should send an update notification email', () => {
      userManager.updateUser(testUser.id, { name: 'Updated Name' });
      
      expect(mockNotificationService.sendEmail).toHaveBeenCalledTimes(1);
      expect(mockNotificationService.sendEmail).toHaveBeenCalledWith(
        testUser.email,
        'Your account has been updated',
        expect.stringContaining('Updated Name') // Using the updated name
      );
    });

    it('should throw an error when user does not exist', () => {
      expect(() => userManager.updateUser('non-existent-id', { name: 'New Name' }))
        .toThrow(`User with ID non-existent-id not found`);
    });

    it('should throw an error when trying to change the user ID', () => {
      expect(() => userManager.updateUser(testUser.id, { id: 'new-id' }))
        .toThrow(`Changing user ID is not allowed`);
    });
  });

  describe('deleteUser', () => {
    beforeEach(() => {
      userManager.createUser(testUser);
      mockNotificationService.sendEmail.mockClear();
    });

    it('should remove the user from the list', () => {
      const result = userManager.deleteUser(testUser.id);
      
      expect(result).toBe(true);
      expect(userManager.getAllUsers()).toHaveLength(0);
    });

    it('should send a deletion notification email', () => {
      userManager.deleteUser(testUser.id);
      
      expect(mockNotificationService.sendEmail).toHaveBeenCalledTimes(1);
      expect(mockNotificationService.sendEmail).toHaveBeenCalledWith(
        testUser.email,
        'Your account has been deleted',
        expect.stringContaining(testUser.name)
      );
    });

    it('should return false when user does not exist', () => {
      const result = userManager.deleteUser('non-existent-id');
      
      expect(result).toBe(false);
      expect(mockNotificationService.sendEmail).not.toHaveBeenCalled();
    });
  });

  describe('getUserById', () => {
    beforeEach(() => {
      userManager.createUser(testUser);
      userManager.createUser(anotherTestUser);
      mockNotificationService.sendEmail.mockClear();
    });

    it('should return the correct user', () => {
      const user = userManager.getUserById(testUser.id);
      
      expect(user).toEqual(testUser);
    });

    it('should return null when user does not exist', () => {
      const user = userManager.getUserById('non-existent-id');
      
      expect(user).toBeNull();
    });

    it('should not send any notifications', () => {
      userManager.getUserById(testUser.id);
      
      expect(mockNotificationService.sendEmail).not.toHaveBeenCalled();
      expect(mockNotificationService.sendSMS).not.toHaveBeenCalled();
    });
  });

  describe('getAllUsers', () => {
    it('should return an empty array when no users exist', () => {
      const users = userManager.getAllUsers();
      
      expect(users).toEqual([]);
    });

    it('should return all users', () => {
      userManager.createUser(testUser);
      userManager.createUser(anotherTestUser);
      
      const users = userManager.getAllUsers();
      
      expect(users).toHaveLength(2);
      expect(users).toEqual(expect.arrayContaining([testUser, anotherTestUser]));
    });

    it('should return a copy of the users array', () => {
      userManager.createUser(testUser);
      
      const users = userManager.getAllUsers();
      users.push(anotherTestUser);
      
      // The internal users array should not be modified
      expect(userManager.getAllUsers()).toHaveLength(1);
    });
  });

  // Advanced mock verification techniques
  describe('advanced mock techniques', () => {
    it('should demonstrate accessing mock call arguments', () => {
      userManager.createUser(testUser);
      
      // Access the first call to sendEmail, then get its first argument (email address)
      expect(mockNotificationService.sendEmail.mock.calls[0][0]).toBe(testUser.email);
      // Access the subject (second argument)
      expect(mockNotificationService.sendEmail.mock.calls[0][1]).toBe('Welcome to our platform!');
    });

    it('should demonstrate custom mock implementation', () => {
      // Override the default mock implementation for this test
      mockNotificationService.sendEmail.mockImplementation((email, subject, body) => {
        if (email === 'special@example.com') {
          throw new Error('Cannot send to special addresses');
        }
      });
      
      // This should work normally
      userManager.createUser(testUser);
      
      // This should throw our custom error
      const specialUser = { ...testUser, id: '99', email: 'special@example.com' };
      expect(() => userManager.createUser(specialUser)).toThrow('Cannot send to special addresses');
    });

    it('should track the sequence of mock calls', () => {
      userManager.createUser(testUser);
      userManager.updateUser(testUser.id, { name: 'Updated Name' });
      userManager.deleteUser(testUser.id);
      
      // Verify the sequence of subjects in the email notifications
      const emailSubjects = mockNotificationService.sendEmail.mock.calls.map(call => call[1]);
      expect(emailSubjects).toEqual([
        'Welcome to our platform!',
        'Your account has been updated',
        'Your account has been deleted'
      ]);
    });

    it('should reset mock between tests', () => {
      // The mock should start fresh in each test due to the beforeEach setup
      expect(mockNotificationService.sendEmail).not.toHaveBeenCalled();
      
      userManager.createUser(testUser);
      expect(mockNotificationService.sendEmail).toHaveBeenCalledTimes(1);
    });
  });

  // Demonstrating different mock initialization approaches
  describe('alternative mock initialization approaches', () => {
    it('should demonstrate inline mock creation', () => {
      // Creating a mock directly in the test
      const inlineMockService = {
        sendEmail: jest.fn(),
        sendSMS: jest.fn()
      };
      
      const localUserManager = new UserManager(inlineMockService as NotificationService);
      localUserManager.createUser(testUser);
      
      expect(inlineMockService.sendEmail).toHaveBeenCalledTimes(1);
    });

    it('should demonstrate jest.spyOn', () => {
      // Creating a real service instead of a mock
      const realService = new NotificationService();
      
      // Spy on the methods without replacing them
      const sendEmailSpy = jest.spyOn(realService, 'sendEmail').mockImplementation();
      const sendSMSSpy = jest.spyOn(realService, 'sendSMS').mockImplementation();
      
      const localUserManager = new UserManager(realService);
      localUserManager.createUser(testUser);
      
      expect(sendEmailSpy).toHaveBeenCalledTimes(1);
      
      // Restore the original implementation
      sendEmailSpy.mockRestore();
      sendSMSSpy.mockRestore();
    });
  });
});
