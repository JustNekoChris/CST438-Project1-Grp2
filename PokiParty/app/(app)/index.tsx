import { Text, View, Button } from 'react-native';

import { useSession } from '../../utils/DataContext';

// Needed for file navigation
import { router } from "expo-router";

// Basic style sheet
import { styles } from '@/assets/styles/mainStyleSheet';

export default function Index() {
  const { signOut } = useSession();

  // app layout!!!
  return (

    // Initial view block
    <View style={styles.container}>
      
      <Button
        title="Sign Out"
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          signOut();
        }}
      ></Button>

      <Button
        title="Pokedex"
        onPress={() => {
          router.push('/pokedex');
        }}
      ></Button>
      <Button
        title="PC"
        onPress={() => {
          router.push('/userPC');
        }}
      ></Button>
      <Button
        title="Parties"
        onPress={() => {
          router.push('/userParties');
        }}
      ></Button>
      

    </View>
  );
}
