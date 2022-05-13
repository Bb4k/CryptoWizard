import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { AppContext } from "../../context/app.context";
import { HorizontalScroll, StatusCard } from '../../components';

export default function ProfileScreen({ navigation }) {

  const { themeColors, deviceW, deviceH } = useContext(AppContext);

  const styles = StyleSheet.create({
    canvas: {
      backgroundColor: themeColors.primary,
      width: '100%',
      paddingTop: 17,
    },
    container: {
      width: '100%',
      paddingHorizontal: deviceW * 0.1,
    },
  });

  const user = {
    first_name: 'Sebastian',
    plan: {
      name: 'Star',
      cost: '$25/mo.',
      image: 'https://i.ibb.co/VmW8X2c/status-star.webp',
    }
  };

  var cryptoCurrencies = [];
  var cryptoCoin = {
    name: 'Basic',
    cost: 'FREE',
    image: 'https://i.ibb.co/Ryz48Pp/status-bronze.webp',
  }
  cryptoCurrencies.push(cryptoCoin);
  cryptoCoin = {
    name: 'Star',
    cost: '$25/mo.',
    image: 'https://i.ibb.co/VmW8X2c/status-star.webp',
  }
  cryptoCurrencies.push(cryptoCoin);
  cryptoCurrencies.push(cryptoCoin);
  cryptoCurrencies.push(cryptoCoin);

  return (
    <ScrollView style={styles.canvas}>
      <View style={[styles.container, { marginBottom: 23 }]}>
        <Text style={{ fontFamily: 'Montserrat-Medium', color: 'white', fontSize: 20 }}>Hello,</Text>
        <Text style={{ fontFamily: 'Montserrat-Bold', color: 'white', fontSize: 20 }}>{user.first_name}</Text>
      </View>

      <StatusCard
        title1='Current status:'
        value1={user.plan.name}
        title2='Cost:'
        value2={user.plan.cost}
        plan={user.plan.image}
        containerStyle={styles.container}
      />

      <HorizontalScroll
        title='Upgrade plan'
        containerStyle={styles.container}
        customImageStyle={{ height: 50, width: 50 }}
        customBgStyle={{ padding: 3 }}
        subtitle='Cost:'
        data={cryptoCurrencies}
        attribute1='image'
        attribute2='name'
        attribute3='cost'
      />

      <View style={{ 
        backgroundColor: themeColors.almostWhite, 
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: deviceW * 0.1, 
        paddingTop: deviceW * 0.1 
        }}>

      </View>

    </ScrollView >
  );
}
