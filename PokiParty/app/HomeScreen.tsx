import React from 'react';
import { View } from 'react-native';
import BottomTabs  from "@/components/BottomTabs"; // Import the BottomTabs component

const HomeScreen: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <BottomTabs />
    </View>
  );
};

export default HomeScreen;
