/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/**
 * @type {import('jest').Config}
 */
const config = {
  setupFilesAfterEnv: ['./jest.setup.js'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/copy/',
  ],
  globals: {
    window: {},
  },
  transform: {
    '^.+\\.(js|jsx|mjs|cjs)$': [
      'babel-jest',
      {
        configFile: './babel.config.js',
        babelrc: false,
        envName: 'test',
      },
    ],
  },
};

module.exports = config;
