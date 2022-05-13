import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { AppContext } from "../../context/app.context";
import { HorizontalScroll, StatusCard } from '../../components';
import { FlatList } from 'react-native-gesture-handler';

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

  const renderTransacation = (data, index) => (
    <View style={{ paddingBottom: 20, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>

      <View style={[{ padding: 5, marginRight: 15, backgroundColor: themeColors.almostWhite, borderRadius: 100 }, index == 0 && { backgroundColor: themeColors.lightPrimary }]}>
        <View style={{ padding: 5, backgroundColor: themeColors.bulletBackground, borderRadius: 100 }}>
          <View style={{ width: 10, height: 10, backgroundColor: themeColors.darkPrimary, borderRadius: 100 }} />
        </View>
      </View>

      <View>
        <Text style={{ color: themeColors.darkPrimary, fontFamily: 'Montserrat-Bold', fontSize: 19, paddingBottom: 2 }}>{`${data.withdraw ? 'Withdrawn' : 'Deposited'} $${data.value} ${data.withdraw ? 'from' : 'into'} ${data.crypto}`}</Text>
        <Text style={{ color: themeColors.subtext, fontFamily: 'Montserrat-Medium', fontSize: 12 }}>{`${data.status ? 'Success' : 'Failed'}, ${data.date}`}</Text>
      </View>

    </View>
  )

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

  var history = []
  var transaction = {
    value: 1000,
    crypto: 'BTC',
    withdraw: false,
    status: true,
    date: '26 Nov 2022 - 13:42',
  }
  history.push(transaction);
  history.push(transaction);
  history.push(transaction);
  history.push(transaction);
  history.push(transaction);
  history.push(transaction);

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
        paddingTop: deviceW * 0.1 - 5,
        height: deviceH * 0.4,
      }}>
        <Text style={{ color: themeColors.darkPrimary, fontSize: 20, fontFamily: 'Montserrat-Bold', paddingBottom: deviceW * 0.1 - 10 }}>Transactions history</Text>
        <View style={{
          backgroundColor: themeColors.scrollbar,
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          width: 5,
          height: deviceH * 0.4 - deviceW * 0.1 - 50,
          position: 'absolute',
          bottom: 0,
          left: deviceW * 0.1 + 13,
        }} />
        <FlatList
          data={history}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({ index, item }) => (
            renderTransacation(item, index)
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>

    </ScrollView>
  );
}
