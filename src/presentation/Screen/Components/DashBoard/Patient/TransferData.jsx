import React, { useContext, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Alert, Dimensions, Image } from 'react-native';
import { ActivityIndicator, Button, TextInput, Text } from 'react-native-paper';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { HealthContext } from '../../../../../logic/context/health';
import { useNavigation } from '@react-navigation/native';
import { shareDataByPatient } from '../../../../../logic/redux/patient/PatientSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getScanedAddress, setScanAddress } from '../../../../../logic/redux/scanner/scanAddressSlice';

const { width, height } = Dimensions.get('window');

const TransferData = () => {
  const {   } = useContext(HealthContext);
  const navigation = useNavigation();

  const goToScannerScreen = () => {
    navigation.navigate('AddressScanner');
  };
  const dispatch = useDispatch();
  const { loading:isShareLoading, error:accountCreationError } = useSelector((state) => state.patient);
  const scannedAddress = useSelector(getScanedAddress);
  const shareData = async () => {
    console.log("scannedAddress",scannedAddress)
    try {
      const isValidAddress = /^0x[a-fA-F0-9]{40}$/;
      if (isValidAddress.test(scannedAddress)) {
        dispatch(shareDataByPatient({scannedAddress}));
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
          {isShareLoading ? <ActivityIndicator color="white"  />  : <Text style={styles.buttonText}>Share Prescription</Text>}
        </Button>
        {/* {isShareLoading === true ? <ActivityIndicator color="white" style={styles.activityIndicator} /> : null} */}
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

export default TransferData;
