import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
// import ScreenA from './ScreenA';  Replace with actual screen component paths
import Search from '@/app/(app)/search';
import UserPC from '@/app/(app)/userPC';
import UserParties from '@/app/(app)/userParties';
import LogOut from './LogOut';

const Tab = createBottomTabNavigator();

const BottomTabs: React.FC = () => {

  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen 
      name="Search"  
      component={Search}
      options={{
        tabBarIcon: ({ color, size }) => (
        <Ionicons name="search" color={color} size={size} />
        ),
      }}
      />
      <Tab.Screen 
      name="Teams" 
      component={UserParties}
      options={{
        tabBarIcon: ({ color, size }) => (
        <Ionicons name="people" color={color} size={size} />
        ),
      }}
      />
      <Tab.Screen 
      name="PC" 
      component={UserPC}
      options={{
        tabBarIcon: ({ color, size }) => (
        <Ionicons name="laptop" color={color} size={size} />
        ),
      }}
      />
      <Tab.Screen 
      name="Logout" 
      component={LogOut}
      options={{
        tabBarIcon: ({ color, size }) => (
        <Ionicons name="log-out" color={color} size={size} />
        ),
      }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;