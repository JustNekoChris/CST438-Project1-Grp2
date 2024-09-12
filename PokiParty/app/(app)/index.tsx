import { Text, View, Button } from 'react-native';

import { useSession } from '../../utils/DataContext';

// Needed for file navigation
import { router } from "expo-router";

export default function Index() {
  const { signOut } = useSession();

  // app layout!!!
  return (

    // Initial view block
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      
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
          router.push('./search');
        }}
      ></Button>
      <Button
        title="PC"
        onPress={() => {
          router.push('./userPC');
        }}
      ></Button>
      <Button
        title="Parties"
        onPress={() => {
          router.push('./userParties');
        }}
      ></Button>
      

    </View>
  );
}
