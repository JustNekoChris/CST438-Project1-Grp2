import React from 'react';
import { View, Text, Button } from 'react-native';
import { useSession } from '../utils/DataContext';
import { styles } from '@/assets/styles/mainStyleSheet';

export default function LogOut() {
  const { signOut } = useSession();

  return (
    <View style={styles.container}>
      <Text>Are you sure you want to log out?</Text>
      <Button
        title="Log Out"
        color={'#bf0d0a'}
        onPress={() => {
          signOut();
        }}
      />
    </View>
  );
}
