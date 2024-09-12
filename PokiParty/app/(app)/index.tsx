import { Text, View } from 'react-native';

import { useSession } from '../../utils/DataContext';

export default function Index() {
  const { signOut } = useSession();

  // app layout!!!
  return (

    // Initial view block
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>test!!!</Text>
      <Text
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          signOut();
        }}>
        Sign Out
      </Text>
    </View>
  );
}
