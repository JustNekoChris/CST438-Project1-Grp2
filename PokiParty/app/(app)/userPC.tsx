import { Text, View, Button } from 'react-native';

// Needed for file navigation
import { router } from "expo-router";

export default function userPC() {
  // app layout!!!
  return (

    // Initial view block
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

      <Button
        title="Back"
        onPress={() => {
          router.back();
        }}
      ></Button>

    </View>
  );
}
