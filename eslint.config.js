const js = require('@eslint/js');
const eslintPluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const stylistic = require('@stylistic/eslint-plugin');
const globals = require('globals');

module.exports = [
  // GLOBAL IGNORES (must be the first object)
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '.gitignore',
      '.eslintignore',
      '.prettierignore',
      'package-lock.json',
      'LICENSE*',
      'README.md',
      '**/*.log',
      '**/*.lock',
      '**/*.png',
    ],
  },

  // EXTENDED CONFIGS

  // extends: [
  //   'eslint:recommended',
  //   'plugin:prettier/recommended',
  //   'prettier',
  // ],
  js.configs.recommended,
  eslintPluginPrettierRecommended,

  // 3. PROJECT CONFIGURATION
  {
    // This will replace 'env', 'parserOptions', and 'globals'.
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        // CUSTOM GLOBALS
        PUBLIC_URL: 'readonly',
        NODE_ENV: 'readonly',
        Sowngwala: 'readonly',

        // ENV DEFINITIONS
        // env: { es6: true, browser: true, node: true, jest: true }

        ...globals.browser,
        ...globals.node,
        ...globals.es2021, // Includes es6+
        ...globals.jest,
      },
    },

    // PLUGINS
    // plugins: ['prettier', '@stylistic'],

    plugins: {
      '@stylistic': stylistic,
    },

    // Replaces settings
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js'],
          paths: ['./src', './src.check', './tools'],
        },
      },
    },

    // ACTIVE RULES
    rules: {
      'prettier/prettier': 'error',

      // Uncomment these later, and it is ready to go.
      // '@stylistic/max-len': [
      //   'error',
      //   {
      //     code: 60,
      //     ignoreComments: true,
      //     ignoreStrings: true,
      //     ignoreTemplateLiterals: true,
      //   },
      // ],
    },
  },
];
