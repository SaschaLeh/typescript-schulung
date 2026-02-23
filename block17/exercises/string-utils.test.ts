/**
 * Exercise 1: String Utils Tests
 *
 * In this exercise, you'll write tests for the string utility functions.
 * The test structure (describe/it blocks) is already provided.
 * Your task: Add the correct expect() assertions where you see TODO comments.
 *
 * Matchers to practice:
 * - toBe() — strict equality
 * - toContain() — string/array contains
 * - toMatch() — regex matching
 * - toBeTruthy() / toBeFalsy() — boolean-like checks
 * - toThrow() — exception testing
 * - toHaveLength() — array/string length
 */

import { capitalize, slugify, truncate, isPalindrome, countWords } from '../src/string-utils';

// ============================================================
// capitalize
// ============================================================
describe('capitalize', () => {
  it('should capitalize the first letter of a word', () => {
    // TODO: Test that capitalize('hello') returns 'Hello'
  });

  it('should not change an already capitalized string', () => {
    // TODO: Test that capitalize('Hello') returns 'Hello'
  });

  it('should return an empty string for empty input', () => {
    // TODO: Test that capitalize('') returns ''
  });

  it('should handle single character strings', () => {
    // TODO: Test that capitalize('a') returns 'A'
  });
});

// ============================================================
// slugify
// ============================================================
describe('slugify', () => {
  it('should convert a simple string to a slug', () => {
    // TODO: Test that slugify('Hello World') returns 'hello-world'
  });

  it('should remove special characters', () => {
    // TODO: Test that slugify('Hello, World!') returns 'hello-world'
  });

  it('should handle multiple spaces', () => {
    // TODO: Test that slugify('Hello   World') returns 'hello-world'
  });

  it('should trim leading and trailing spaces', () => {
    // TODO: Test that slugify('  Hello World  ') returns 'hello-world'
  });

  it('should handle already slugified strings', () => {
    // TODO: Test that slugify('hello-world') returns 'hello-world'
  });
});

// ============================================================
// truncate
// ============================================================
describe('truncate', () => {
  it('should truncate a long string and add "..."', () => {
    // TODO: Test that truncate('Hello World', 8) returns 'Hello...'
  });

  it('should not truncate a short string', () => {
    // TODO: Test that truncate('Hi', 10) returns 'Hi'
  });

  it('should return the string as-is when length equals maxLength', () => {
    // TODO: Test that truncate('Hello', 5) returns 'Hello'
  });

  it('should throw an error when maxLength is less than 3', () => {
    // TODO: Test that truncate('Hello', 2) throws an error
    // Hint: Use expect(() => ...).toThrow()
  });

  it('should throw with the correct error message', () => {
    // TODO: Test that the error message contains 'maxLength'
    // Hint: You can pass a string or regex to toThrow()
  });
});

// ============================================================
// isPalindrome
// ============================================================
describe('isPalindrome', () => {
  it('should detect a simple palindrome', () => {
    // TODO: Test that isPalindrome('racecar') is truthy
  });

  it('should be case-insensitive', () => {
    // TODO: Test that isPalindrome('RaceCar') is truthy
  });

  it('should ignore spaces and punctuation', () => {
    // TODO: Test that isPalindrome('A man, a plan, a canal: Panama') is truthy
  });

  it('should return false for non-palindromes', () => {
    // TODO: Test that isPalindrome('hello') is falsy
  });

  it('should handle single characters', () => {
    // TODO: Test that isPalindrome('a') is truthy
  });

  it('should handle empty strings', () => {
    // TODO: Test that isPalindrome('') is truthy
  });
});

// ============================================================
// countWords
// ============================================================
describe('countWords', () => {
  it('should count words in a simple sentence', () => {
    // TODO: Test that countWords('Hello World') returns 2
  });

  it('should handle multiple spaces between words', () => {
    // TODO: Test that countWords('Hello   World   Foo') returns 3
  });

  it('should return 0 for an empty string', () => {
    // TODO: Test that countWords('') returns 0
  });

  it('should return 0 for whitespace-only strings', () => {
    // TODO: Test that countWords('   ') returns 0
  });

  it('should count a single word', () => {
    // TODO: Test that countWords('Hello') returns 1
  });
});
