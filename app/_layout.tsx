import { ApplicationProvider } from "@ui-kitten/components";
import { Stack } from "expo-router/stack";
import * as eva from "@eva-design/eva";
export default function Layout() {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="products" options={{ headerShown: false }} />
      </Stack>
    </ApplicationProvider>
  );
}
