import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "../context/app.context";
import { Footer } from "../components";
import DashboardStackScreen from "./dashboard.navigation";
import { createStackNavigator } from "@react-navigation/stack";
import {
  RoleSelectScreen,
  LoginScreen,
  SignupUser,
  SignupService,
} from "../screens";

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

function RootNavigation() {
  const Stack = createStackNavigator();
  // const { user } = useContext(AppContext);

  const renderLoggedInUser = () => (
    <>
      <DashboardStackScreen navigation={navigationRef} />
      <Footer navigate={navigate} />
    </>
  );

  const renderLoggedOutUser = () => (
    <Stack.Navigator>
      <Stack.Screen
        name="RoleSelectScreen"
        component={RoleSelectScreen}
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen
        name="SignupUser"
        component={SignupUser}
        options={{
          headerShown: false
        }}
      />

      <Stack.Screen
        name="SignupService"
        component={SignupService}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );

  // return user == null ? renderLoggedOutUser() : renderLoggedInUser();
  return renderLoggedInUser();
}

export default RootNavigation;
