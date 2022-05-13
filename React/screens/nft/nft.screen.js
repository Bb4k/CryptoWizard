import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, Modal } from "react-native";
import { AppContext } from "../../context/app.context";
import { CustomButton } from '../../components';
import QRCode from 'react-native-qrcode-svg';

export default function NFTScreen({ navigation, route }) {
    // nft2Store, setNft2Store
    const { themeColors, deviceH, deviceW } = useContext(AppContext);
    const cooldownImage = 'https://i.ibb.co/tQv5YgV/cooldown.png';
    var collectionName = 'Xmas-3s';
    const [nft, setNft] = useState(route.params.nft);
    const [showQR, setShowQR] = useState(false);

    const styles = StyleSheet.create({
        canvas: {
            backgroundColor: themeColors.primary,
            alignItems: 'center',
            flex: 1,
            paddingHorizontal: deviceW * 0.1,
        },
        container: {
            width: '100%',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-evenly'
        },
        previewStyle: {
            backgroundColor: themeColors.lightPrimary,
            borderRadius: 10,
            maxWidth: deviceW * 0.8,
            alignItems: 'center',
        },
        imageStyle: {
            borderRadius: 10,
            width: deviceW * 0.8,
            height: deviceW * 0.8,
        },
        clockContainer: {
            backgroundColor: 'rgba(255,255,255,0.5)',
            zIndex: 2,
            position: 'absolute',
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
        },
        clockStyle: {
            opacity: 0.5,
            width: deviceW * 0.4,
            height: deviceW * 0.4,
        }
    })

    const renderQR = () => {
        return (
            <Modal
                animationType="fade"
                transparent={true}
            >
                <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', flex: 1, justifyContent: 'space-evenly', alignItems: 'center' }}>
                    <View style={{ backgroundColor: 'white', padding: deviceW * 0.1, borderRadius: 20 }}>
                        <QRCode size={deviceW * 0.6} value={`${nft.token}-wallet-address-authcode`} />
                    </View>
                    <CustomButton
                        buttonStyle={{ backgroundColor: themeColors.darkPrimary }}
                        textStyle={{ color: themeColors.almostWhite }}
                        text={"Cancel"}
                        onPress={() => {
                            setShowQR(false);
                        }} />
                </View>
            </Modal>
        )
    }

    return (
        <View style={styles.canvas}>
            <View style={styles.container}>
                <Text style={{ fontWeight: 'bold', fontSize: 35, textAlign: 'center', color: themeColors.lightPrimary, textDecorationLine: 'underline' }}>
                    {collectionName}
                </Text>

                <View style={[styles.previewStyle]}>
                    <Text
                        style={{
                            paddingHorizontal: 5,
                            fontSize: 24,
                            fontWeight: 'bold',
                            color: 'rgba(0,0,0,0.5)',
                        }}
                        numberOfLines={1}
                        ellipsizeMode='tail'>
                        {nft.token}
                    </Text>
                    {nft.cooldown &&
                        <View style={[styles.imageStyle, styles.clockContainer]}>
                            <Image source={{ uri: cooldownImage }} style={styles.clockStyle} />
                        </View>
                    }
                    <Image source={{ uri: nft.image }} style={styles.imageStyle} />
                </View>

                <CustomButton
                    buttonStyle={[{ maxWidth: deviceW * 0.5 }, nft.cooldown == null ? { backgroundColor: themeColors.lightPrimary } : { backgroundColor: themeColors.darkPrimary }]}
                    textStyle={nft.cooldown && { color: themeColors.almostWhite }}
                    text={nft.cooldown == null ? "Use NFT" : nft.cooldown}
                    onPress={() => {
                        if (!nft.cooldown)
                            setShowQR(true)
                    }}
                />
            </View>
            {showQR && renderQR()}
        </View >
    );
}
