import { createStackNavigator } from "@react-navigation/stack";
import { useAuthStore } from "../store/useAuthStore";
import { NavigationContainer } from "@react-navigation/native";
import HomeStackNavigator from "./SideMenuNavigator";
import AuthNavigator from "./AuthNavigator";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { obtenerUsuarioPorId } from "../../actions/user.action";
import { ActivityIndicator, View } from "react-native";

const Stack = createStackNavigator();
const auth = getAuth();
const MainNavigator = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();
  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        const user = await obtenerUsuarioPorId(currentUser?.uid!);
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error al obtener la información del usuario:", error);
      }
    });
    setLoading(false);

    return () => unsubscribe();
  }, []);
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <Stack.Navigator>
      {user?.roles === "ADMIN" ? (
        <Stack.Screen
          name="Admin"
          component={HomeStackNavigator}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="Auth"
          component={AuthNavigator}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default MainNavigator;
