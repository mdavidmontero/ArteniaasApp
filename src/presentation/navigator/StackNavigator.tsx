// import React from "react";
// import {
//   createStackNavigator,
//   StackCardStyleInterpolator,
// } from "@react-navigation/stack";
// import { LoginScreen } from "../screens/auth/LoginScreen";
// import { RegisterScreen } from "../screens/auth/RegisterScreen";
// import { SideMenuNavigator } from "./SideMenuNavigator";

// export type RootStackParams = {
//   LoginScreen: undefined;
//   RegisterScreen: undefined;
//   SideMenuNavigator: undefined;
// };

// const fadeAnimation: StackCardStyleInterpolator = ({ current }) => {
//   return {
//     cardStyle: {
//       opacity: current.progress,
//     },
//   };
// };

// const Stack = createStackNavigator<RootStackParams>();

// export const StackNavigator = () => {
//   return (
//     <Stack.Navigator
//       initialRouteName="SideMenuNavigator"
//       screenOptions={{
//         headerShown: false,
//       }}
//     >
//       {/* <Stack.Screen
//         options={{
//           cardStyleInterpolator: fadeAnimation,
//         }}
//         name="SideMenuNavigator"
//         component={SideMenuNavigator}
//       /> */}
//       <Stack.Screen
//         options={{
//           cardStyleInterpolator: fadeAnimation,
//         }}
//         name="LoginScreen"
//         component={LoginScreen}
//       />
//       <Stack.Screen
//         options={{
//           cardStyleInterpolator: fadeAnimation,
//         }}
//         name="RegisterScreen"
//         component={RegisterScreen}
//       />
//     </Stack.Navigator>
//   );
// };
