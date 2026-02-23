/**
 * Async Service — UserService & NotificationService
 *
 * Simulated async services for practicing Jest async testing and mocking.
 */

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface NotificationService {
  notify(message: string): Promise<void>;
}

export class UserService {
  private users: User[] = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com' },
  ];

  constructor(private notificationService?: NotificationService) {}

  async fetchUser(id: number): Promise<User> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = this.users.find(u => u.id === id);
        if (user) {
          resolve(user);
        } else {
          reject(new Error(`User with id ${id} not found`));
        }
      }, 100);
    });
  }

  async fetchUsers(): Promise<User[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([...this.users]);
      }, 100);
    });
  }

  async createUser(name: string, email: string): Promise<User> {
    const newUser: User = {
      id: this.users.length + 1,
      name,
      email,
    };
    this.users.push(newUser);

    if (this.notificationService) {
      await this.notificationService.notify(`User "${name}" created`);
    }

    return newUser;
  }

  async deleteUser(id: number): Promise<void> {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) {
      throw new Error(`User with id ${id} not found`);
    }
    const deletedUser = this.users.splice(index, 1)[0];

    if (this.notificationService) {
      await this.notificationService.notify(`User "${deletedUser.name}" deleted`);
    }
  }
}
