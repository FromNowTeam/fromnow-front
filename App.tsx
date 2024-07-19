import React from 'react';
import { Platform } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import HomeScreen from 'screens/HomeScreen';
import DetailMenuScreen from 'screens/DetailMenuScreen';

function App() {
  const Stack = createNativeStackNavigator();
  const isWeb = Platform.OS === 'web';

  return (
    <>
      {!isWeb && (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              options={{headerShown: false}}
              component={HomeScreen}
            />
          <Stack.Screen
            name="DetailMenu"
            options={{headerShown: false}}
            component={DetailMenuScreen}
            />
        </Stack.Navigator>
      </NavigationContainer>
      )}
      {isWeb && (
        <Routes>
        <Router>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/menu/detail" element={<DetailMenuScreen />} />
        </Router>
      </Routes>
      )}
    </>
  );
}

export default App;
