// Constructors and Initialization in TypeScript Classes

// 1. Basic constructor
class User {
    public username: string;
    public email: string;
    
    constructor(username: string, email: string) {
        this.username = username;
        this.email = email;
    }
    
    displayInfo(): void {
        console.log(`User: ${this.username}, Email: ${this.email}`);
    }
}

const user1 = new User("johndoe", "john@example.com");
console.log("Basic constructor example:");
user1.displayInfo();

// 2. Parameter properties shorthand
class Employee {
    // Parameter properties - combines declaration and initialization
    constructor(
        public id: number,
        public name: string,
        private salary: number,
        protected department: string
    ) {
        // No need to assign this.property = property
        // TypeScript does it automatically for parameter properties
    }
    
    displayInfo(): void {
        console.log(`Employee ${this.id}: ${this.name}`);
        console.log(`Department: ${this.department}`);
        console.log(`Salary: $${this.salary}`);
    }
    
    giveRaise(amount: number): void {
        this.salary += amount;
        console.log(`${this.name} received a raise of $${amount}. New salary: $${this.salary}`);
    }
}

console.log("\nParameter properties example:");
const employee1 = new Employee(1, "Alice Smith", 75000, "Engineering");
employee1.displayInfo();
employee1.giveRaise(5000);

// 3. Default values in constructors
class Product {
    constructor(
        public id: number,
        public name: string,
        public price: number,
        public inStock: boolean = true,
        public category: string = "Uncategorized"
    ) {}
    
    displayInfo(): void {
        console.log(`Product: ${this.name} (ID: ${this.id})`);
        console.log(`Price: $${this.price}`);
        console.log(`Category: ${this.category}`);
        console.log(`In stock: ${this.inStock ? "Yes" : "No"}`);
    }
}

console.log("\nDefault parameter values example:");
// Using default values for the last two parameters
const product1 = new Product(101, "Laptop", 999.99);
product1.displayInfo();

// Specifying all values
const product2 = new Product(102, "Headphones", 149.99, false, "Electronics");
product2.displayInfo();

// 4. Property initialization outside constructor
class Task {
    public id: number;
    public title: string;
    public completed: boolean = false; // Default value
    public createdAt: Date = new Date(); // Default is current time
    public priority: number; // Will be initialized in constructor
    
    constructor(id: number, title: string, priority: number = 1) {
        this.id = id;
        this.title = title;
        this.priority = priority;
    }
    
    displayInfo(): void {
        console.log(`Task #${this.id}: ${this.title}`);
        console.log(`Priority: ${this.priority}`);
        console.log(`Completed: ${this.completed ? "Yes" : "No"}`);
        console.log(`Created at: ${this.createdAt.toLocaleString()}`);
    }
    
    complete(): void {
        this.completed = true;
        console.log(`Task "${this.title}" marked as completed`);
    }
}

console.log("\nProperty initialization outside constructor:");
const task1 = new Task(1, "Complete TypeScript training");
task1.displayInfo();
task1.complete();
console.log(`Task completion status: ${task1.completed}`);

// 5. Constructor overloading with function overloads
class Message {
    public content: string;
    public sender: string;
    public recipient: string;
    public timestamp: Date;
    
    // Overload signatures
    constructor(content: string, sender: string, recipient: string);
    constructor(content: string, sender: string, recipient: string, timestamp: Date);
    
    // Implementation signature
    constructor(content: string, sender: string, recipient: string, timestamp?: Date) {
        this.content = content;
        this.sender = sender;
        this.recipient = recipient;
        this.timestamp = timestamp || new Date(); // Use provided timestamp or current date
    }
    
    displayInfo(): void {
        console.log(`From: ${this.sender} | To: ${this.recipient}`);
        console.log(`Time: ${this.timestamp.toLocaleString()}`);
        console.log(`Message: ${this.content}`);
    }
}

console.log("\nConstructor overloading example:");
// Using the first overload (without timestamp)
const message1 = new Message("Hello, how are you?", "Alice", "Bob");
message1.displayInfo();

// Using the second overload (with timestamp)
const pastDate = new Date(2023, 0, 15, 10, 30); // January 15, 2023, 10:30 AM
const message2 = new Message("Project meeting tomorrow", "Manager", "Team", pastDate);
message2.displayInfo(); 