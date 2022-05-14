import React, { useContext, useEffect } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { AppContext } from "../../context/app.context";

export default function CustomButton({ navigation, buttonStyle, textStyle, text, onPress }) {
    const { themeColors, deviceW } = useContext(AppContext);
    const styles = StyleSheet.create({
        buttonStyle: {
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 13,
            backgroundColor: themeColors.lightPrimary,
            minWidth: deviceW * 0.5,
            borderRadius: 50,
            marginBottom: 20,
        },
        buttonTextStyle: {
            fontFamily: 'Montserrat-Bold',
            color: themeColors.darkPrimary,
            fontSize: 20,
        },
    });

    return (
        <TouchableOpacity
            style={[styles.buttonStyle, buttonStyle]}
            onPress={onPress}
        >
            <Text style={[styles.buttonTextStyle, textStyle]}>
                {text}
            </Text>
        </TouchableOpacity>
    );
}
