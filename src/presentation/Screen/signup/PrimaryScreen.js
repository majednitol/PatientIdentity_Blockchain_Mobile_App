import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import { HealthContext } from '../../../logic/context/health';

import Dashboard from './../Components/DashBoard/Dashboard';
import SmartAccount from '../../../service/wallet connect/SmartAccount';
import { ScrollView } from 'react-native';
import { Button } from 'react-native-paper';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

// const CustomButton = ({ onPress, title }) => (
//   <TouchableOpacity onPress={onPress} style={styles.button}>
//     <Text style={styles.buttonText}>{title}</Text>
//   </TouchableOpacity>
// );
const AuthButton = ({ label, iconSource, onPress }) => {
  return (
    <Button
      labelStyle={{
        color: "black",
        fontSize: 16
      }}
      icon={({ size }) => (
        <Image
          source={iconSource} // Dynamic icon passed as prop
          style={{ width: size, height: size }}
        />
      )}
      mode="outlined"
      onPress={onPress}
      contentStyle={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',          // Centers content vertically
        width: 312,
        height: 56,
        backgroundColor: "#FFFFFF"      // Button size
      }}
      style={{
        marginBottom: 10,
        borderRadius: 8,
        borderColor: 'black',
        borderWidth: 1,
      }}
    >
      {label}  {/* Dynamic label passed as prop */}
    </Button>
  );
};

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
      <Image style={{marginBottom:50}}
            source={require('../../../../assets/Logo.png')} // Replace with your Google logo image
      />
      <Text style={{fontSize:24,fontWeight:'bold',marginBottom:20,color:"#000000"}}>
      Which one of these 
are you?
      </Text>
      <Text style={styles.AccontText}>Tap and copy your address : </Text>
      <Text selectable={true} style={styles.addressText}>
         {address} 
        
      </Text>
      <AuthButton onPress={goToScreen1} label="Patient" iconSource={require('../../../../assets/mdi_patient.png')}/>
      <AuthButton onPress={goToScreen2} label="Doctor" iconSource={require('../../../../assets/mdi_doctor.png')}/>
      <AuthButton  onPress={goToScreen3} label="Pathologist" iconSource={require('../../../../assets/mdi_doctor.png')}/>
      <AuthButton onPress={goToScreen4} label="Medical Research Lab" iconSource={require('../../../../assets/material-symbols_lab-panel.png')}/>
      <AuthButton onPress={goToScreen5} label="Pharmacy company" iconSource={require('../../../../assets/mdi_doctor.png')}/>
      <AuthButton  onPress={goToScreen6} label="Admin" iconSource={require('../../../../assets/mdi_doctor.png')}/>
     
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
    height: windowHeight * 0.12, // 20% of window height
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
