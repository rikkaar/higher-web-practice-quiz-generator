/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
	bracketSpacing: false,
	semi: false,
	singleQuote: true,
	singleAttributePerLine: true,
	printWidth: 120,
	tabWidth: 2,
	useTabs: true,
	endOfLine: 'auto',
	plugins: ['prettier-plugin-css-order'],
}

export default config
