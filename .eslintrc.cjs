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
  parser: '@typescript-eslint/parser',
  parserOptions: {sourceType: 'module'},
  plugins: ['@typescript-eslint', 'import'],
  settings: {
    'import/resolver': {node: {extensions: ['.js', '.ts']}},
    'import/parsers': {'@typescript-eslint/parser': ['.ts']}
  },
  rules: {
    '@typescript-eslint/no-dupe-class-members': ['error'],
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-redeclare': 'off',
    '@typescript-eslint/no-shadow': 'off',
    '@typescript-eslint/no-unused-vars': ['error', {argsIgnorePattern: '^_', varsIgnorePattern: '^_'}],
    '@typescript-eslint/no-useless-constructor': ['error'],
    'arrow-body-style': 'off',
    'class-methods-use-this': 'off',
    'consistent-return': 'off',
    'default-case': 'off',
    'default-param-last': 'off',
    'func-names': 'off',
    'func-style': ['error', 'declaration', {allowArrowFunctions: true}],
    'import/extensions': ['error', 'ignorePackages', {ts: 'never'}],
    'import/no-cycle': 'off',
    'import/no-useless-path-segments': 'off',
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'lines-between-class-members': ['error', 'always', {exceptAfterSingleLine: true}],
    'max-classes-per-file': 'off',
    'max-len': ['error', {code: 120, tabWidth: 2}],
    'no-bitwise': 'off',
    'no-cond-assign': 'off',
    'no-console': 'off',
    'no-constant-condition': 'off',
    'no-continue': 'off',
    'no-dupe-class-members': 'off',
    'no-else-return': 'off',
    'no-empty-function': 'off',
    'no-empty': 'off',
    'no-lone-blocks': 'off',
    'no-nested-ternary': 'off',
    'no-new-wrappers': 'off',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'no-redeclare': 'off',
    'no-return-assign': 'off',
    'no-shadow': 'off',
    'no-underscore-dangle': 'off',
    'no-unsafe-optional-chaining': 'off',
    'no-unused-expressions': ['error', {allowShortCircuit: true}],
    'no-unused-vars': 'off',
    'no-use-before-define': 'off',
    'no-useless-constructor': 'off',
    'object-curly-spacing': 'off',
    'prefer-destructuring': ['error', {AssignmentExpression: {array: false}}],
    'dot-notation': ['error', {allowPattern: '^[a-zA-Z]+(_[a-zA-Z]+)*$'}],
    semi: ['error', 'never'],
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message:
          'for..in loops iterate over the entire prototype chain, which is virtually never what you want. ' +
          'Use Object.{keys,values,entries}, and iterate over the resulting array.'
      },
      {
        selector: 'LabeledStatement',
        message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.'
      },
      {
        selector: 'WithStatement',
        message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.'
      }
    ]
  }
}
