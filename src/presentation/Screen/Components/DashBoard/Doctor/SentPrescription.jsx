import React, { useContext } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import FileUpload from '../../File/FileUpload';
import { useNavigation } from '@react-navigation/native';
import { HealthContext } from '../../../../../logic/context/health';
import { Text } from 'react-native-paper';
import { Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getScanedAddress } from '../../../../../logic/redux/scanner/scanAddressSlice';
const { width, height } = Dimensions.get('window');
const SentPrescription = ({route}) => {
  const { scanAddress ,smartAccount} = useContext(HealthContext);
  const navigation = useNavigation();
  const { address } = route?.params ?? {};
  const goToScannerScreen = () => {
    navigation.navigate('AddressScanner');
  };
  const dispatch = useDispatch();
  
  const scannedAddress = useSelector(getScanedAddress);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Text style={{fontWeight:"bold",textAlign:'center',marginTop:10}}>{scannedAddress}</Text>
        <TouchableOpacity onPress={goToScannerScreen} style={styles.scanButton}>
          <Text style={styles.scanButtonText}>Scan Address</Text>
        </TouchableOpacity>
        </View>
        <FileUpload userAddress={scannedAddress} />
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    
  },
  
  scanButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: width * (0.1),
    marginTop: 20,
    height: height * 0.05, // 20% of window height
    width: width * 0.8,
    marginBottom:20
  },
  scanButtonText: {
    color: 'white',
    fontSize: 16,
    
  },
});

export default SentPrescription;
