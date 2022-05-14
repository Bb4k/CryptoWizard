import React, { useEffect, useContext, useState } from 'react';
import { View, Image } from "react-native";
import { AppContext } from "../../context/app.context";
import { CustomButton } from '../../components';

export default function RoleSelectScreen({ navigation }) {
  const { themeColors, deviceH, deviceW } = useContext(AppContext);

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: themeColors.primary,
        alignItems: 'center',
        paddingHorizontal: 63,
      }}>
      <View
        style={{
          width: '100%',
          top: deviceH * 0.1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>

        <Image source={require('../../assets/logo.png')} style={{ height: deviceH * 0.2, resizeMode: 'contain', marginBottom: deviceH * 0.1 }} />

        <CustomButton
          buttonStyle={{ width: deviceW * 0.75 }}
          text={"Log in"}
          onPress={() => navigation.navigate('LoginScreen')}
        />

        <CustomButton
          buttonStyle={{ backgroundColor: themeColors.darkPrimary, width: deviceW * 0.75 }}
          textStyle={{ color: themeColors.lightPrimary }}
          text={"Sign up"}
          onPress={() => navigation.navigate('Signup')}
        />
      </View>
    </View>
  );
}