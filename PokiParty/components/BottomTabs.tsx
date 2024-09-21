import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
// import ScreenA from './ScreenA';  Replace with actual screen component paths
import Search from '@/app/(app)';
import UserPC from '@/app/(app)/userPC';
import UserParties from '@/app/(app)/userParties';
import LogOut from '../app/(app)/LogOut';

// const Tab = createBottomTabNavigator();

// const BottomTabs: React.FC = () => (
//   <Tab.Navigator screenOptions={{ headerShown: false, unmountOnBlur: true }}>
//     <Tab.Screen
//       name="Search"
//       component={Search}
//       options={{
//         tabBarIcon: ({ color, size }) => (
//           <Ionicons name="search" color={color} size={size} />
//         ),
//       }} />
//     <Tab.Screen
//       name="Teams"
//       component={UserParties}
//       options={{
//         tabBarIcon: ({ color, size }) => (
//           <Ionicons name="people" color={color} size={size} />
//         ),
//       }} />
//     <Tab.Screen
//       name="PC"
//       component={UserPC}
//       options={{
//         tabBarIcon: ({ color, size }) => (
//           <Ionicons name="laptop" color={color} size={size} />
//         ),
//       }} />
//     <Tab.Screen
//       name="Logout"
//       component={LogOut}
//       options={{
//         tabBarIcon: ({ color, size }) => (
//           <Ionicons name="log-out" color={color} size={size} />
//         ),
//       }} />
//   </Tab.Navigator>
// );

// export default BottomTabs;

export default function BottomTabs() {
  return (
    <Tabs screenOptions={{ headerShown: false, unmountOnBlur: true }}>
      <Tabs.Screen
      name="index"
      options={{
        title: 'Search',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="search" color={color} size={size} />
        ),
      }} />
    <Tabs.Screen
      name="userParties"
      options={{
        title: 'Parties',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="people" color={color} size={size} />
        ),
      }} />
    <Tabs.Screen
      name="userPC"
      options={{
        title: 'PC',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="laptop" color={color} size={size} />
        ),
      }} />
    <Tabs.Screen
      name="LogOut"
      options={{
        title: 'Log Out',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="log-out" color={color} size={size} />
        ),
      }} />
    </Tabs>
  )
}