// @ts-check

/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  semi: false,
  singleQuote: true,
  bracketSpacing: false,
  printWidth: 120,
  endOfLine: 'lf',
  trailingComma: 'none',
  arrowParens: 'avoid',
  overrides: [
    {
      files: '*.ts',
      options: {
        parser: 'typescript'
      }
    },
    {
      files: '*.md',
      options: {
        printWidth: 80,
        proseWrap: 'always'
      }
    }
  ]
}

export default config
