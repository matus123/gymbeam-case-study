module.exports = {
    parser: '@typescript-eslint/parser',
    extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', 'plugin:import/typescript'],
    plugins: ['@typescript-eslint', 'simple-import-sort', 'import'],
    settings: {},
    rules: {
        'max-depth': ['error', 3],
        '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
        'no-unused-vars': 'off',
        '@typescript-eslint/explicit-function-return-type': [
            0,
            {
                allowExpressions: true,
                allowTypedFunctionExpressions: true,
            },
        ],
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/no-parameter-properties': 'off',
        '@typescript-eslint/consistent-type-assertions': ['error'],
        '@typescript-eslint/no-unused-vars': [
            'warn',
            {
                vars: 'all',
                args: 'after-used',
                ignoreRestSiblings: false,
                argsIgnorePattern: '^_',
            },
        ],
        // disabled because it breaks DI in Nestjs
        // https://github.com/typescript-eslint/typescript-eslint/issues/2559
        // '@typescript-eslint/consistent-type-imports': 'error',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        eqeqeq: ['error', 'smart'],
        'simple-import-sort/imports': 'error',
    },
    overrides: [
        {
            files: ['./src/**/*.ts'],
            rules: {
                'import/no-extraneous-dependencies': [
                    'error',
                    { devDependencies: ['./tests/**/*.ts', './src/**/__tests__/*.ts'] },
                ],
            },
        },
    ],
};
