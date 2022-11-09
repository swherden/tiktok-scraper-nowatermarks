module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: ['airbnb-base', 'prettier'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'prettier'],
    rules: {
        'prettier/prettier': ['error'],
        'import/no-unresolved': 'off',
        'import/extensions': 'off',
        'no-bitwise': 'off',
        camelcase: 'off',
        'lines-between-class-members': 'off',
        'import/prefer-default-export': 'off',
        'no-console': 'off',
        'no-async-promise-executor': 'off',
        'class-methods-use-this': 'off',
        'no-restricted-syntax': 'off',
        'no-plusplus': 'off',
    },
    overrides: [
        {
            files: ['*.ts'],
            rules: {
                '@typescript-eslint/no-unused-vars': [2, { args: 'none' }],
            },
        },
        {
            files: ['*.test.ts'],
            env: {
                jest: true,
            },
        },
    ],
};
