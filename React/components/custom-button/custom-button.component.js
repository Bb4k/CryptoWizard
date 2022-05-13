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
            // paddingHorizontal: 93,
            minWidth: deviceW * 0.5,
            borderRadius: 10,
            marginBottom: 14,
        },
        buttonTextStyle: {
            color: themeColors.primary,
            fontSize: 20,
            fontWeight: 'bold',
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
