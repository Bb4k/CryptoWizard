import React, { useState, useContext, useEffect } from 'react';
import { View, Image } from "react-native";
import { CustomInput } from '../../components';
import { CustomButton } from '../../components';
import { AppContext } from '../../context/app.context';

export default function ProfileScreen({ navigation }) {
  const [password, setPassword] = useState();
  const { themeColors, user, setUser, deviceH, deviceW } = useContext(AppContext);
  const profilePicture = 'https://i.ibb.co/K09KSHT/4904883e-aa4b-448a-8296-a09a8d7e3bd0.jpg';

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
      <View style={{ width: '100%', flex:1, alignItems: 'center', justifyContent: 'space-around' }}>
        <Image source={{ uri: profilePicture }} style={{ width: deviceW * 0.5, height: deviceW * 0.5, borderRadius: 100 }}/>

        <View style={{width: '100%'}}>
          <CustomInput
            title={'user'}
            value={user}
            editable={false}
          />
          <CustomInput
            title={'email'}
            value={password}
            password
          />
        </View>

        <CustomButton
          buttonStyle={{ backgroundColor: themeColors.lightPrimary }}
          text={"Log out"}
          inputStyle={{ color: 'black' }}
          onPress={() => {
            setUser(null);
            // handleLogout din AppContext
          }}
        />
      </View>
    </View>
  );
}
