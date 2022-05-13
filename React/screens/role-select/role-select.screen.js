import React, { useEffect, useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AppContext } from "../../context/app.context";
import { CustomButton } from '../../components';

export default function RoleSelectScreen({ navigation }) {
  const { themeColors } = useContext(AppContext);

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
          top: '33.33%',
        }}>
        <CustomButton
          buttonStyle={{ backgroundColor: themeColors.lightPrimary }}
          text={"Log in"}
          onPress={() => navigation.navigate('LoginScreen')}
        />

        <CustomButton
          buttonStyle={{ backgroundColor: themeColors.darkPrimary }}
          text={"User Sign up"}
          onPress={() => navigation.navigate('SignupUser')}
        />

        <CustomButton
          buttonStyle={{ backgroundColor: themeColors.darkPrimary }}
          text={"Service Sign up"}
          onPress={() => navigation.navigate('SignupService')}
        />
      </View>
    </View>
  );
}