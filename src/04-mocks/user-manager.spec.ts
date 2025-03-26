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
      // Write your test here
    });

    it('should send a welcome email', () => {
      // Write your test to verify the notification service was called
    });

    it('should not send notifications when disabled', () => {
      // Create a UserManager with notifications disabled
      // Verify no notifications are sent
    });
  });

  // Add tests for other UserManager methods
});
