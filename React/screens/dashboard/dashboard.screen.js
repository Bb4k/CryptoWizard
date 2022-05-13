import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from "react-native";
import { AppContext } from "../../context/app.context";

export default function DashboardScreen({ navigation }) {
  // nft2Store, setNft2Store
  const { themeColors, deviceH, deviceW } = useContext(AppContext);
  const styles = StyleSheet.create({
    canvas: {
      backgroundColor: themeColors.primary,
      alignItems: 'center',
      width: '100%',
      height: '100%',
      paddingHorizontal: deviceW * 0.1,
      paddingTop: deviceW * 0.1,
    },
    container: {
      width: '100%',
    },
    elementContainer: {
      height: deviceW * 0.33,
      width: deviceW * 0.33,
      backgroundColor: themeColors.almostWhite
    },
    previewStyle: {
      padding: 5,
      paddingTop: 0,
      backgroundColor: themeColors.lightPrimary,
      borderRadius: 10,
      zIndex: 1,
      position: 'absolute',
      alignItems: 'center',
    },
    imageStyle: {
      flex: 1,
      borderRadius: 8,
      width: deviceW * 0.8 * 0.55,
      height: deviceW * 0.8 * 0.55,
    }
  });

  const renderCrypto = (crypto, index) => (
    <TouchableOpacity
      key={index}
      activeOpacity={0.9}
      style={styles.elementContainer}
      onPress={() => { }}
    >

    </TouchableOpacity>
  )

  var cryptoCurrencies = [];
  const cryptoCoin = {
    crypto: {
      image: "https://cryptologos.cc/logos/elrond-egld-egld-logo.png?v=022",
      name: "EGLD",
      profit: "10.34"
    }
  }
  cryptoCurrencies.push(cryptoCoin);
  cryptoCurrencies.push(cryptoCoin);
  cryptoCurrencies.push(cryptoCoin);
  cryptoCurrencies.push(cryptoCoin);
  cryptoCurrencies.push(cryptoCoin);

  return (
    <View style={styles.canvas}>
      <FlatList
        data={cryptoCurrencies}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({ index, item }) => (
          renderCrypto(item, index)
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
