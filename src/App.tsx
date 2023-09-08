import React from 'react';
import { SafeAreaView, StatusBar, useColorScheme, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from '@storage';

import { Colors } from 'react-native/Libraries/NewAppScreen';

function App(): JSX.Element {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return (
        <Provider store={store}>
            <SafeAreaView style={backgroundStyle}>
                <StatusBar
                    barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                    backgroundColor={backgroundStyle.backgroundColor}
                />
                <View />
            </SafeAreaView>
        </Provider>
    );
}

export default App;
