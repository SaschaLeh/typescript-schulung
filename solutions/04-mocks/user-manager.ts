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

  /**
   * Update user information
   */
  updateUser(userId: string, updates: Partial<User>): User {
    const index = this.users.findIndex(u => u.id === userId);
    
    if (index === -1) {
      throw new Error(`User with ID ${userId} not found`);
    }
    
    // Don't allow changing the user ID
    if (updates.id && updates.id !== userId) {
      throw new Error(`Changing user ID is not allowed`);
    }
    
    // Update the user
    const updatedUser = { ...this.users[index], ...updates };
    this.users[index] = updatedUser;
    
    // Notify the user if notifications are enabled
    if (this.sendNotifications) {
      this.notificationService.sendEmail(
        updatedUser.email,
        'Your account has been updated',
        `Hello ${updatedUser.name}, your account information has been updated.`
      );
    }
    
    return updatedUser;
  }

  /**
   * Delete a user
   */
  deleteUser(userId: string): boolean {
    const index = this.users.findIndex(u => u.id === userId);
    
    if (index === -1) {
      return false;
    }
    
    const deletedUser = this.users[index];
    
    // Remove the user
    this.users.splice(index, 1);
    
    // Notify the user if notifications are enabled
    if (this.sendNotifications) {
      this.notificationService.sendEmail(
        deletedUser.email,
        'Your account has been deleted',
        `Hello ${deletedUser.name}, your account has been deleted from our platform.`
      );
    }
    
    return true;
  }

  /**
   * Get a user by ID
   */
  getUserById(userId: string): User | null {
    const user = this.users.find(u => u.id === userId);
    return user || null;
  }

  /**
   * Get all users
   */
  getAllUsers(): User[] {
    // Return a copy of the users array to prevent external modification
    return [...this.users];
  }
}
