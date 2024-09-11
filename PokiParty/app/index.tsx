// Necessary import to use view from react native
import { View } from "react-native";

import { useEffect } from "react";

// Imports for google account data
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

export default function Index() {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '157900039244-hju97cq2llua8ikt54rke1v81pldeg89.apps.googleusercontent.com',
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
  });

  // Continues to try to sign a user in
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      console.log(userInfo);
    } catch (error: any) {

      // Gives the appropriate error code dependent on the correct error  

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signing in');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play services not available');
      } else {
        console.log('Some other error happened');
        console.log(error.message);
        console.log(error.code);
      }
    }
  };

  // this return give the format of the web page mage through react native views
  return (
    
    // Formats the style of the view

    // Anything within the view box gets displayed on the app dependent on the given style settings

    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >

      <GoogleSigninButton
        style={{width: 192, height: 48, marginTop: 30}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
      />

    </View>
  );
}
