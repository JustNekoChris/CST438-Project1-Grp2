import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Index from './index';
import HomeScreen from './HomeScreen';
import BottomTabs from '@/components/BottomTabs';
import PC from './views/Team';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Index" component={Index} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="BottomTabs" component={BottomTabs} />
        <Stack.Screen name="PC" component={PC} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
