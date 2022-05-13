import React, { useState, useContext, useEffect } from 'react';
import { View } from "react-native";
import { CustomInput } from '../../components';
import { CustomButton } from '../../components';
import { AppContext } from '../../context/app.context';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState();
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
          title={'user'}
          value={username}
          onChangeText={setUsername}
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
            setUser(username);
            // handleLogin din AppContext
          }}
        />
      </View>
    </View>
  );
}
