import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'

/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ['**/*.{ts}']},
  {languageOptions: {globals: globals.node}},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    rules: {'object-shorthand': ['error', 'always']}
  }
]
