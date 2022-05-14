import React, { useState, useContext, useEffect } from 'react';
import { View } from "react-native";
import { CustomInput } from '../../components';
import { CustomButton } from '../../components';
import { AppContext } from '../../context/app.context';

export default function Signup({ navigation }) {
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState();
  const [dob, setDob] = useState();
  const [password, setPassword] = useState();
  const [repassword, setRepassword] = useState();
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
      <View style={{ width: '100%', height: '100%', justifyContent: 'space-around' }}>
        <View>
          <CustomInput
            title={'first name'}
            value={firstname}
            onChangeText={setFirstname}
          />
          <CustomInput
            title={'last name'}
            value={lastname}
            onChangeText={setLastname}
          />
          <CustomInput
            title={'email'}
            value={email}
            onChangeText={setEmail}
          />
          <CustomInput
            title={'birthday'}
            value={dob}
            onChangeText={setDob}
          />
          <CustomInput
            title={'password'}
            value={password}
            onChangeText={setPassword}
            password
          />
          <CustomInput
            title={'repeat password'}
            value={repassword}
            onChangeText={setRepassword}
            password
          />
        </View>
        <CustomButton
          text={"Submit"}
          onPress={() => {
            setUser({
              firstname,
              lastname,
              email,
              dob,
              plan: 'https://i.ibb.co/VmW8X2c/status-star.webp',
            });
          }}
        />
      </View>
    </View >
  );
}