import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import ScreenA from './ScreenA';  Replace with actual screen component paths
import Search from '@/app/(app)/search';
import UserPC from '@/app/(app)/userPC';
import UserParties from '@/app/(app)/userParties';
import LogOut from './LogOut';

const Tab = createBottomTabNavigator();

const BottomTabs: React.FC = () => {

  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      {/* <Tab.Screen name="ScreenA" component={ScreenA} /> */}
      <Tab.Screen name="Search" component={Search}/>
      <Tab.Screen name="Teams" component={UserParties} />
      <Tab.Screen name="PC " component={UserPC}/>
      <Tab.Screen name="Logout" component={LogOut}/>
      
    </Tab.Navigator>
  );
};

export default BottomTabs;