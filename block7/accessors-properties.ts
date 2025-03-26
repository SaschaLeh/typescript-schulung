// Accessors and Properties in TypeScript Classes

// 1. Basic getters and setters
class Circle {
    private _radius: number;
    
    constructor(radius: number) {
        this._radius = radius;
    }
    
    // Getter
    get radius(): number {
        return this._radius;
    }
    
    // Setter with validation
    set radius(value: number) {
        if (value <= 0) {
            throw new Error("Radius must be positive");
        }
        this._radius = value;
    }
    
    // Methods that use the property
    get area(): number {
        return Math.PI * this._radius * this._radius;
    }
    
    get circumference(): number {
        return 2 * Math.PI * this._radius;
    }
}

console.log("Basic getters and setters:");
const circle = new Circle(5);
console.log(`Circle radius: ${circle.radius}`);
console.log(`Circle area: ${circle.area}`);
console.log(`Circle circumference: ${circle.circumference}`);

// Using the setter
circle.radius = 10;
console.log(`After update - Circle radius: ${circle.radius}`);
console.log(`After update - Circle area: ${circle.area}`);

// Uncomment to see the validation error
// circle.radius = -5; // Error: Radius must be positive

// 2. Readonly properties
class ConfigSettings {
    // Readonly property - can only be set in constructor
    readonly appName: string;
    readonly version: string;
    // Regular property that can be modified
    public debugMode: boolean;
    
    constructor(appName: string, version: string, debugMode: boolean = false) {
        this.appName = appName;
        this.version = version;
        this.debugMode = debugMode;
    }
    
    displaySettings(): void {
        console.log(`Application: ${this.appName}`);
        console.log(`Version: ${this.version}`);
        console.log(`Debug Mode: ${this.debugMode ? "Enabled" : "Disabled"}`);
    }
    
    // Can modify non-readonly properties
    toggleDebugMode(): void {
        this.debugMode = !this.debugMode;
        console.log(`Debug mode ${this.debugMode ? "enabled" : "disabled"}`);
    }
}

console.log("\nReadonly properties example:");
const appConfig = new ConfigSettings("MyApp", "1.0.0");
appConfig.displaySettings();

// Can modify regular properties
appConfig.debugMode = true;
console.log(`Debug mode set to: ${appConfig.debugMode}`);

// Cannot modify readonly properties
// appConfig.appName = "NewName"; // Error: Cannot assign to 'appName' because it is a read-only property
// appConfig.version = "2.0.0"; // Error: Cannot assign to 'version' because it is a read-only property

// 3. Computed properties with getters
class Temperature {
    private _celsius: number;
    
    constructor(celsius: number) {
        this._celsius = celsius;
    }
    
    get celsius(): number {
        return this._celsius;
    }
    
    set celsius(value: number) {
        this._celsius = value;
    }
    
    // Computed getter for Fahrenheit
    get fahrenheit(): number {
        return (this._celsius * 9/5) + 32;
    }
    
    // Computed setter for Fahrenheit
    set fahrenheit(value: number) {
        this._celsius = (value - 32) * 5/9;
    }
    
    // Computed getter for Kelvin
    get kelvin(): number {
        return this._celsius + 273.15;
    }
    
    // Computed setter for Kelvin
    set kelvin(value: number) {
        this._celsius = value - 273.15;
    }
    
    displayAllTemperatures(): void {
        console.log(`Temperature in Celsius: ${this.celsius.toFixed(2)}°C`);
        console.log(`Temperature in Fahrenheit: ${this.fahrenheit.toFixed(2)}°F`);
        console.log(`Temperature in Kelvin: ${this.kelvin.toFixed(2)}K`);
    }
}

console.log("\nComputed properties example:");
const temp = new Temperature(25); // 25°C
temp.displayAllTemperatures();

console.log("\nAfter setting Fahrenheit:");
temp.fahrenheit = 68; // Set to 68°F (equivalent to 20°C)
temp.displayAllTemperatures();

console.log("\nAfter setting Kelvin:");
temp.kelvin = 300; // Set to 300K (equivalent to 26.85°C)
temp.displayAllTemperatures();

// 4. Private fields with accessors (ECMAScript private fields with #)
class BankAccount2 {
    #accountNumber: string;
    #balance: number;
    public owner: string;
    
    constructor(owner: string, initialBalance: number) {
        this.#accountNumber = `ACCT-${Math.floor(Math.random() * 1000000)}`;
        this.#balance = initialBalance;
        this.owner = owner;
    }
    
    // Getter for private field
    get accountNumber(): string {
        // Return a masked version for security
        return this.#accountNumber.replace(/ACCT-(\d{4})(\d*)/, "ACCT-$1****");
    }
    
    // No setter for account number - cannot be changed
    
    // Getter for balance
    get balance(): number {
        return this.#balance;
    }
    
    // No direct setter for balance - must use methods
    
    deposit(amount: number): void {
        if (amount <= 0) {
            throw new Error("Deposit amount must be positive");
        }
        this.#balance += amount;
        console.log(`Deposited $${amount}. New balance: $${this.#balance}`);
    }
    
    withdraw(amount: number): boolean {
        if (amount <= 0) {
            throw new Error("Withdrawal amount must be positive");
        }
        
        if (amount > this.#balance) {
            console.log(`Insufficient funds. Current balance: $${this.#balance}`);
            return false;
        }
        
        this.#balance -= amount;
        console.log(`Withdrew $${amount}. New balance: $${this.#balance}`);
        return true;
    }
    
    getAccountInfo(): string {
        return `Account: ${this.accountNumber}, Owner: ${this.owner}, Balance: $${this.#balance}`;
    }
}

console.log("\nECMAScript private fields with accessors:");
const account2 = new BankAccount2("David Johnson", 1500);
console.log(account2.getAccountInfo());
console.log(`Account Number (via getter): ${account2.accountNumber}`);
console.log(`Balance (via getter): $${account2.balance}`);

account2.deposit(500);
account2.withdraw(200);

// Cannot access private fields directly
// console.log(account2.#balance); // Error: Property '#balance' is not accessible outside class 'BankAccount2'
// account2.#accountNumber = "HACK"; // Error: Property '#accountNumber' is not accessible outside class 'BankAccount2' 