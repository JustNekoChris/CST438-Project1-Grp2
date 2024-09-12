// Function imports necessary for the code to run

import * as React from 'react';
import { Slot } from "expo-router";
import { SessionProvider } from "@/utils/DataContext";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Component imports, that brings in web pages from other files
import Index from './sign_in';
import Home from './home';

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  return (

    // Slot acts as a default page that will send users to the sign in page if they aren't signed in yet

    <SessionProvider>

      <Slot/>

      <NavigationContainer independent = {true}>

        <Stack.Navigator initialRouteName="Index">

          <Stack.Screen name="Sign-In Page" component={Index} />
          <Stack.Screen name="Home" component={Home} />

        </Stack.Navigator>

      </NavigationContainer>

    </SessionProvider>
  );
}
