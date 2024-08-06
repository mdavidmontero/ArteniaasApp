import "react-native-gesture-handler";
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { NavigationContainer } from "@react-navigation/native";
import { HomeStackNavigator } from "./src/presentation/navigator/SideMenuNavigator";
// import { StackNavigator } from "./src/presentation/navigator/StackNavigator";

export default function App() {
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          {/* <StackNavigator /> */}
          <HomeStackNavigator />
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
}
