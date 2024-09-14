import { Text, View, Button } from 'react-native';

import { useSession } from '../../utils/DataContext';

// Needed for file navigation
import { router } from "expo-router";

// Basic style sheet
import { styles } from '@/assets/styles/mainStyleSheet';



export default function pokedex() {
  const { signOut } = useSession();

  // app layout!!!
  return (

    // Initial view block
    <View style={styles.container}>

      <Button
        title="Back"
        onPress={() => {
          router.back();
        }}
      ></Button>

    </View>
  );
}
