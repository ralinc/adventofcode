module.exports = {
  env: {es2021: true},
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
    'prettier'
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'import'],
  settings: {
    'import/resolver': {node: {extensions: '.ts'}},
    'import/parsers': {'@typescript-eslint/parser': '.ts'}
  },
  rules: {
    'default-case': 'off',
    'no-console': 'off'
  }
}
