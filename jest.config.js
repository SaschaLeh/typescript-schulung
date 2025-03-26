module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src/'],
    testMatch: ['**/*.spec.ts'],
    collectCoverage: true,
    collectCoverageFrom: [
      'src/**/*.ts',
      '!src/**/*.spec.ts',
    ]
  };
  