import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { AppContext } from "../../context/app.context";
import { HorizontalScroll, StatusCard } from '../../components';
import { createInvestmentCard, createFollowCard, filterBy } from '../../utils/utils';

export default function DashboardScreen({ navigation }) {

  const { themeColors, deviceW, deviceH, user, investments, follows, plan, API_URL } = useContext(AppContext);
  const [cryptoCurrencies, setCryptoCurrencies] = useState([]);
  const [followCards, setFollowCards] = useState([]);

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

  useEffect(() => {
    const unsub = () => {
      if (cryptoCurrencies.length == 0) {
        const investmentSet = filterBy(investments, "investment_sym");
        for (const investment of investmentSet) {
          createInvestmentCard(investment, API_URL).then((card) => setCryptoCurrencies(cryptoCurrencies => [...cryptoCurrencies, card]));
        }
      }
    }
    return unsub();
  }, [cryptoCurrencies]);

  useEffect(() => {
    const unsub = () => {
      if (followCards.length == 0) {
        for (const follow of follows) {
          createFollowCard(follow, API_URL).then((card) => setFollowCards(followCards => [...followCards, card]));
        }
      }
    }
    return unsub();
  }, [followCards]);

  // console.log("User: ", user);
  // console.log("Investments: ", investments);
  // console.log("Follows: ", follows);
  // console.log("Plan: ", plan);

  return (
    <ScrollView style={styles.canvas}>
      <View style={[styles.container, { marginBottom: 23 }]}>
        <Text style={{ fontFamily: 'Montserrat-Medium', color: 'white', fontSize: 20 }}>Hello,</Text>
        <Text style={{ fontFamily: 'Montserrat-Bold', color: 'white', fontSize: 20 }}>{user.user_f_name}</Text>
      </View>

      <StatusCard
        title1='Invested:'
        value1='$456.90'
        title2='Profit:'
        value2='+$36.90'
        plan={plan.plan_img}
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
          data={followCards}
          attribute1='image'
          attribute2='name'
          attribute3='profit'
          onPress={(data) => { navigation.navigate('Graph', { data }) }}
        />
      </View>
    </ScrollView>
  );
}
