// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import { Button } from "react-native";
import { router } from "expo-router";

export function BasicBackButton({}) {
  return <Button
      title="Back"
      color={'#bf0d0a'}
      onPress={() => {
        router.back();
      }}
    ></Button>;
}
