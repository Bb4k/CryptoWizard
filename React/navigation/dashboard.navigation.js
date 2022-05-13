// import toate paginile existente
import React, { memo } from "react";
import { CardStyleInterpolators, createStackNavigator, TransitionPresets } from "@react-navigation/stack";
import {
    DashboardScreen,
    WalletsScreen,
    ProfileScreen,
    RoleSelectScreen,
    LoginScreen,
    SignupUser,
    SignupService,
    NFTCollectionScreen,
    NFTScreen
} from "../screens";

function DashboardStackScreenSimple({ navigation }) {
    const DashboardStack = createStackNavigator();
    const animConfig = {
        animation: 'spring',
        config: {
            stiffness: 1000,
            damping: 50,
            mass: 3,
            overshootClamping: false,
            restDisplacementThreshold: 0.01,
            restSpeedThreshold: 0.01,
        },
    };

    return (
        <DashboardStack.Navigator
            screenOptions={{
                animation: 'fade',
                cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            }}>
            <DashboardStack.Screen options={{ headerShown: false }} name="Dashboard" component={DashboardScreen} />
            <DashboardStack.Screen options={{ headerShown: false }} name="Wallets" component={WalletsScreen} />
            <DashboardStack.Screen options={{ headerShown: false }} name="Profile" component={ProfileScreen} />

            <DashboardStack.Screen options={{ headerShown: false }} name="NftCollection" component={NFTCollectionScreen} />
            <DashboardStack.Screen options={{ headerShown: false }} name="NFT" component={NFTScreen} />

            <DashboardStack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
            <DashboardStack.Screen options={{ headerShown: false }} name="SignupUser" component={SignupUser} />
            <DashboardStack.Screen options={{ headerShown: false }} name="SignupService" component={SignupService} />
        </DashboardStack.Navigator>
    );
}

const DashboardStackScreen = memo(DashboardStackScreenSimple);
export default DashboardStackScreen;