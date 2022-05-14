import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { AppContext } from "../../context/app.context";
import { HorizontalScroll, StatusCard } from '../../components';

export default function DashboardScreen({ navigation }) {

  const { themeColors, deviceW, deviceH, user } = useContext(AppContext);

  const styles = StyleSheet.create({
    canvas: {
      backgroundColor: themeColors.primary,
      width: '100%',
      height: '100%',
      paddingTop: 17,
    },
    container: {
      width: '100%',
      paddingHorizontal: deviceW * 0.1,
    },
  });

  var cryptoCurrencies = [];
  var cryptoCoin = {
    image: "https://cryptologos.cc/logos/elrond-egld-egld-logo.png?v=022",
    name: "EGLD",
    profit: "-10.34"
  }
  cryptoCurrencies.push(cryptoCoin);
  cryptoCoin = {
    image: "https://cryptologos.cc/logos/elrond-egld-egld-logo.png?v=022",
    name: "EGLD",
    profit: "10.34"
  }
  cryptoCurrencies.push(cryptoCoin);
  cryptoCurrencies.push(cryptoCoin);
  cryptoCurrencies.push(cryptoCoin);
  cryptoCurrencies.push(cryptoCoin);

  return (
    <ScrollView style={styles.canvas}>
      <View style={[styles.container, { marginBottom: 23 }]}>
        <Text style={{ fontFamily: 'Montserrat-Medium', color: 'white', fontSize: 20 }}>Hello,</Text>
        <Text style={{ fontFamily: 'Montserrat-Bold', color: 'white', fontSize: 20 }}>{user.firstname}</Text>
      </View>

      <StatusCard
        title1='Invested:'
        value1='$456.90'
        title2='Profit:'
        value2='+$36.90'
        plan={user.plan}
        containerStyle={styles.container}
      />

      <View style={{ paddingBottom: 17 + deviceH * 0.13 }}>
        <HorizontalScroll
          title='Investments'
          containerStyle={styles.container}
          subtitle='Portfolio'
          profit
          data={cryptoCurrencies}
          attribute1='image'
          attribute2='name'
          attribute3='profit'
          onPress={(data) => { navigation.navigate('Graph', { data }) }}
        />
        <HorizontalScroll
          title='Follows'
          containerStyle={styles.container}
          subtitle='Current price'
          data={cryptoCurrencies}
          attribute1='image'
          attribute2='name'
          attribute3='profit'
        />
      </View>
    </ScrollView>
  );
}
