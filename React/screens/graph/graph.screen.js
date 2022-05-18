import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { AppContext } from "../../context/app.context";
import { CustomButton } from '../../components';
import { LineChart } from 'react-native-chart-kit';
import { getPrices } from '../../utils/utils';

export default function Graph({ navigation, route }) {

    const { themeColors, deviceW, deviceH, darkArrow, API_URL } = useContext(AppContext);
    const [data, setData] = useState(null);
    const [price_days, set_price_days] = useState([]);
    const [price_values, set_price_values] = useState([]);
    const [price_predicts, set_price_predicts] = useState([]);

    const styles = StyleSheet.create({
        canvas: {
            height: deviceH,
            backgroundColor: themeColors.almostWhite,
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
            marginBottom: 17
        },
        popupTitle: {
            color: themeColors.scrollbar,
            fontSize: 25,
            fontFamily: 'Montserrat-Bold'
        },
        popupImage: {
            height: 50,
            width: 50,
        }
    });

    useEffect(() => {
        const unsub = () => {
            if (!data)
                getPrices(route.params.data.id, API_URL).then((prices) => { setData(prices) });
            else {
                var aux1 = [], aux2 = [], aux3 = [];
                data.slice(1).forEach(function (elem, index) {
                    if (index % 10 == 0) {
                        aux1.push(elem['price_timestamp']);
                        aux2.push(elem['price_real']);
                        aux3.push(elem['price_predicted']);
                    }
                });
                set_price_days(aux1);
                set_price_values(aux2);
                set_price_predicts(aux3);
            }
        }
        return unsub();
    }, [data]);

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
                <View style={[styles.container, styles.popupHeader]}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        style={{ height: 50, justifyContent: 'center' }}
                        onPress={() => { navigation.goBack() }}
                    >
                        <Image source={{ uri: darkArrow }} style={{ width: 45, height: 45 }} />
                    </TouchableOpacity>
                    <Image source={{ uri: route.params.data.image }} style={styles.popupImage} />
                </View>
                {data &&
                    <View style={[styles.container, styles.popupHeader]}>
                        <View>
                            <Text style={[styles.popupTitle, { fontSize: 15 }]}>Current price:</Text>
                            <Text style={styles.popupTitle}>${parseFloat(data[0]['price_real']).toFixed(2)}</Text>
                        </View>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={[styles.popupTitle, , { fontSize: 15 }, { color: themeColors.darkPrimary }]}>Next price:</Text>
                            <Text style={[styles.popupTitle, { color: themeColors.darkPrimary }]}>${parseFloat(data[0]['price_predicted']).toFixed(2)}</Text>
                        </View>
                    </View>
                }
                {price_days && price_values && price_predicts &&
                    <>
                        <View style={{ left: -40 }}>
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
                        <View style={{ position: 'absolute', left: -40, bottom: 0 }}>
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
                    </>
                }
            </View>
        </>
    );
}
