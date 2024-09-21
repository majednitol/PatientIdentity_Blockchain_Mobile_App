import React, { useContext } from 'react';
import { View, TouchableOpacity, StyleSheet, Alert, Dimensions, Image } from 'react-native';
import { ActivityIndicator, Button, Text } from 'react-native-paper';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { HealthContext } from '../../../../../logic/context/health';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getScanedAddress, setScanAddress } from '../../../../../logic/redux/scanner/scanAddressSlice';
import { shareDataByAdmin } from '../../../../../logic/redux/admin/AdminSlice';

const { width, height } = Dimensions.get('window');

const ShareData = () => {
  const {   } = useContext(HealthContext);
  const navigation = useNavigation();

  const goToScannerScreen = () => {
    navigation.navigate('AddressScanner');
  };
  const dispatch = useDispatch();
  const { sharedDataByAdmin } = useSelector((state) => state.admin);
  const scannedAddress = useSelector(getScanedAddress);
  const shareData = async () => {
    console.log("scannedAddress",scannedAddress)
    try {
      const isValidAddress = /^0x[a-fA-F0-9]{40}$/;
      if (isValidAddress.test(scannedAddress)) {
        dispatch(shareDataByAdmin({scannedAddress})).then(() => {
          Alert.alert("Prescription shared successfully")});
        setScanAddress('');
      } else {
        Alert.alert("Invalid Address', 'Please scan a valid address.")
      }
    } catch (error) {
      Alert.alert(error);
    }
  };

  return (
    <Animated.View entering={FadeInDown.springify()} exiting={FadeInUp.springify()} style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <View style={styles.container}>
        <Text style={{ marginBottom: 10 }}>{scannedAddress}</Text>
        {console.log("scannedAddress",scannedAddress)}
        <TouchableOpacity onPress={goToScannerScreen}>
          <Image
            source={require('../../../../../../assets/qr.jpg')}
            style={{ width: 220, height: 250 }} resizeMode="center"
          />
        </TouchableOpacity>

        <Button onPress={shareData} mode="contained" textColor="white" style={styles.shareButton}>
          {sharedDataByAdmin.loading ? <ActivityIndicator color="white"  />  : <Text style={styles.buttonText}>Share Prescription</Text>}
        </Button>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanButtonText: {
    color: 'white',
    fontSize: width * 0.05,
    marginBottom:20
  },
  shareButton: {
    marginTop: height * 0.03,
    marginHorizontal: width * 0.05,
  },
  buttonText: {
    color: 'white',
    fontSize: width * 0.04,
  },
  activityIndicator: {
    position: 'relative',
    top: -height * 0.04,
  },
});

export default ShareData;
