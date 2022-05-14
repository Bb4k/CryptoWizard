import React, { useContext } from "react";
import { Text, TouchableOpacity, StyleSheet, View, FlatList, Image } from "react-native";
import { AppContext } from "../../context/app.context";

export default function HorizontalScroll({ data, onPress, title, subtitle, attribute1, attribute2, attribute3, containerStyle, customImageStyle, customBgStyle, profit = false }) {
    const { themeColors, deviceW } = useContext(AppContext);
    const styles = StyleSheet.create({
        elementContainer: {
            marginRight: 17,
            padding: 17,
            borderRadius: 35,
            backgroundColor: themeColors.almostWhite
        },
        imageBg: {
            backgroundColor: 'white',
            padding: 10,
            borderRadius: 20
        },
        imageStyle: {
            width: 35,
            height: 35,
        },
        cryptoName: {
            fontFamily: 'Montserrat-Bold',
            fontSize: 20,
            color: themeColors.darkPrimary,
            paddingLeft: 22,
        },
        title: {
            color: themeColors.lightPrimary,
            fontFamily: 'Montserrat-Medium',
            fontSize: 20,
            marginBottom: 17
        },
        subtext: {
            fontSize: 12,
            fontFamily: 'Montserrat-Medium',
            color: themeColors.subtext,
            paddingBottom: 9,
        },
        price: {
            fontFamily: 'Montserrat-Bold',
            fontSize: 20,
            color: themeColors.darkPrimary,
        },
    });

    const renderHorizontal = (data, index) => (
        <TouchableOpacity
            key={`${title}-${index}`}
            activeOpacity={0.9}
            onPress={() => { onPress(data) }}
        >
            <View style={[styles.elementContainer, index == 0 && { marginLeft: deviceW * 0.1 }]}>
                <View style={{ alignItems: 'center', flexDirection: 'row', marginBottom: 22 }}>
                    <View style={[styles.imageBg, customBgStyle]}>
                        <Image source={{ uri: data[attribute1] }} style={[styles.imageStyle, customImageStyle]} />
                    </View>
                    <Text style={styles.cryptoName}>{data[attribute2]}</Text>
                </View>

                <Text style={styles.subtext}>{subtitle}</Text>
                {data[attribute3] > 0 && profit &&
                    <Text style={styles.price}>+${data[attribute3]}</Text>
                }
                {data[attribute3] < 0 && profit &&
                    <Text style={[styles.price, { color: themeColors.loss }]}>{data[attribute3].replace('-', '-$')}</Text>
                }
                {!profit &&
                    <Text style={[styles.price]}>{('$'+data[attribute3]).replace('$-', '-$')}</Text>
                }
            </View>
        </TouchableOpacity>
    )

    return (
        <View style={{ marginBottom: 17 }}>
            <Text style={[styles.title, containerStyle]}>{title}</Text>
            <View>
                <FlatList
                    data={data}
                    keyExtractor={(item, index) => `${index}`}
                    renderItem={({ index, item }) => (
                        renderHorizontal(item, index)
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </View>
    );
}
