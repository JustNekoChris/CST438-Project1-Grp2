import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { useEffect } from "react";

import { router } from "expo-router";
import { useSession } from "@/utils/DataContext";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';


/**
 * Base code taken from https://medium.com/@mnabilarta/google-oauth-using-react-native-cli-23ce8e1cf716
 * @returns A view with a google sign in button. Will not render this path if user is authenticated.
 */
export default function Index (){
  const { signIn } = useSession();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '157900039244-hju97cq2llua8ikt54rke1v81pldeg89.apps.googleusercontent.com',
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
  });

  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      if (userInfo.data !== null && userInfo.data.idToken !== null) {
        signIn(userInfo.data.idToken);
      } else {
        throw new Error('Userinfo returned null from Google SignIn');
      }

      // BIG DEAL : Will look into - Ed
      router.replace('/');
    } catch (error: any) {
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

  return (

    // Creates a view with an embedded button that calls the google sign in function

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
        onPress={googleSignIn}
      />
    </View>
  );
}
