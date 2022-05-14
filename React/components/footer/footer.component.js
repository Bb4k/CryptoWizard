import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { AppContext } from "../../context/app.context";

export default function Footer({ navigate }) {
  const localRoutes = ["Dashboard", "Profile"];
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

    if (routeName == 'Profile') {
      return <FooterButton image={require('../../assets/profile.png')} isFocused={isFocused} />;
    }
  }

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        zIndex: 100,
        height: '13%',
        flexDirection: 'row',
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
              justifyContent: 'center',
              alignContent: 'center',
            }}
          >
            {renderIcon({ routeName: route, isFocused })}
          </TouchableOpacity>
        )
      })}
    </View>
  );
}
