import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { AppContext } from "../../context/app.context";
import { CustomButton } from '../../components';
import { LineChart } from 'react-native-chart-kit';

import data from './data.json';

export default function Graph({ navigation }) {

    const { themeColors, deviceW, deviceH } = useContext(AppContext);

    const styles = StyleSheet.create({
        canvas: {
            height: deviceH,
            backgroundColor: themeColors.primary,
            width: '100%',
            paddingTop: 17,
            justifyContent: 'space-between',
        },
        container: {
            width: '100%',
            paddingHorizontal: deviceW * 0.1,
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

    var price_days = [];
    var price_values = [];
    var price_predicts = [];
    data.prices.forEach(function (elem) {
        price_days.push(elem['price_timestamp']);
        price_values.push(elem['price_real']);
        price_predicts.push(elem['price_predicted']);
    });

    const chartConfig = {
        backgroundGradientFrom: themeColors.almostWhite,
        backgroundGradientFromOpacity: 1,
        backgroundGradientTo: themeColors.almostWhite,
        backgroundGradientToOpacity: 1,

        color: (opacity = 1) => themeColors.darkPrimary,
        strokeWidth: 2,

        useShadowColorFromDataset: false,
        decimalPlaces: 0,
    };
    const chartConfigPredicts = {
        backgroundGradientFrom: 'rgba(0,0,0,0)',
        backgroundGradientFromOpacity: 0,
        backgroundGradientTo: 'rgba(0,0,0,0)',
        backgroundGradientToOpacity: 0,

        color: (opacity = 1) => themeColors.loss,
        strokeWidth: 2,

        useShadowColorFromDataset: false,
        decimalPlaces: 0,
    };

    return (
        <>
            <View style={styles.canvas}>
                <View style={[styles.container, { marginBottom: 23 }]}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        style={{ height: 50, justifyContent: 'center' }}
                        onPress={() => { navigation.goBack() }}
                    >
                        <Image source={{ uri: 'https://i.ibb.co/4PyHD87/right-arrow.png' }} style={{ width: 45, height: 45 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ left: -40, bottom: -20 }}>
                    <LineChart
                        bezier
                        data={{
                            labels: price_days,
                            datasets: [{
                                data: price_values,
                            }]
                        }}
                        width={deviceW + 40}
                        height={deviceH * 0.80}
                        withDots={false}
                        withVerticalLines={false}
                        withHorizontalLines={false}
                        withVerticalLabels={false}
                        withHorizontalLabels={false} //
                        chartConfig={chartConfig}
                        withShadow={false}
                    />
                </View>
                <View style={{ position: 'absolute', left: -40, bottom: -20 }}>
                    <LineChart
                        bezier
                        data={{
                            labels: price_days,
                            datasets: [{
                                data: price_predicts,
                            }]
                        }}
                        width={deviceW + 40}
                        height={deviceH * 0.8}
                        withDots={false}
                        withVerticalLines={false}
                        withHorizontalLines={false}
                        withVerticalLabels={false}
                        withHorizontalLabels={false}
                        chartConfig={chartConfigPredicts}
                        withShadow={false}
                    />
                </View>
            </View>
        </>
    );
}
