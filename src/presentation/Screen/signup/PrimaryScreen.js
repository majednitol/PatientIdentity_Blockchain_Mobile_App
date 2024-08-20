import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { HealthContext } from '../../../logic/context/health';

import Dashboard from './../Components/DashBoard/Dashboard';
import SmartAccount from '../../../service/wallet connect/SmartAccount';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const CustomButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const PrimaryScreen = ({ navigation }) => {
  const { ConnectedAccountUser, key, setKey } = useContext(HealthContext);
  const [address, setAddress] = useState('')
  const fetchAddress = async() => {
    const [smartWallet, saAddress] = await SmartAccount.connectedSmartAccount();
    setAddress(saAddress)
  }
  useEffect(() => {
    
    fetchAddress()
  }, [])
  
  const goToScreen1 = () => {
    navigation.navigate('Patient SignUp Screen');
  };
  const goToScreen2 = () => {
    navigation.navigate('Doctor SignUp Screen');
  };
  const goToScreen3 = () => {
    navigation.navigate('Pathologist SignUp Screen');
  };
  const goToScreen4 = () => {
    navigation.navigate('Medical Research Lab SignUp Screen');
  };
  const goToScreen5 = () => {
    navigation.navigate('Pharmacy company SignUp Screen');
  };
  const goToScreen6 = () => {
    navigation.navigate('Admin SignUp Screen');
  };
 
  
  return (
    <View style={styles.container} >
      <Text style={styles.AccontText}>Tap and copy your address : </Text>
      <Text selectable={true} style={styles.addressText}>
         {address} 
        
      </Text>
      <CustomButton onPress={goToScreen1} title="Patient" />
      <CustomButton onPress={goToScreen2} title="Doctor" />
      <CustomButton onPress={goToScreen3} title="Pathologist" />
      <CustomButton onPress={goToScreen4} title="Medical Research Lab" />
      <CustomButton onPress={goToScreen5} title="Pharmacy company" />
      <CustomButton onPress={goToScreen6} title="Admin" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressText: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom:20,color: 'rgb(108, 99, 255)'
  },
  AccontText: {
    fontWeight: 'bold', marginBottom:10,color:"red"
  },
  button: {
    backgroundColor: 'rgb(108, 99, 255)',
    height: windowHeight * 0.15, // 20% of window height
    width: windowWidth * 0.8, // 80% of window width
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default PrimaryScreen;
