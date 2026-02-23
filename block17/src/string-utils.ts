/**
 * String Utility Functions
 *
 * A collection of string helper functions for testing practice.
 * Students will write tests for these functions in their exercises.
 */

/**
 * Capitalizes the first letter of a string.
 * Returns an empty string if input is empty.
 */
export function capitalize(str: string): string {
  if (str.length === 0) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Converts a string into a URL-friendly slug.
 * - Converts to lowercase
 * - Replaces spaces and special characters with hyphens
 * - Removes consecutive hyphens
 * - Trims hyphens from start and end
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Truncates a string to a maximum length and appends "..." if truncated.
 * If maxLength is less than 3, throws an error.
 * Returns the original string if it's shorter than maxLength.
 */
export function truncate(str: string, maxLength: number): string {
  if (maxLength < 3) {
    throw new Error('maxLength must be at least 3');
  }
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + '...';
}

/**
 * Checks if a string is a palindrome (reads the same forwards and backwards).
 * Ignores case and non-alphanumeric characters.
 */
export function isPalindrome(str: string): boolean {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === cleaned.split('').reverse().join('');
}

/**
 * Counts the number of words in a string.
 * Words are separated by whitespace. Returns 0 for empty/whitespace-only strings.
 */
export function countWords(str: string): number {
  const trimmed = str.trim();
  if (trimmed.length === 0) return 0;
  return trimmed.split(/\s+/).length;
}
