module.exports = {
	parserOptions: {
		ecmaVersion: 2019,
		sourceType: 'module'
	},
	env: {
		es6: true,
		browser: true,
	},
	plugins: [
		'svelte3'
	],
	overrides: [
		{
			files: ['**/*.svelte'],
			processor: 'svelte3/svelte3'
		}
	],
	extends: [
		'eslint:recommended',
		'airbnb-base'
	],
	rules: {
		'no-console': 'off',
		'indent': [1, 'tab'],
		'no-tabs': ['error', { allowIndentationTabs: true }],
		'quotes': ['error', 'single'],
		'semi': ['error', 'always'],

		'import/first': 'off',
		'import/no-duplicates': 'off',
		'import/no-mutable-exports': 'off',
		'import/no-unresolved': 'off',
	}
};
