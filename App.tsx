import "react-native-gesture-handler";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomeStackNavigator from "./src/presentation/navigator/SideMenuNavigator";
import { createStackNavigator } from "@react-navigation/stack";
// import { StackNavigator } from "./src/presentation/navigator/StackNavigator";
const Stack = createStackNavigator();
const queryClient = new QueryClient();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Admin"
              component={HomeStackNavigator}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </QueryClientProvider>
  );
}
