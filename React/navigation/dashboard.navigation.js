// import toate paginile existente
import React, { memo } from "react";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import {
    DashboardScreen,
    ProfileScreen,
    RoleSelectScreen,
    LoginScreen,
    Signup,
} from "../screens";

function DashboardStackScreenSimple({ navigation }) {
    const DashboardStack = createStackNavigator();

    return (
        <DashboardStack.Navigator
            screenOptions={{
                animation: 'fade',
                cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            }}>
            <DashboardStack.Screen options={{ headerShown: false }} name="Dashboard" component={DashboardScreen} />
            <DashboardStack.Screen options={{ headerShown: false }} name="Profile" component={ProfileScreen} />

            <DashboardStack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
            <DashboardStack.Screen options={{ headerShown: false }} name="Signup" component={Signup} />
        </DashboardStack.Navigator>
    );
}

const DashboardStackScreen = memo(DashboardStackScreenSimple);
export default DashboardStackScreen;