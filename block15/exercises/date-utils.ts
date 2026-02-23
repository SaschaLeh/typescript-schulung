/**
 * Exercise 2: Date Utilities
 *
 * In this exercise, you'll implement utility functions for working with
 * the JavaScript Date API. Focus on immutability and locale-aware formatting.
 */

// ============================================================
// Task 1: Implement formatDate()
// ============================================================
// formatDate(date: Date, locale: string): string
//   - Use Intl.DateTimeFormat to format the date
//   - Include weekday (long), day (numeric), month (long), year (numeric)
//   - Example: formatDate(new Date(2024, 0, 15), "de-DE")
//     → "Montag, 15. Januar 2024"

// TODO: Implement formatDate here
export function formatDate(date: Date, locale: string): string {
  // Implement this function
  return null as any; // Replace this line
}

// ============================================================
// Task 2: Implement calculateAge()
// ============================================================
// calculateAge(birthDate: Date): number
//   - Calculate the age in full years based on today's date
//   - Handle the case where the birthday hasn't occurred yet this year
//   - Example: If born on 2000-06-15 and today is 2024-03-10, age = 23

// TODO: Implement calculateAge here
export function calculateAge(birthDate: Date): number {
  // Implement this function
  return null as any; // Replace this line
}

// ============================================================
// Task 3: Implement addDays()
// ============================================================
// addDays(date: Date, days: number): Date
//   - Return a NEW Date object with the given number of days added
//   - IMPORTANT: Do NOT mutate the original date!
//   - Support negative values (subtracting days)
//   - Example: addDays(new Date(2024, 0, 15), 10) → January 25, 2024

// TODO: Implement addDays here
export function addDays(date: Date, days: number): Date {
  // Implement this function
  return null as any; // Replace this line
}

// ============================================================
// Task 4: Implement isWeekend()
// ============================================================
// isWeekend(date: Date): boolean
//   - Return true if the date falls on Saturday (6) or Sunday (0)
//   - Hint: Use getDay() — 0 = Sunday, 6 = Saturday

// TODO: Implement isWeekend here
export function isWeekend(date: Date): boolean {
  // Implement this function
  return null as any; // Replace this line
}

// ============================================================
// Task 5: Implement getRelativeTime()
// ============================================================
// getRelativeTime(date: Date): string
//   - Compare the given date with the current date/time
//   - Return a human-readable relative time string in German:
//     - Less than 60 seconds: "gerade eben"
//     - Less than 60 minutes: "vor X Minuten" / "in X Minuten"
//     - Less than 24 hours:   "vor X Stunden" / "in X Stunden"
//     - Less than 30 days:    "vor X Tagen" / "in X Tagen"
//     - Otherwise:            "vor X Monaten" / "in X Monaten"
//   - Past dates use "vor ...", future dates use "in ..."
//
// Hint: Calculate the difference in milliseconds, then convert to the
// appropriate unit. Use Math.floor() for rounding.

// TODO: Implement getRelativeTime here
export function getRelativeTime(date: Date): string {
  // Implement this function
  return null as any; // Replace this line
}

// ============================================================
// Test your functions here
// ============================================================

function testExercise2(): void {
  console.log("=== Testing formatDate ===");
  // console.log(formatDate(new Date(2024, 0, 15), "de-DE"));
  // console.log(formatDate(new Date(2024, 5, 1), "en-US"));

  console.log("\n=== Testing calculateAge ===");
  // console.log("Age:", calculateAge(new Date(1990, 5, 15)));
  // console.log("Age:", calculateAge(new Date(2000, 0, 1)));

  console.log("\n=== Testing addDays ===");
  // const base = new Date(2024, 0, 15);
  // console.log("Base:", base.toLocaleDateString("de-DE"));
  // console.log("+10 days:", addDays(base, 10).toLocaleDateString("de-DE"));
  // console.log("-5 days:", addDays(base, -5).toLocaleDateString("de-DE"));
  // console.log("Base unchanged:", base.toLocaleDateString("de-DE"));

  console.log("\n=== Testing isWeekend ===");
  // console.log("Saturday:", isWeekend(new Date(2024, 0, 13))); // true
  // console.log("Sunday:", isWeekend(new Date(2024, 0, 14)));  // true
  // console.log("Monday:", isWeekend(new Date(2024, 0, 15)));  // false

  console.log("\n=== Testing getRelativeTime ===");
  // const now = new Date();
  // console.log(getRelativeTime(new Date(now.getTime() - 30 * 1000)));       // "gerade eben"
  // console.log(getRelativeTime(new Date(now.getTime() - 5 * 60 * 1000)));   // "vor 5 Minuten"
  // console.log(getRelativeTime(new Date(now.getTime() - 3 * 3600 * 1000))); // "vor 3 Stunden"
  // console.log(getRelativeTime(new Date(now.getTime() - 2 * 86400 * 1000)));// "vor 2 Tagen"
  // console.log(getRelativeTime(new Date(now.getTime() + 60 * 60 * 1000)));  // "in 1 Stunden"
}

// Uncomment to run the test
// testExercise2();
