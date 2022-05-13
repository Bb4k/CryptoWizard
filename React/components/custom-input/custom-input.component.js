import React, { useContext } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";
import { AppContext } from "../../context/app.context";

export default function CustomInput({ title, value, onChangeText, password, editable = true, inputStyle }) {
    const { themeColors } = useContext(AppContext);

    const styles = StyleSheet.create({
        input: {
            paddingLeft: 15,
            fontSize: 20,
            fontWeight: 'bold',
            paddingVertical: 12,
            borderRadius: 10,
            marginBottom: 8,
            backgroundColor: themeColors.darkPrimary,
        },
        title: {
            fontSize: 15,
            fontWeight: 'bold',
            color: themeColors.lightPrimary,
            paddingBottom: 5,
        }
    })

    return (
        <>
            {title &&
                <Text style={styles.title}>
                    {title}
                </Text>
            }
            <TextInput
                style={[styles.input, inputStyle]}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={password}
                autoCapitalize={'none'}
                editable={editable}
            />
        </>
    );
}
