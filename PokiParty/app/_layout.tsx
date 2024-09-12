import * as React from 'react';
import { Stack } from "expo-router";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export default function RootLayout() {
  return (

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="index"
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
