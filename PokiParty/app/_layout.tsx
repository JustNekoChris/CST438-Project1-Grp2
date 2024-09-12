// Function imports necessary for the code to run

import * as React from 'react';
import { Slot } from "expo-router";
import { SessionProvider } from "@/utils/DataContext";

export default function RootLayout() {
  return (

    // Slot acts as a default page that will send users to the sign in page if they aren't signed in yet

    <SessionProvider>

      <Slot/>

    </SessionProvider>
  );
}
