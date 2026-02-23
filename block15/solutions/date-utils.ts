/**
 * Exercise 2: Date Utilities (SOLUTION)
 */

// Task 1: formatDate — locale-aware formatting with Intl.DateTimeFormat
function formatDate(date: Date, locale: string): string {
  const formatter = new Intl.DateTimeFormat(locale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return formatter.format(date);
}

// Task 2: calculateAge — full years based on today's date
function calculateAge(birthDate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();

  // Check if birthday hasn't occurred yet this year
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

// Task 3: addDays — immutable date addition
function addDays(date: Date, days: number): Date {
  const result = new Date(date.getTime());
  result.setDate(result.getDate() + days);
  return result;
}

// Task 4: isWeekend — Saturday (6) or Sunday (0)
function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

// Task 5: getRelativeTime — German relative time strings
function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const absDiffMs = Math.abs(diffMs);
  const isFuture = diffMs < 0;

  const seconds = Math.floor(absDiffMs / 1000);
  const minutes = Math.floor(absDiffMs / (1000 * 60));
  const hours = Math.floor(absDiffMs / (1000 * 60 * 60));
  const days = Math.floor(absDiffMs / (1000 * 60 * 60 * 24));
  const months = Math.floor(days / 30);

  if (seconds < 60) {
    return "gerade eben";
  }

  const formatRelative = (value: number, unit: string): string => {
    return isFuture ? `in ${value} ${unit}` : `vor ${value} ${unit}`;
  };

  if (minutes < 60) {
    return formatRelative(minutes, "Minuten");
  }
  if (hours < 24) {
    return formatRelative(hours, "Stunden");
  }
  if (days < 30) {
    return formatRelative(days, "Tagen");
  }
  return formatRelative(months, "Monaten");
}

// Demo
function testExercise2(): void {
  console.log("=== Testing formatDate ===");
  console.log(formatDate(new Date(2024, 0, 15), "de-DE"));
  // → "Montag, 15. Januar 2024"
  console.log(formatDate(new Date(2024, 5, 1), "en-US"));
  // → "Saturday, June 1, 2024"
  console.log(formatDate(new Date(2024, 11, 24), "de-DE"));
  // → "Dienstag, 24. Dezember 2024"

  console.log("\n=== Testing calculateAge ===");
  console.log("Born 1990-06-15, Age:", calculateAge(new Date(1990, 5, 15)));
  console.log("Born 2000-01-01, Age:", calculateAge(new Date(2000, 0, 1)));

  console.log("\n=== Testing addDays ===");
  const base = new Date(2024, 0, 15); // 15. Januar 2024
  console.log("Base:", base.toLocaleDateString("de-DE"));
  console.log("+10 days:", addDays(base, 10).toLocaleDateString("de-DE"));
  console.log("-5 days:", addDays(base, -5).toLocaleDateString("de-DE"));
  console.log("+60 days:", addDays(base, 60).toLocaleDateString("de-DE"));
  console.log("Base unchanged:", base.toLocaleDateString("de-DE"));

  console.log("\n=== Testing isWeekend ===");
  console.log("Sa 13.01.2024:", isWeekend(new Date(2024, 0, 13))); // true
  console.log("So 14.01.2024:", isWeekend(new Date(2024, 0, 14))); // true
  console.log("Mo 15.01.2024:", isWeekend(new Date(2024, 0, 15))); // false
  console.log("Fr 19.01.2024:", isWeekend(new Date(2024, 0, 19))); // false

  console.log("\n=== Testing getRelativeTime ===");
  const now = new Date();
  console.log("30s ago:", getRelativeTime(new Date(now.getTime() - 30 * 1000)));
  console.log("5min ago:", getRelativeTime(new Date(now.getTime() - 5 * 60 * 1000)));
  console.log("3h ago:", getRelativeTime(new Date(now.getTime() - 3 * 3600 * 1000)));
  console.log("2d ago:", getRelativeTime(new Date(now.getTime() - 2 * 86400 * 1000)));
  console.log("45d ago:", getRelativeTime(new Date(now.getTime() - 45 * 86400 * 1000)));
  console.log("1h future:", getRelativeTime(new Date(now.getTime() + 60 * 60 * 1000)));
  console.log("3d future:", getRelativeTime(new Date(now.getTime() + 3 * 86400 * 1000)));
}

testExercise2();
