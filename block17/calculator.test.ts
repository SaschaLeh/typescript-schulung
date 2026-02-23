/**
 * Calculator Test — Lehrbeispiel
 *
 * Dieser Test demonstriert die wichtigsten Jest-Konzepte:
 * - describe / it / test Blöcke
 * - beforeEach für Setup
 * - Matchers: toBe, toEqual, toThrow
 * - Arrange-Act-Assert Pattern (AAA)
 */

import { Calculator } from './src/calculator';

describe('Calculator', () => {
  let calculator: Calculator;

  // beforeEach: Vor jedem Test eine frische Instanz erstellen
  beforeEach(() => {
    calculator = new Calculator();
  });

  // --- Addition ---
  describe('add', () => {
    it('should add two positive numbers', () => {
      // Arrange: calculator ist bereits erstellt (beforeEach)
      // Act: Operation ausführen
      const result = calculator.add(2, 3);
      // Assert: Ergebnis prüfen
      expect(result).toBe(5);
    });

    it('should add negative numbers', () => {
      expect(calculator.add(-1, -2)).toBe(-3);
    });

    it('should add zero', () => {
      expect(calculator.add(5, 0)).toBe(5);
    });
  });

  // --- Subtraktion ---
  describe('subtract', () => {
    it('should subtract two numbers', () => {
      expect(calculator.subtract(10, 4)).toBe(6);
    });

    it('should handle negative results', () => {
      expect(calculator.subtract(3, 7)).toBe(-4);
    });
  });

  // --- Multiplikation ---
  describe('multiply', () => {
    it('should multiply two numbers', () => {
      expect(calculator.multiply(3, 4)).toBe(12);
    });

    it('should return zero when multiplied by zero', () => {
      expect(calculator.multiply(5, 0)).toBe(0);
    });

    it('should handle negative numbers', () => {
      expect(calculator.multiply(-3, 4)).toBe(-12);
      expect(calculator.multiply(-3, -4)).toBe(12);
    });
  });

  // --- Division ---
  describe('divide', () => {
    it('should divide two numbers', () => {
      expect(calculator.divide(10, 2)).toBe(5);
    });

    it('should handle decimal results', () => {
      expect(calculator.divide(7, 2)).toBe(3.5);
    });

    // toThrow Matcher: prüft ob eine Exception geworfen wird
    it('should throw an error when dividing by zero', () => {
      expect(() => calculator.divide(10, 0)).toThrow('Division by zero');
    });

    it('should throw an Error instance when dividing by zero', () => {
      expect(() => calculator.divide(10, 0)).toThrow(Error);
    });
  });

  // --- History ---
  describe('history', () => {
    it('should start with an empty history', () => {
      // toEqual: deep equality für Arrays und Objekte
      expect(calculator.history()).toEqual([]);
    });

    it('should track operations', () => {
      calculator.add(1, 2);
      calculator.multiply(3, 4);

      const history = calculator.history();

      expect(history).toHaveLength(2);
      expect(history[0]).toBe('1 + 2 = 3');
      expect(history[1]).toBe('3 * 4 = 12');
    });

    it('should return a copy of the history (not the original)', () => {
      calculator.add(1, 2);
      const history1 = calculator.history();
      const history2 = calculator.history();

      // toEqual: gleicher Inhalt
      expect(history1).toEqual(history2);
      // not.toBe: aber nicht dasselbe Array-Objekt (Immutability)
      expect(history1).not.toBe(history2);
    });

    it('should clear history', () => {
      calculator.add(1, 2);
      calculator.subtract(5, 3);
      expect(calculator.history()).toHaveLength(2);

      calculator.clearHistory();
      expect(calculator.history()).toHaveLength(0);
      expect(calculator.history()).toEqual([]);
    });
  });
});
