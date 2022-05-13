import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { AppContext } from "../../context/app.context";

export default function Footer({ navigate }) {
  const localRoutes = ["Dashboard", "Wallets", "Profile"];
  const { themeColors } = useContext(AppContext);
  const [focused, setFocused] = useState('Dashboard');

  const FooterButton = ({ isFocused, image }) => {
    return (
      <View style={{
        borderRadius: 100,
        backgroundColor: isFocused && themeColors.bulletBackground,
        padding: 7,
      }}>
        {/* {image && <Image source={image} style={{ flex: 1, width: null, height: null, resizeMode: 'contain' }} />} */}
        {image && <Image source={image} style={{ width: 40, height: 40 }} />}
      </View>);
  };

  const renderIcon = ({ routeName, isFocused }) => {
    if (routeName == 'Dashboard') {
      return <FooterButton image={require('../../assets/dashboard.png')} isFocused={isFocused} />;
    }

    if (routeName == 'Wallets') {
      return <FooterButton image={require('../../assets/wallet.png')} isFocused={isFocused} />;
    }

    if (routeName == 'Profile') {
      return <FooterButton image={require('../../assets/profile.png')} isFocused={isFocused} />;
    }
  }


  return (
    <View
      style={{
        height: '13%',
        // width: '100%',
        flexDirection: 'row',
        // alignContent: 'space-around',
        alignContent: 'center',
        justifyContent: 'space-around',
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        bottom: 0,
        backgroundColor: 'white',
      }}>
      {localRoutes.map((route, index) => {
        const isFocused = route === focused;

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            onPress={() => {
              setFocused(route);
              navigate(route);
            }}
            style={{
              // flex: 1,
              // paddingVertical: 0,
              justifyContent: 'center',
              alignContent: 'center',
              // width: '15%',
              // height: '100%'
            }}
          >
            {renderIcon({ routeName: route, isFocused })}
          </TouchableOpacity>
        )
      })}
    </View>
  );
}
