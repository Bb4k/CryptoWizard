import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList } from "react-native";
import { AppContext } from "../../context/app.context";
import { HorizontalScroll, StatusCard } from '../../components';
import { CustomButton } from '../../components';
import { getPlans } from '../../utils/utils';

export default function ProfileScreen({ navigation }) {

  const { themeColors, deviceW, deviceH, lightArrow, API_URL, plan } = useContext(AppContext);
  const [selectedPlan, setSelectedPlan] = useState(false);
  const [allPlans, setAllPlans] = useState(null);

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
    popupStyle: {
      position: 'absolute',
      width: '100%',
      height: deviceH * 0.75,
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: themeColors.almostWhite,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      bottom: 0,
      padding: deviceW * 0.1,
      paddingBottom: 0,
    },
    popupHeader: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingBottom: deviceW * 0.1
    },
    popupTitle: {
      color: themeColors.darkPrimary,
      fontSize: 30,
      fontFamily: 'Montserrat-Bold'
    },
    popupImage: {
      height: 60,
      width: 60,
    },
    dominantText: {
      color: themeColors.darkPrimary,
      fontFamily: 'Montserrat-Bold',
      fontSize: 19,
      paddingBottom: 2,
      marginRight: 48,
    }
  });

  const renderBubble = (index) => (
    <View style={[{ padding: 5, marginRight: 15, backgroundColor: themeColors.almostWhite, borderRadius: 100 }, index == 0 && { backgroundColor: themeColors.lightPrimary }]}>
      <View style={{ padding: 5, backgroundColor: themeColors.bulletBackground, borderRadius: 100 }}>
        <View style={{ width: 10, height: 10, backgroundColor: themeColors.darkPrimary, borderRadius: 100 }} />
      </View>
    </View>
  )

  const renderTransacation = (data, index) => (
    <View style={{ paddingBottom: 20, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
      {renderBubble(index)}
      <View>
        <Text style={styles.dominantText}>{`${data.withdraw ? 'Withdrawn' : 'Deposited'} $${data.value} ${data.withdraw ? 'from' : 'into'} ${data.crypto}`}</Text>
        <Text style={{ color: themeColors.subtext, fontFamily: 'Montserrat-Medium', fontSize: 12 }}>{`${data.status ? 'Success' : 'Failed'}, ${data.date}`}</Text>
      </View>
    </View>
  )

  const renderPlan = (plan) => {
    return (
      <View style={styles.popupStyle}>
        <View style={styles.popupHeader}>
          <Text style={styles.popupTitle}>{`${plan.plan_name.toUpperCase()}\nFeatures`}</Text>
          <Image source={{ uri: plan.plan_img }} style={styles.popupImage} />
        </View>

        <FlatList
          data={plan.plan_benefits.split('&')}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({ index, item }) => (
            <>
              <View style={{ paddingBottom: 20, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                {renderBubble(1)}
                <Text style={styles.dominantText}>{item}</Text>
              </View>
            </>
          )}
          showsVerticalScrollIndicator={false}
        />

        <CustomButton
          buttonStyle={{ backgroundColor: themeColors.darkPrimary }}
          textStyle={{ color: 'white', fontFamily: 'Montserrat-Medium' }}
          text={"UPGRADE"}
          onPress={() => {
            setSelectedPlan(false);
          }} />
      </View>
    )
  }

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

  useEffect(() => {
    const unsub = navigation.addListener('beforeRemove', (e) => {
      if (selectedPlan) {
        e.preventDefault();
        setSelectedPlan(false);
      } else {
        navigation.removeListener('beforeRemove');
        navigation.goBack();
      }
    });

    return unsub;
  }, [])

  useEffect(() => {
    const unsub = () => {
      if (!allPlans)
        getPlans(API_URL).then((plans) => setAllPlans(plans));
    }
    return unsub();
  }, [allPlans]);

  return (
    <>
      <ScrollView style={styles.canvas} showsVerticalScrollIndicator={false}>
        <View style={[styles.container, { marginBottom: 23, alignItems: 'flex-start' }]}>
          <TouchableOpacity
            activeOpacity={0.9}
            style={{ height: 50, justifyContent: 'center' }}
            onPress={() => {
              if (selectedPlan) {
                setSelectedPlan(false);
              } else {
                navigation.removeListener('beforeRemove');
                navigation.goBack();
              }
            }}
          >
            <Image source={{ uri: lightArrow }} style={{ width: 45, height: 45 }} />
          </TouchableOpacity>
        </View>

        <StatusCard
          title1='Current status:'
          value1={plan.plan_name}
          title2='Cost:'
          value2={plan.plan_price}
          plan={plan.plan_img}
          containerStyle={styles.container}
        />

        <HorizontalScroll
          title='Upgrade plan'
          onPress={(type) => { setSelectedPlan(type) }}
          containerStyle={styles.container}
          customImageStyle={{ height: 50, width: 50 }}
          customBgStyle={{ padding: 3 }}
          subtitle='Cost:'
          data={allPlans}
          attribute1='plan_img'
          attribute2='plan_name'
          attribute3='plan_price'
        />

        <View style={{
          backgroundColor: themeColors.almostWhite,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingHorizontal: deviceW * 0.1,
          paddingTop: deviceW * 0.1 - 5,
          height: deviceH * 0.6,
          paddingBottom: deviceH * 0.13
        }}>
          <Text style={{ color: themeColors.darkPrimary, fontSize: 20, fontFamily: 'Montserrat-Bold', paddingBottom: deviceW * 0.1 - 10 }}>Transactions history</Text>
          <View style={{
            backgroundColor: themeColors.scrollbar,
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            width: 5,
            height: deviceH * 0.6 - deviceW * 0.1 - 50,
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
            nestedScrollEnabled
          />
        </View>
      </ScrollView>
      {selectedPlan && renderPlan(selectedPlan)}
    </>
  );
}
