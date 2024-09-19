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
        color = {'#bf0d0a'}
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          signOut();
        }}
      ></Button>

      <Button
        title="Pokedex"
        color = {'#bf0d0a'}
        onPress={() => {
          router.push('./search');
        }}
      ></Button>
      <Button
        title="PC"
        color = {'#bf0d0a'}
        onPress={() => {
          router.push('./userPC');
        }}
      ></Button>
      <Button
        title="Parties"
        color = {'#bf0d0a'}
        onPress={() => {
          router.push('./userParties');
        }}
      ></Button>
      

    </View>
  );
}
