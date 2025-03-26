/**
 * Exercise 2: User Profile Manager
 * 
 * In this exercise, you'll implement a user profile management system
 * that demonstrates advanced object manipulation in TypeScript.
 */

// TODO: Define an Address interface with:
// - street: string
// - city: string
// - state: string
// - postalCode: string
// - country: string


// TODO: Define a SocialMedia type using an index signature
// that allows any social media platform name (string) as a key
// and has string values (for the social media handles/URLs)


// TODO: Define a UserProfile interface with:
// - id: readonly string (should not be modifiable after creation)
// - firstName: string
// - lastName: string
// - birthDate: Date
// - email: string
// - address: Address
// - phoneNumbers: object with 'home', 'work', and 'mobile' as optional string properties
// - socialMedia: SocialMedia object
// - settings: object with 'emailNotifications', 'smsNotifications', 'darkMode' as boolean properties
// - tags: string array (for user interests or categories)


// TODO: Create a function called 'createUserProfile' that:
// - Takes firstName, lastName, email as required parameters
// - Takes an options object for all other properties as an optional parameter
// - Returns a complete UserProfile object with default values for missing properties


// TODO: Create at least 2 user profiles using your createUserProfile function


// TODO: Implement a function called 'updateUserProfile' that:
// - Takes a user profile and an update object (partial UserProfile)
// - Returns a new user profile with the updates applied
// - Uses object spreading to preserve unmodified properties
// - Does not allow changing the id property


// TODO: Implement a function 'getUserDisplayName' that:
// - Takes a user profile
// - Uses object destructuring to extract firstName and lastName
// - Returns a formatted full name


// TODO: Implement a function 'findUsersByInterest' that:
// - Takes an array of user profiles and an interest tag
// - Returns all users that have that interest in their tags array


// TODO: Implement a function 'printUserContactInfo' that:
// - Takes a user profile
// - Uses nested destructuring to extract email, phone numbers, and address
// - Prints a formatted summary of all available contact information


// Demonstration code - uncomment and run to test your implementation
/*
console.log("User profiles:");
console.log(users);

console.log("\nUpdating user profile:");
const updatedUser = updateUserProfile(users[0], {
  address: { ...users[0].address, city: "New City" },
  settings: { ...users[0].settings, darkMode: true }
});
console.log(updatedUser);

console.log("\nUser display names:");
users.forEach(user => console.log(getUserDisplayName(user)));

console.log("\nFinding users with interest in 'technology':");
const techUsers = findUsersByInterest(users, "technology");
console.log(techUsers.map(getUserDisplayName));

console.log("\nContact information:");
printUserContactInfo(users[0]);
*/ 