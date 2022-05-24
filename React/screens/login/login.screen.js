import React, { useState, useContext, useEffect } from 'react';
import { View, Text } from "react-native";
import { CustomInput } from '../../components';
import { CustomButton } from '../../components';
import { AppContext } from '../../context/app.context';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { themeColors, handleLogin, setUser, failedLogin } = useContext(AppContext);

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
        {failedLogin &&
          <Text
            style={{
              color: themeColors.lightPrimary,
              fontSize: 10, fontFamily:
                'Montserrat-Medium'
            }}>
            {failedLogin}
          </Text>}

        <CustomButton
          buttonStyle={{ backgroundColor: themeColors.lightPrimary, marginTop: 115 }}
          text={"Submit"}
          onPress={() => {
            handleLogin({ email, password });
            // handleLogin({
            //   email: 'rios_chan@flexigen.kw',
            //   password: '.Rios77Chan!'
            // })
          }}
        />
      </View>
    </View>
  );
}
