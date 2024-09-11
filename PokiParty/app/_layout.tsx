import { Slot } from "expo-router";
import { SessionProvider } from "@/utils/DataContext";

export default function RootLayout() {
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}
