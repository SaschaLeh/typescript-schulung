import { NotificationService } from './notification.service';

export interface User {
  id: string;
  email: string;
  phone?: string;
  name: string;
}

/**
 * Manages user accounts and notifications
 */
export class UserManager {
  private users: User[] = [];

  constructor(
    private notificationService: NotificationService,
    private sendNotifications: boolean = true
  ) {}

  /**
   * Create a new user
   */
  createUser(user: User): User {
    // Check if user already exists
    if (this.users.some(u => u.id === user.id)) {
      throw new Error(`User with ID ${user.id} already exists`);
    }
    
    // Add the user
    this.users.push(user);
    
    // Notify the user if notifications are enabled
    if (this.sendNotifications) {
      this.notificationService.sendEmail(
        user.email,
        'Welcome to our platform!',
        `Hello ${user.name}, welcome to our platform!`
      );
    }
    
    return user;
  }

  // Implement methods for:
  // - updateUser
  // - deleteUser
  // - getUserById
}
