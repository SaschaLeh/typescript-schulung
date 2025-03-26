/**
 * Exercise 2: User Profile Manager (SOLUTION)
 */

// Define Address interface
interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  zipCode: string;
  country: string;
}

// Define SocialMedia type with index signature
interface SocialMedia {
  [platform: string]: string;
}

// Define UserProfile interface
interface UserProfile {
  readonly id: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  email: string;
  address: Address;
  phoneNumbers: {
    home?: string;
    work?: string;
    mobile?: string;
  };
  socialMedia: SocialMedia;
  settings: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    darkMode: boolean;
  };
  tags: string[];
}

// Function to create a user profile
function createUserProfile(
  firstName: string,
  lastName: string,
  email: string,
  options: Partial<Omit<UserProfile, 'id' | 'firstName' | 'lastName' | 'email'>> = {}
): UserProfile {
  return {
    id: `user_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    firstName,
    lastName,
    email,
    birthDate: options.birthDate || new Date(),
    address: options.address || {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      zipCode: '',
      country: ''
    },
    phoneNumbers: options.phoneNumbers || {},
    socialMedia: options.socialMedia || {},
    settings: options.settings || {
      emailNotifications: true,
      smsNotifications: false,
      darkMode: false
    },
    tags: options.tags || []
  };
}

// Create example users
const users: UserProfile[] = [
  createUserProfile("John", "Doe", "john.doe@example.com", {
    birthDate: new Date(1990, 5, 15),
    address: {
      street: "123 Main St",
      city: "Boston",
      state: "MA",
      postalCode: "02108",
      zipCode: "02108",
      country: "USA"
    },
    phoneNumbers: {
      mobile: "555-123-4567",
      work: "555-987-6543"
    },
    socialMedia: {
      twitter: "@johndoe",
      linkedin: "linkedin.com/in/johndoe",
      instagram: "instagram.com/johndoe"
    },
    tags: ["technology", "photography", "travel"]
  }),
  createUserProfile("Jane", "Smith", "jane.smith@example.com", {
    birthDate: new Date(1988, 2, 22),
    address: {
      street: "456 Oak Ave",
      city: "San Francisco",
      state: "CA",
      postalCode: "94105",
      zipCode: "94105",
      country: "USA"
    },
    phoneNumbers: {
      mobile: "555-234-5678"
    },
    socialMedia: {
      twitter: "@janesmith",
      facebook: "facebook.com/janesmith"
    },
    settings: {
      emailNotifications: true,
      smsNotifications: true,
      darkMode: true
    },
    tags: ["art", "music", "technology", "cooking"]
  })
];

// Function to update a user profile
function updateUserProfile(user: UserProfile, updates: Partial<Omit<UserProfile, 'id'>>): UserProfile {
  return {
    ...user,
    ...updates
  };
}

// Function to get a user's display name
function getUserDisplayName(user: UserProfile): string {
  const { firstName, lastName } = user;
  return `${firstName} ${lastName}`;
}

// Function to find users by interest tag
function findUsersByInterest(users: UserProfile[], interest: string): UserProfile[] {
  return users.filter(user => user.tags.includes(interest));
}

// Function to print user contact information
function printUserContactInfo(user: UserProfile): void {
  const { email, phoneNumbers: { mobile, home, work }, address } = user;
  
  console.log(`Contact information for ${getUserDisplayName(user)}:`);
  console.log(`Email: ${email}`);
  
  if (mobile) console.log(`Mobile: ${mobile}`);
  if (home) console.log(`Home: ${home}`);
  if (work) console.log(`Work: ${work}`);
  
  console.log(`Address: ${address.street}, ${address.city}, ${address.state} ${address.postalCode}, ${address.country}`);
}

// Demonstration code
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