// Abstract Classes in TypeScript

// 1. Abstract class definition
abstract class Shape {
    // Regular property
    public color: string;
    
    // Constructor
    constructor(color: string) {
        this.color = color;
    }
    
    // Regular method (implemented in base class)
    public displayColor(): void {
        console.log(`This shape is ${this.color}`);
    }
    
    // Abstract methods (must be implemented by derived classes)
    abstract calculateArea(): number;
    abstract calculatePerimeter(): number;
    abstract getDescription(): string;
}

// Cannot instantiate an abstract class
// const shape = new Shape("red"); // Error: Cannot create an instance of an abstract class

// 2. Concrete class extending abstract class
class Circle extends Shape {
    // Properties
    private radius: number;
    
    // Constructor
    constructor(color: string, radius: number) {
        super(color); // Call the parent constructor
        this.radius = radius;
    }
    
    // Implementation of abstract methods
    public calculateArea(): number {
        return Math.PI * this.radius * this.radius;
    }
    
    public calculatePerimeter(): number {
        return 2 * Math.PI * this.radius;
    }
    
    public getDescription(): string {
        return `A ${this.color} circle with radius ${this.radius}`;
    }
    
    // Additional method specific to Circle
    public scale(factor: number): void {
        this.radius *= factor;
    }
}

// Another concrete class
class Rectangle extends Shape {
    // Properties
    private width: number;
    private height: number;
    
    // Constructor
    constructor(color: string, width: number, height: number) {
        super(color);
        this.width = width;
        this.height = height;
    }
    
    // Implementation of abstract methods
    public calculateArea(): number {
        return this.width * this.height;
    }
    
    public calculatePerimeter(): number {
        return 2 * (this.width + this.height);
    }
    
    public getDescription(): string {
        return `A ${this.color} rectangle with width ${this.width} and height ${this.height}`;
    }
    
    // Additional methods specific to Rectangle
    public isSquare(): boolean {
        return this.width === this.height;
    }
}

// 3. Using the concrete classes
console.log("Working with abstract classes:");

const circle = new Circle("blue", 5);
console.log(circle.getDescription());
console.log(`Area: ${circle.calculateArea().toFixed(2)}`);
console.log(`Perimeter: ${circle.calculatePerimeter().toFixed(2)}`);
circle.displayColor(); // Method from the abstract class

const rectangle = new Rectangle("green", 4, 6);
console.log(`\n${rectangle.getDescription()}`);
console.log(`Area: ${rectangle.calculateArea()}`);
console.log(`Perimeter: ${rectangle.calculatePerimeter()}`);
console.log(`Is square: ${rectangle.isSquare()}`);
rectangle.displayColor(); // Method from the abstract class

const square = new Rectangle("red", 5, 5);
console.log(`\n${square.getDescription()}`);
console.log(`Is square: ${square.isSquare()}`);

// 4. Polymorphic behavior with abstract class
function printShapeInfo(shape: Shape): void {
    console.log("\nShape Info:");
    console.log(shape.getDescription());
    console.log(`Area: ${shape.calculateArea()}`);
    console.log(`Perimeter: ${shape.calculatePerimeter()}`);
}

console.log("\nPolymorphic behavior:");
printShapeInfo(circle);
printShapeInfo(rectangle);

// 5. Abstract class with abstract properties and optional methods
abstract class Vehicle {
    // Abstract property - subclasses must implement
    abstract type: string;
    
    // Regular property
    constructor(public brand: string, public year: number) {}
    
    // Regular method
    public displayInfo(): void {
        console.log(`Brand: ${this.brand}, Year: ${this.year}, Type: ${this.type}`);
    }
    
    // Abstract method
    abstract start(): void;
    
    // Method with default implementation that can be overridden
    public honk(): void {
        console.log("Beep beep!");
    }
}

// Implementing the abstract class
class Car extends Vehicle {
    // Implementing abstract property
    type: string = "Car";
    
    constructor(brand: string, year: number, public numDoors: number) {
        super(brand, year);
    }
    
    // Implementing abstract method
    public start(): void {
        console.log(`The ${this.brand} car starts with a quiet hum`);
    }
    
    // Override default method
    public honk(): void {
        console.log("Car horn: Honk honk!");
    }
    
    // Additional method
    public drive(): void {
        console.log(`Driving the ${this.brand} car`);
    }
}

class Truck extends Vehicle {
    // Implementing abstract property
    type: string = "Truck";
    
    constructor(brand: string, year: number, public loadCapacity: number) {
        super(brand, year);
    }
    
    // Implementing abstract method
    public start(): void {
        console.log(`The ${this.brand} truck starts with a loud rumble`);
    }
    
    // Additional method
    public load(amount: number): void {
        console.log(`Loading ${amount} tons of cargo (max capacity: ${this.loadCapacity} tons)`);
    }
}

console.log("\nAbstract classes with abstract properties:");
const car = new Car("Toyota", 2022, 4);
car.displayInfo();
car.start();
car.honk();
car.drive();

const truck = new Truck("Volvo", 2020, 10);
truck.displayInfo();
truck.start();
truck.honk(); // Uses the default implementation
truck.load(8); 