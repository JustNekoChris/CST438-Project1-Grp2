import { View, Text } from "react-native";

/**
 * @returns A view for the home page of our app. 
 * This route is rendered immediately after authentication, and is only available when authenticated
 */
export default function Index() {
  return (
    <View>
      <Text> Signed in! </Text>
    </View>
  );
}
