import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import ScreenA from './ScreenA';  Replace with actual screen component paths
import UserParties from '../app/(app)/userParties';

const Tab = createBottomTabNavigator();

const BottomTabs: React.FC = () => {
  return (
    <Tab.Navigator>
      {/* <Tab.Screen name="ScreenA" component={ScreenA} /> */}
      <Tab.Screen name="Team" component={UserParties} />
    </Tab.Navigator>
  );
};

export default BottomTabs;