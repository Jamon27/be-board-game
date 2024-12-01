export default {
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'], // Treat TypeScript files as ESM
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { useESM: true }], // Use ts-jest for TypeScript with ESM
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1', // Map .js imports to proper paths if necessary
  },
};
