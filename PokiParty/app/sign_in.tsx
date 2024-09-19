import * as React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { useEffect } from "react";

import { router } from "expo-router";
import { useSession } from "@/utils/DataContext";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import { styles } from "../assets/styles/mainStyleSheet";

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
        signIn(userInfo.data.idToken, userInfo.data.user.email);
        console.log(userInfo);
      } else {
        throw new Error('Userinfo returned null from Google SignIn');
      }

      // BIG DEAL : Will look into - Ed
      // Honestly haven't yet. Will look into what the replace stuff does once I do more styling stuff - Ed 9/14/24

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
      style={styles.container}
    >
      <Text style={styles.title}>
        Welcome to Poki Party! The one stop shop for all your pokemon management needs!
      </Text>
      <Text style={styles.title}>
        Before getting started, make sure you sign in through Google so that we can have any data 
        linked to your google account and stored over time!
      </Text>
      <GoogleSigninButton
        style={{width: 192, height: 48, marginTop: 30}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={googleSignIn}
      />
    </View>
  );
}
