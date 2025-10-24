import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import QuestScreen from './src/screens/QuestScreen';
import ResultScreen from './src/screens/ResultScreen';
import ProgressScreen from './src/screens/ProgressScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import PrayerScreen from './src/screens/PrayerScreen';
import EncourageScreen from './src/screens/EncourageScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />

        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Quest" component={QuestScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
        <Stack.Screen name="Progress" component={ProgressScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Encourage" component={EncourageScreen} />
        <Stack.Screen name="Prayer" component={PrayerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
