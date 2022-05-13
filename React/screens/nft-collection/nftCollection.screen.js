import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { FlatList } from 'react-native-gesture-handler';
import { AppContext } from "../../context/app.context";

export default function NFTCollectionScreen({ navigation, param }) {
    // nft2Store, setNft2Store
    const { themeColors, deviceH, deviceW } = useContext(AppContext);
    const cooldownImage = 'https://i.ibb.co/tQv5YgV/cooldown.png';

    const styles = StyleSheet.create({
        canvas: {
            backgroundColor: themeColors.primary,
            alignItems: 'center',
            flex: 1,
            paddingHorizontal: deviceW * 0.1,
            // paddingTop: deviceW * 0.1,
        },
        container: {
            width: '100%',
            flex: 1,
        },
        previewStyle: {
            backgroundColor: themeColors.lightPrimary,
            borderRadius: 10,
            maxWidth: deviceW * 0.8 * 0.47,
            alignItems: 'center',
            marginBottom: 20,
        },
        imageStyle: {
            borderRadius: 10,
            width: deviceW * 0.8 * 0.47,
            height: deviceW * 0.8 * 0.47,
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
            width: deviceW * 0.8 * 0.23,
            height: deviceW * 0.8 * 0.23,
        }
    })

    const renderNFT = (nft, index) => (
        <TouchableOpacity
            key={index}
            activeOpacity={0.9}
            style={[styles.previewStyle]}
            onPress={() => { navigation.navigate('NFT', { nft: nft })}}>
            <Text
                style={{
                    paddingHorizontal: 5,
                    fontSize: 15,
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
        </TouchableOpacity>
    );

    var collectionName = 'Xmas-3s';
    var nfts = [];
    const nftSample = {
        image: "https://i.ibb.co/HYnP6Kb/nft1.png",
        token: "XMAS3-c08bc0-0276",
    }
    const nftSampleCooled = {
        image: "https://i.ibb.co/HYnP6Kb/nft1.png",
        token: "XMAS3-c08bc0-0276",
        cooldown: '10d10h50min'
    }
    nfts.push(nftSample);
    nfts.push(nftSample);
    nfts.push(nftSample);
    nfts.push(nftSampleCooled);
    nfts.push(nftSample);
    nfts.push(nftSample);
    nfts.push(nftSample);
    nfts.push(nftSample);
    nfts.push(nftSample);

    return (
        <View style={styles.canvas}>
            <Text style={{ fontWeight: 'bold', fontSize: 35, textAlign: 'center', color: themeColors.lightPrimary, paddingVertical: deviceH * 0.05, textDecorationLine: 'underline' }}>
                {collectionName}
            </Text>
            <View style={styles.container}>
                <FlatList
                    data={nfts}
                    keyExtractor={(item, index) => `${index}-${item.token}`}
                    renderItem={({ index, item }) => (
                        renderNFT(item, index)
                    )}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View >
    );
}
