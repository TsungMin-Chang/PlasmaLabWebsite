module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    '@sup39/eslint-config-typescript',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    GeolocationPosition: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2022,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
    'require-atomic-updates': 'off',
    'no-useless-call': 'warn',
    'no-useless-concat': 'warn',
    'no-useless-escape': 'error',
    'no-useless-return': 'warn',
    'no-useless-rename': 'warn',
    'no-useless-computed-key': 'warn',
    'no-extra-parens': [
      "error", "all", { 
        "nestedBinaryExpressions": false,
        "ignoreJSX": "all",
      },
    ],
    'no-var': 'warn',
    'space-infix-ops': ["error", { "int32Hint": false }],
    'no-lonely-if': 'warn',
    'no-lone-blocks': 'warn',
    'no-label-var': 'warn',
    'no-unneeded-ternary': ["error", { "defaultAssignment": true }],
    'newline-per-chained-call': ['warn', { "ignoreChainWithDepth": 1 }],
  },
};
