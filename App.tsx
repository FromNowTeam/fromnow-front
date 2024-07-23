import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomeScreen from 'screens/HomeScreen';
import SignInScreen from 'screens/SignInScreen';

function App() {
  const Stack = createNativeStackNavigator();
  const isWeb = Platform.OS === 'web';

  return (
    <>
      {!isWeb && (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
            <Stack.Screen name="SignIn" options={{ headerShown: false }} component={SignInScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      )}
      {isWeb && (
        <Router>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/signin" element={<SignInScreen />} />
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;
