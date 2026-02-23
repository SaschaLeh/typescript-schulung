/**
 * Solution 1: String Utils Tests
 */

import { capitalize, slugify, truncate, isPalindrome, countWords } from '../src/string-utils';

// ============================================================
// capitalize
// ============================================================
describe('capitalize', () => {
  it('should capitalize the first letter of a word', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  it('should not change an already capitalized string', () => {
    expect(capitalize('Hello')).toBe('Hello');
  });

  it('should return an empty string for empty input', () => {
    expect(capitalize('')).toBe('');
  });

  it('should handle single character strings', () => {
    expect(capitalize('a')).toBe('A');
  });
});

// ============================================================
// slugify
// ============================================================
describe('slugify', () => {
  it('should convert a simple string to a slug', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('should remove special characters', () => {
    expect(slugify('Hello, World!')).toBe('hello-world');
  });

  it('should handle multiple spaces', () => {
    expect(slugify('Hello   World')).toBe('hello-world');
  });

  it('should trim leading and trailing spaces', () => {
    expect(slugify('  Hello World  ')).toBe('hello-world');
  });

  it('should handle already slugified strings', () => {
    expect(slugify('hello-world')).toBe('hello-world');
  });
});

// ============================================================
// truncate
// ============================================================
describe('truncate', () => {
  it('should truncate a long string and add "..."', () => {
    expect(truncate('Hello World', 8)).toBe('Hello...');
  });

  it('should not truncate a short string', () => {
    expect(truncate('Hi', 10)).toBe('Hi');
  });

  it('should return the string as-is when length equals maxLength', () => {
    expect(truncate('Hello', 5)).toBe('Hello');
  });

  it('should throw an error when maxLength is less than 3', () => {
    expect(() => truncate('Hello', 2)).toThrow();
  });

  it('should throw with the correct error message', () => {
    expect(() => truncate('Hello', 2)).toThrow('maxLength must be at least 3');
  });
});

// ============================================================
// isPalindrome
// ============================================================
describe('isPalindrome', () => {
  it('should detect a simple palindrome', () => {
    expect(isPalindrome('racecar')).toBeTruthy();
  });

  it('should be case-insensitive', () => {
    expect(isPalindrome('RaceCar')).toBeTruthy();
  });

  it('should ignore spaces and punctuation', () => {
    expect(isPalindrome('A man, a plan, a canal: Panama')).toBeTruthy();
  });

  it('should return false for non-palindromes', () => {
    expect(isPalindrome('hello')).toBeFalsy();
  });

  it('should handle single characters', () => {
    expect(isPalindrome('a')).toBeTruthy();
  });

  it('should handle empty strings', () => {
    expect(isPalindrome('')).toBeTruthy();
  });
});

// ============================================================
// countWords
// ============================================================
describe('countWords', () => {
  it('should count words in a simple sentence', () => {
    expect(countWords('Hello World')).toBe(2);
  });

  it('should handle multiple spaces between words', () => {
    expect(countWords('Hello   World   Foo')).toBe(3);
  });

  it('should return 0 for an empty string', () => {
    expect(countWords('')).toBe(0);
  });

  it('should return 0 for whitespace-only strings', () => {
    expect(countWords('   ')).toBe(0);
  });

  it('should count a single word', () => {
    expect(countWords('Hello')).toBe(1);
  });
});
