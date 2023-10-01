module.exports = {
    root: true,
    extends: [
        'airbnb',
        'plugin:@typescript-eslint/recommended',
        'prettier',
        'plugin:react-hooks/recommended',
    ],
    plugins: ['@babel', '@typescript-eslint', 'module-resolver', 'import'],
    rules: {
        '@typescript-eslint/no-shadow': ['error'], // to deal with Enums properly
        '@typescript-eslint/no-unused-vars': [
            'error',
            { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
        ],

        'arrow-body-style': 'off',

        'no-use-before-define': ['error', { variables: false }],

        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
            },
        ],
        'import/no-cycle': [2, { maxDepth: 1 }],
        'import/prefer-default-export': 'off',

        'react/jsx-filename-extension': [
            1,
            {
                extensions: ['.js', '.jsx', '.tsx'],
            },
        ],

        'no-shadow': 'off', // to deal with enums properly
    },
    settings: {
        'import/resolver': {
            'babel-module': {},
            typescript: {},
        },
    },
};
