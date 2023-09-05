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
        'no-use-before-define': ['error', {variables: false}],
        'react/jsx-filename-extension': [
            1,
            {
                extensions: ['.js', '.jsx', '.tsx'],
            },
        ],
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
        'import/no-cycle': [2, {maxDepth: 1}],
    },
    settings: {
        'import/resolver': {
            'babel-module': {},
            typescript: {},
        },
    },
};
