import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import ScreenA from './ScreenA';  Replace with actual screen component paths
import Team from '../app/views/Team';

const Tab = createBottomTabNavigator();

const BottomTabs: React.FC = () => {
  return (
    <Tab.Navigator>
      {/* <Tab.Screen name="ScreenA" component={ScreenA} /> */}
      <Tab.Screen name="Team" component={Team} />
    </Tab.Navigator>
  );
};

export default BottomTabs;