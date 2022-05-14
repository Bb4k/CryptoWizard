import React, { useContext } from "react";
import { Text, TouchableOpacity, StyleSheet, View, Image, ImageBackground } from "react-native";
import { AppContext } from "../../context/app.context";

export default function StatusCard({ title1, title2, value1, value2, plan, containerStyle }) {
    const { themeColors, deviceW } = useContext(AppContext);

    const styles = StyleSheet.create({
        title: {
            color: 'white',
            fontSize: 15,
            fontFamily: 'Montserrat-Medium',
            paddingBottom: 5
        },
        price: {
            color: 'white',
            fontSize: 30,
            fontFamily: 'Montserrat-Bold',
        },
    });

    return (
        <>
            <View style={[containerStyle, { marginBottom: 17 }]}>
                <ImageBackground source={{ uri: plan }} style={{ backgroundColor: themeColors.darkPrimary, paddingVertical: 17, paddingLeft: 25, borderRadius: 35, overflow: 'hidden' }} imageStyle={{ opacity: 0.7, top: 10, left: 130, width: 245, height: 245 }}>
                    <Text style={styles.title}>{title1}</Text>
                    <Text style={[styles.price, { paddingBottom: 17 }]}>{value1}</Text>
                    <Text style={styles.title}>{title2}</Text>
                    <Text style={[styles.price, { color: themeColors.lightPrimary }]}>{value2}</Text>
                </ImageBackground>
            </View>
        </>
    );
}
