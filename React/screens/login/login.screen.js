import React, { useState, useContext, useEffect } from 'react';
import { View } from "react-native";
import { CustomInput } from '../../components';
import { CustomButton } from '../../components';
import { AppContext } from '../../context/app.context';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { themeColors, setUser } = useContext(AppContext);

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 63,
        backgroundColor: themeColors.primary,
      }}>
      <View style={{ width: '100%' }}>
        <CustomInput
          title={'email'}
          value={email}
          onChangeText={setEmail}
        />
        <CustomInput
          title={'password'}
          value={password}
          onChangeText={setPassword}
          password
        />
        <CustomButton
          buttonStyle={{ backgroundColor: themeColors.lightPrimary, marginTop: 115 }}
          text={"Submit"}
          onPress={() => {
            setUser({
              firstname: email,
              plan: 'https://i.ibb.co/VmW8X2c/status-star.webp',
            });
          }}
        />
      </View>
    </View>
  );
}
