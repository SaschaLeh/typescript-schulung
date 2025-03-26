// Basic Classes in TypeScript

// 1. Simple class definition
class Person {
    // Properties
    name: string;
    age: number;

    // Constructor
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    // Method
    greet(): void {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
}

// Creating instances
const person1 = new Person("Alice", 30);
const person2 = new Person("Bob", 25);

console.log("Person instances:");
person1.greet();
person2.greet();

// 2. Access modifiers
class BankAccount {
    public accountHolder: string;
    private balance: number;
    protected accountNumber: string;

    constructor(accountHolder: string, initialBalance: number) {
        this.accountHolder = accountHolder;
        this.balance = initialBalance;
        this.accountNumber = `ACC-${Math.floor(Math.random() * 10000)}`;
    }

    // Public method - accessible everywhere
    public deposit(amount: number): void {
        this.balance += amount;
        console.log(`Deposited ${amount}. New balance: ${this.balance}`);
    }

    // Public method - accessible everywhere
    public withdraw(amount: number): boolean {
        if (amount <= this.balance) {
            this.balance -= amount;
            console.log(`Withdrew ${amount}. New balance: ${this.balance}`);
            return true;
        }
        console.log(`Insufficient funds. Current balance: ${this.balance}`);
        return false;
    }

    // Public method that reveals some private data
    public getAccountInfo(): string {
        return `Account ${this.accountNumber}: ${this.accountHolder}, Balance: ${this.balance}`;
    }

    // Private method - only accessible within this class
    private calculateInterest(): number {
        return this.balance * 0.05;
    }

    // Public method that calls the private method
    public addYearlyInterest(): void {
        const interest = this.calculateInterest();
        this.balance += interest;
        console.log(`Added yearly interest of ${interest}. New balance: ${this.balance}`);
    }
}

console.log("\nBank Account example:");
const account = new BankAccount("Charlie", 1000);
console.log(account.getAccountInfo());
account.deposit(500);
account.withdraw(200);
account.addYearlyInterest();
// console.log(account.balance); // Error: Property 'balance' is private
// console.log(account.accountNumber); // Error: Property 'accountNumber' is protected

// 3. Static members
class MathUtils {
    // Static property
    public static PI: number = 3.14159;

    // Static method
    public static calculateCircleArea(radius: number): number {
        return MathUtils.PI * radius * radius;
    }

    // Static method
    public static calculateCircleCircumference(radius: number): number {
        return 2 * MathUtils.PI * radius;
    }

    // Instance method (rarely used with utility classes)
    public printPi(): void {
        console.log(`The value of PI is ${MathUtils.PI}`);
    }
}

console.log("\nStatic members example:");
console.log(`PI value: ${MathUtils.PI}`);
console.log(`Area of circle with radius 5: ${MathUtils.calculateCircleArea(5)}`);
console.log(`Circumference of circle with radius 5: ${MathUtils.calculateCircleCircumference(5)}`);

// Creating instance is not necessary for static members
const mathUtils = new MathUtils();
mathUtils.printPi();

// 4. Implementing interfaces
interface Shape {
    area(): number;
    perimeter(): number;
}

class Rectangle implements Shape {
    constructor(private width: number, private height: number) {}

    area(): number {
        return this.width * this.height;
    }

    perimeter(): number {
        return 2 * (this.width + this.height);
    }

    // Additional method specific to Rectangle
    scale(factor: number): void {
        this.width *= factor;
        this.height *= factor;
    }
}

console.log("\nClass implementing interface:");
const rectangle = new Rectangle(10, 5);
console.log(`Rectangle area: ${rectangle.area()}`);
console.log(`Rectangle perimeter: ${rectangle.perimeter()}`);
rectangle.scale(2);
console.log(`After scaling - Rectangle area: ${rectangle.area()}`);
console.log(`After scaling - Rectangle perimeter: ${rectangle.perimeter()}`); 