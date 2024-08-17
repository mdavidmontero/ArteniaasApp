import React from "react";
import {
  createStackNavigator,
  StackCardStyleInterpolator,
} from "@react-navigation/stack";
import { RegisterScreen } from "../screens/auth/RegisterScreen";
import { LoginScreen } from "../screens/auth/LoginScreen";
import { LoadingScreen } from "../screens/loading/LoadinScreen";
export type RootStackParams = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  HomeScreen: undefined;
  LoadingScreen: undefined;
};

const fadeAnimation: StackCardStyleInterpolator = ({ current }) => {
  return {
    cardStyle: {
      opacity: current.progress,
    },
  };
};

const Stack = createStackNavigator<RootStackParams>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="LoadingScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        options={{
          cardStyleInterpolator: fadeAnimation,
        }}
        name="LoadingScreen"
        component={LoadingScreen}
      />
      <Stack.Screen
        options={{ cardStyleInterpolator: fadeAnimation, headerShown: false }}
        name="LoginScreen"
        component={LoginScreen}
      />
      <Stack.Screen
        options={{ cardStyleInterpolator: fadeAnimation, headerShown: false }}
        name="RegisterScreen"
        component={RegisterScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
