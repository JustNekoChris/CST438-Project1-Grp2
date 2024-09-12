import { Button, View, Text } from 'react-native';
import { useEffect } from "react";
import { router } from "expo-router";
import { useSession } from "@/utils/DataContext";

export default function Home() {

    return (

        // Creates a view with an embedded button that calls the google sign in function
    
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>test</Text>
        </View>
      );

}