// Objects in TypeScript

// 1. Basic object with implicit types
const personObj = {
    firstName: "John",
    lastName: "Doe",
    age: 30
};
console.log("Basic object:", personObj);

// TypeScript infers the type
console.log(`Name: ${personObj.firstName} ${personObj.lastName}, Age: ${personObj.age}`);

// 2. Object with explicit type annotations
const user: { id: number; name: string; email: string } = {
    id: 1,
    name: "Alice Smith",
    email: "alice@example.com"
};
console.log("\nObject with explicit type annotations:", user);

// 3. Optional properties
const product: { 
    id: number; 
    name: string; 
    price: number; 
    description?: string; // Optional property
} = {
    id: 101,
    name: "Laptop",
    price: 999.99
    // description is optional, so we can omit it
};
console.log("\nObject with optional property:", product);

// Adding the optional property later
product.description = "High-performance laptop with 16GB RAM";
console.log("After adding description:", product);

// 4. Readonly properties
interface Point {
    readonly x: number;
    readonly y: number;
}

const originPoint: Point = { x: 0, y: 0 };
console.log("\nReadonly properties:", originPoint);
// originPoint.x = 10; // Error: Cannot assign to 'x' because it is a read-only property

// 5. Index signatures for dynamic properties
interface Dictionary {
    [key: string]: string | number;
}

const dict: Dictionary = {
    name: "Bob",
    age: 25,
    occupation: "Developer"
};
console.log("\nObject with index signature:", dict);

// Adding dynamic properties
dict["location"] = "New York";
dict["salary"] = 75000;
console.log("After adding dynamic properties:", dict);

// 6. Nested objects
interface Address {
    street: string;
    city: string;
    zipCode: string;
    country: string;
}

interface Contact {
    name: string;
    email: string;
    phone: string;
    address: Address;
}

const contact: Contact = {
    name: "Charlie Brown",
    email: "charlie@example.com",
    phone: "555-123-4567",
    address: {
        street: "123 Main St",
        city: "Anytown",
        zipCode: "12345",
        country: "USA"
    }
};
console.log("\nNested object:", contact);
console.log(`${contact.name} lives at ${contact.address.street}, ${contact.address.city}`);

// 7. Object destructuring
const { name: contactName, email, address: { city, country } } = contact;
console.log("\nDestructured properties:");
console.log(`Name: ${contactName}, Email: ${email}, City: ${city}, Country: ${country}`);

// 8. Object spread
const baseSettings = {
    theme: "dark",
    fontSize: 14,
    showNotifications: true
};

const userSettings = {
    ...baseSettings,
    fontSize: 16, // Override the fontSize
    showHelp: true // Add new property
};
console.log("\nObject spread example:");
console.log("Base settings:", baseSettings);
console.log("User settings:", userSettings);

// 9. Object.keys, Object.values, Object.entries
console.log("\nObject utility methods:");
console.log("Object.keys:", Object.keys(personObj));
console.log("Object.values:", Object.values(personObj));
console.log("Object.entries:", Object.entries(personObj));

// 10. Type assertions with objects
// Sometimes we need to tell TypeScript about the type of an object
const jsonData = `{"name": "Dave", "role": "Admin", "level": 5}`;
const parsedData = JSON.parse(jsonData) as { name: string; role: string; level: number };
console.log("\nParsed JSON with type assertion:", parsedData);
console.log(`User ${parsedData.name} is ${parsedData.role} at level ${parsedData.level}`); 