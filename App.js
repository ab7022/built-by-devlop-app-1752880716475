import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import Navigation from './src/navigation';
import { Provider } from 'react-redux';
import store from './src/store';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';

export default function App() {
  const colorScheme = useColorScheme();
  return (
    <Provider store={store}>
      <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <Navigation />
      </NavigationContainer>
    </Provider>
  );
}
