import "react-native-gesture-handler";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomeStackNavigator from "./src/presentation/navigator/SideMenuNavigator";
import { createStackNavigator } from "@react-navigation/stack";
import MainNavigator from "./src/presentation/navigator/MainNavigator";
// import { StackNavigator } from "./src/presentation/navigator/StackNavigator";
const Stack = createStackNavigator();
const queryClient = new QueryClient();
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </ApplicationProvider>
    </QueryClientProvider>
  );
}
