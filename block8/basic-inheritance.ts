// Basic Inheritance in TypeScript

// Base class
class Animal {
    // Properties
    protected name: string;
    protected age: number;
    
    // Constructor
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
    
    // Methods
    public eat(): void {
        console.log(`${this.name} is eating.`);
    }
    
    public sleep(): void {
        console.log(`${this.name} is sleeping.`);
    }
    
    public makeSound(): void {
        console.log("Animal makes a generic sound");
    }
    
    public displayInfo(): void {
        console.log(`Name: ${this.name}, Age: ${this.age}`);
    }
}

// Derived class
class Dog extends Animal {
    private breed: string;
    
    constructor(name: string, age: number, breed: string) {
        // Call the parent constructor
        super(name, age);
        this.breed = breed;
    }
    
    // Method overriding
    public makeSound(): void {
        console.log(`${this.name} barks: Woof! Woof!`);
    }
    
    // Additional method specific to Dog
    public fetch(): void {
        console.log(`${this.name} is fetching the ball.`);
    }
    
    // Overriding displayInfo() to include breed
    public displayInfo(): void {
        // Call parent's displayInfo
        super.displayInfo();
        console.log(`Breed: ${this.breed}`);
    }
}

// Another derived class
class Cat extends Animal {
    private color: string;
    
    constructor(name: string, age: number, color: string) {
        super(name, age);
        this.color = color;
    }
    
    // Method overriding
    public makeSound(): void {
        console.log(`${this.name} meows: Meow! Meow!`);
    }
    
    // Additional method specific to Cat
    public climb(): void {
        console.log(`${this.name} is climbing.`);
    }
    
    // Overriding displayInfo() to include color
    public displayInfo(): void {
        super.displayInfo();
        console.log(`Color: ${this.color}`);
    }
}

// Testing inheritance
console.log("Base Animal:");
const genericAnimal = new Animal("Generic Animal", 5);
genericAnimal.displayInfo();
genericAnimal.eat();
genericAnimal.sleep();
genericAnimal.makeSound();

console.log("\nDog (derived from Animal):");
const dog = new Dog("Rex", 3, "German Shepherd");
dog.displayInfo();
dog.eat();       // Inherited from Animal
dog.sleep();     // Inherited from Animal
dog.makeSound(); // Overridden
dog.fetch();     // Specific to Dog

console.log("\nCat (derived from Animal):");
const cat = new Cat("Whiskers", 2, "Tabby");
cat.displayInfo();
cat.eat();       // Inherited from Animal
cat.sleep();     // Inherited from Animal
cat.makeSound(); // Overridden
cat.climb();     // Specific to Cat

// Example of protected access
class AnimalTrainer {
    public train(animal: Animal): void {
        console.log("\nTraining session:");
        // Cannot access protected properties directly
        // console.log(`Training ${animal.name}`); // Error: Property 'name' is protected
        
        // But can call methods that use protected properties
        animal.makeSound();
        animal.eat();
    }
}

const trainer = new AnimalTrainer();
trainer.train(dog);
trainer.train(cat);

// Multiple levels of inheritance
class Puppy extends Dog {
    private trainingLevel: number;
    
    constructor(name: string, age: number, breed: string, trainingLevel: number) {
        super(name, age, breed);
        this.trainingLevel = trainingLevel;
    }
    
    // Override again
    public makeSound(): void {
        console.log(`${this.name} barks softly: Yip! Yip!`);
    }
    
    // Add new method
    public play(): void {
        console.log(`${this.name} is playing with a toy.`);
    }
    
    // Override displayInfo to include all information
    public displayInfo(): void {
        super.displayInfo();
        console.log(`Training Level: ${this.trainingLevel}/10`);
    }
}

console.log("\nPuppy (derived from Dog):");
const puppy = new Puppy("Max", 0.5, "Golden Retriever", 2);
puppy.displayInfo();
puppy.makeSound();
puppy.play(); 