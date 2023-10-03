/** @type {import("prettier").Config} */
const config = {
  arrowParens: 'always',
  printWidth: 120,
  singleQuote: true,
  semi: false,
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
}

module.exports = config
