module.exports = {
    testEnvironment: 'node',
    preset: 'react-native',
    transformIgnorePatterns: [
        'node_modules/(?!@react-native|react-native|react-navigation|@react-navigation|@react-native-community)',
    ],
};
