import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Image, Modal, FlatList, TouchableOpacity } from "react-native";
import { AppContext } from "../../context/app.context";
import { CustomButton } from '../../components';

export default function WalletsScreen({ navigation }) {
  const { themeColors, deviceW, deviceH } = useContext(AppContext);
  const cancelButton = 'https://i.ibb.co/b7YqTsG/cancel.png';
  const addButton = 'https://i.ibb.co/ZN2vCsG/add.png';
  const [toDelete, setToDelete] = useState(null);
  const [renderSurePopup, setRenderSurePopup] = useState(false);

  const connectedWalletsSample1 = {
    image: "https://cryptologos.cc/logos/elrond-egld-egld-logo.png?v=022",
    address: "erd1qqqqqqqqqqqqqpgqmys8f64mx9lxh38ld37c0m2zvzsdplzxys5sznj0f3"
  };
  const connectedWalletsSample2 = {
    image: "https://cryptologos.cc/logos/elrond-egld-egld-logo.png?v=022",
    address: "erd1k4rv7dct5y2dck490qznk869nvnx6fyf8wyleyhwdrnmk8ryzqasxw4aqw"
  };
  const connectedWalletsSample3 = {
    image: "https://cryptologos.cc/logos/elrond-egld-egld-logo.png?v=022",
    address: "erd1kqxeuw9z4unphkw0vdmrtntja5e6tdu93vl3ty7px85zzm2ddf6s26m7vt"
  };
  const [connectedWallets, setConnectedWallets] = useState([connectedWalletsSample1, connectedWalletsSample2, connectedWalletsSample3]);

  const styles = StyleSheet.create({
    canvas: {
      backgroundColor: themeColors.primary,
      alignItems: 'center',
      width: '100%',
      height: '100%',
      paddingHorizontal: deviceW * 0.1,
      paddingTop: deviceW * 0.1,
    },
    container: {
      width: deviceW * 0.8,
      top: deviceW * 0.1,
    },
    logoStyle: {
      width: deviceW * 0.12,
      height: deviceW * 0.12,
    },
    addresStyle: {
      zIndex: 1,
      position: 'absolute',
      fontSize: 20,
      fontWeight: 'bold',
      flex: 1,
      backgroundColor: themeColors.lightPrimary,
      marginLeft: deviceW * 0.1,
      paddingLeft: 30,
      paddingRight: 15,
      paddingVertical: 12,
      borderRadius: 10,
    },
    cryptoBackground: {
      padding: 10,
      backgroundColor: 'white',
      borderRadius: 100,
      zIndex: 2,
    }
  });

  const removeWallet = (address) => {
    if (toDelete === address) {
      const tempList = connectedWallets.filter(item => item.address !== address);
      setConnectedWallets(tempList);
    }
  }

  const areYouSurePopup = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
      >
        <View style={{ backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <View style={{ backgroundColor: 'white', width: deviceW * 0.8, height: deviceH * 0.5, justifyContent: 'space-around', alignItems: 'center', borderRadius: 20, paddingHorizontal: deviceW * 0.12 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }}>
              Are you sure you want to disconnect this wallet?
            </Text>
            <View>
              <CustomButton
                buttonStyle={{ backgroundColor: themeColors.lightPrimary }}
                text={"Yes"}
                onPress={() => {
                  setRenderSurePopup(false);
                  setToDelete(null);
                  removeWallet(toDelete);
                  // handleLogin din AppContext
                }} />
              <CustomButton
                buttonStyle={{ backgroundColor: themeColors.primary }}
                textStyle={{ color: themeColors.lightPrimary }}
                text={"No"}
                onPress={() => {
                  setToDelete(null);
                  setRenderSurePopup(false);
                  // handleLogin din AppContext
                }} />
            </View>
          </View>
        </View>
      </Modal>
    )
  }

  const renderWallet = (wallet, index) => (
    <TouchableOpacity
      key={index}
      activeOpacity={0.9}
      style={{ width: '100%', marginBottom: 15, justifyContent: 'center', alignItems: "flex-start" }}
      onPress={() => {
        if (toDelete === wallet.address) {
          setToDelete(null);
        } else {
          setToDelete(wallet.address)
        }
      }}>
      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.cryptoBackground}
        onPress={() => {
          // setSelectedWallet(wallet.address);
          setRenderSurePopup(true);
          // removeWallet(wallet.address);
          // render areYouSurePopup
          // delete si din DB
        }}>
        <Image source={{ uri: toDelete === wallet.address ? cancelButton : wallet.image }} style={styles.logoStyle} />
      </TouchableOpacity>
      <Text style={styles.addresStyle} numberOfLines={1} ellipsizeMode='tail'>
        {wallet.address}
      </Text>
    </TouchableOpacity>
  )

  const renderAddButton = () => {
    return (
      <View style={{ position: "absolute", bottom: 0, flexDirection: 'row', alignItems: 'flex-end' }}>
        <View style={{ backgroundColor: themeColors.lightPrimary, width: deviceW * 0.15, height: deviceW * 0.1 }}>
          <View style={{ backgroundColor: themeColors.primary, width: '100%', height: '100%', borderBottomRightRadius: 100 }} />
        </View>
        <TouchableOpacity activeOpacity={0.9}
          style={[styles.cryptoBackground, { borderBottomLeftRadius: 0, backgroundColor: themeColors.lightPrimary, borderBottomRightRadius: 0 }]}>
          <Image source={{ uri: addButton }} style={[styles.logoStyle, { backgroundColor: 'transparent' }]} />
        </TouchableOpacity>
        <View style={{ backgroundColor: themeColors.lightPrimary, width: deviceW * 0.15, height: deviceW * 0.1 }}>
          <View style={{ backgroundColor: themeColors.primary, width: '100%', height: '100%', borderBottomLeftRadius: 100 }} />
        </View>
      </View>
    )
  }

  return (
    <View style={styles.canvas}>
      <View style={{ width: '100%', flex: 1, alignItems: 'center' }}>
        {renderAddButton()}
        <View style={{ position: 'absolute', width: '100%' }}>
          <FlatList
            data={connectedWallets}
            keyExtractor={(item) => item.address}
            renderItem={({ index, item }) => (
              renderWallet(item, index)
            )}
            showsVerticalScrollIndicator={false}
          // ListEmptyComponent={ }
          />
        </View>
      </View>
      {renderSurePopup && areYouSurePopup()}
    </View>);
}
