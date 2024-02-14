module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  overrides: [],
  parserOptions: {
    project: './tsconfig.json',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'sonarjs', 'promise', 'no-relative-import-paths', 'prefer-arrow'],
  extends: [
    'standard-with-typescript',
    'plugin:import/typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:sonarjs/recommended',
  ],
  rules: {
    '@typescript-eslint/no-empty-interface': ['off'],
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/restrict-template-expressions': 'off',
    'import/no-named-as-default': 'off',
    'promise/always-return': 'error',
    'promise/no-return-wrap': 'error',
    'promise/param-names': 'error',
    'promise/catch-or-return': 'error',
    'promise/no-native': 'off',
    'promise/no-nesting': 'warn',
    'promise/no-promise-in-callback': 'warn',
    'promise/no-callback-in-promise': 'warn',
    'promise/avoid-new': 'warn',
    'promise/no-new-statics': 'error',
    'promise/no-return-in-finally': 'warn',
    'promise/valid-params': 'warn',
    'sonarjs/no-duplicate-string': 'off',
    curly: ['error', 'all'],
    'max-depth': ['error', 2],
    complexity: ['error', 4],
    'object-shorthand': 'error',
    'max-lines': ['error', 200],
    'max-params': ['error', 3],
    'no-console': 'error',
    'no-unused-vars': 'error',
    'no-duplicate-imports': 'error',
    'no-restricted-syntax': [
      'error',
      {
        selector: "VariableDeclaration[kind = 'let'] > VariableDeclarator[init = null]:not([id.typeAnnotation])",
        message: 'Type must be inferred at variable declaration',
      },
    ],
    'no-restricted-imports': [
      'error',
      {
        paths: [
          {
            name: 'ramda/src/*',
            message: "Use `import { function } from 'ramda'`",
          },
          {
            name: 'lodash',
            message: "Use `import [package] from 'lodash/[package]'`",
          },
        ],
        patterns: ['ramda/*', '!ramda/src/*', '!date-fns/*', '!lodash/*'],
      },
    ],
    'import/order': [
      'error',
      {
        'newlines-between': 'never',
        groups: ['external', 'builtin', 'internal', 'sibling', 'parent', 'index'],
        pathGroups: [
          {
            pattern: 'src',
            group: 'internal',
          },
          {
            pattern: '@/*',
            group: 'builtin',
          },
        ],
        pathGroupsExcludedImportTypes: ['internal'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'no-relative-import-paths/no-relative-import-paths': [
      'error',
      { allowSameFolder: true, rootDir: 'src', prefix: '' },
    ],
    'prefer-arrow/prefer-arrow-functions': [
      'error',
      {
        disallowPrototype: true,
        singleReturnOnly: false,
        classPropertiesAllowed: false,
      },
    ],
    'prefer-arrow-callback': ['error', { allowNamedFunctions: true }],
    'func-style': ['error', 'expression', { allowArrowFunctions: true }],
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};
