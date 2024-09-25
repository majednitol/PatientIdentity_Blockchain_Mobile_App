import React, {useContext, useState,useEffect, useMemo} from 'react';
import {Text, StyleSheet, Dimensions, TouchableOpacity, Alert, View, Image} from 'react-native';
import {TextInput, ActivityIndicator, IconButton} from 'react-native-paper';

import {ScrollView} from 'react-native-gesture-handler';
import { HealthContext } from '../../../../../logic/context/health';
import { useNavigation } from '@react-navigation/native';
import { fetchConnectedUser } from '../../../../../logic/redux/connectedUserType/connectedUserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { createPharmacyCompanyAccount } from '../../../../../logic/redux/pharmacy company/pharmacyCompanySlice';
const { width, height } = Dimensions.get('window');

const SetPharmacyCompanyPersonalData = () => {
  const {
    AddNewPharmacyCompany,generateUniqueId,ConnectedEntityType,ConnectedAccountUser,loader,btnclick,emailAddress,smartAccount
  } = useContext(HealthContext);
  const companyID = generateUniqueId();
  const licenseID = generateUniqueId();
  const [name, setName] = useState('');
 
  const [productInformation, setproductInformation] = useState('');
  const [pharmacyRating, setpharmacyRating] = useState('');

 
  const [errors, setErrors] = useState({});
  const navigation = useNavigation()
  const dispatch = useDispatch();
  const { loading, error, connectedUserType } = useSelector((state) => state.connectedUser);
  const { loading:accountCreationLoader, error:accountCreationError } = useSelector((state) => state.pharmacyCompany);
  const [call, setCall] = useState(false);
 
  const getUser = useMemo(() => async () => {
    async function fetchUser() {
      if (!loading) {
       
        dispatch(fetchConnectedUser()).then(() => {
          if (connectedUserType === '4') {
            navigation.navigate('Dashboard');
            console.log("connectedUserType2", connectedUserType);
          }
        });
      }
    }
    fetchUser();
  }, [loading, connectedUserType, dispatch, navigation]);

  useEffect(() => {
    if (call === true) {
      getUser();
    }
}, [getUser, call]);

  useEffect(() => {
    if (btnclick === true) {
      navigation.setOptions({
        headerLeft: null
      })
    }
  }, [btnclick])
 
  const handleInputChange = (name, value) => {
    if (name === 'name') {
      setName(value);
    }   else if (name === 'pharmacyRating') {
      setpharmacyRating(value);
    } else if (name === 'productInformation') {
      setproductInformation(value);
    }
  };
  const handleSubmit = async () => {

    if (
      name.trim() !== '' &&
     
      productInformation.trim() !== '' &&
      pharmacyRating.trim() !== ''
      
     
    ) {
      // Perform form submission
      console.log('Form submitted');
      try {
     
      dispatch(
        createPharmacyCompanyAccount({
          companyID,
          name,
          licenseID,
          productInformation,
          pharmacyRating,emailAddress
        })
      ).then(() => {
        Alert.alert('SuccessFully created Account')
        setCall(true)
      })
        console.info('contract call successs');
      } catch (err) {
        console.error('contract call failure', err);
      }
    } else {
      console.log('Please fill up all fields');
      setErrors({
        name: name.trim() === '',
        
        productInformation: productInformation.trim() === '',
        pharmacyRating: pharmacyRating.trim() === '',

        
      });
    }
  };

  return (
    <ScrollView  style={{paddingHorizontal: 15, marginHorizontal: 16, backgroundColor:"#F6F6F6"}}>
    <View style={{
      flexDirection: 'row',         // Aligns buttons in a row
  justifyContent: 'space-between',     // Centers buttons horizontally
  alignItems: 'center',         // Centers buttons vertically
        marginTop: 30,
  marginBottom:10
      }}>
        <IconButton
      icon="arrow-left"
      size={28} iconColor='black'
          onPress={() => {
        navigation.goBack();
      }}
      style={{}}
    />

    <Image source={require('../../.././../../../assets/sub.png')} style={styles.logo} width={0} height={0}/>
    </View>
    <Text style={{fontSize:24,fontWeight:"bold", color:"#000039", marginBottom:20}}>Create Your Account</Text>

        <TextInput
          style={{marginVertical: 10}}
          mode="outlined"
          keyboardType="default"
          value={name}
          error={errors.name}
          onChangeText={value => handleInputChange('name', value)}
          label="Enter your name"
        />
        {errors.name && <Text style={{color: 'red'}}>Field required</Text>}

        <TextInput
          style={{marginVertical: 10}}
          mode="outlined"
          keyboardType="default"
          value={productInformation}
          error={errors.productInformation}
          onChangeText={value => handleInputChange('productInformation', value)}
          label="Enter your productInformation"
        />
        {errors.productInformation && (
          <Text style={{color: 'red'}}>Field required</Text>
        )}

        <TextInput
          style={{marginVertical: 10}}
          mode="outlined"
          keyboardType="numeric"
          value={pharmacyRating}
          error={errors.pharmacyRating}
          onChangeText={value => handleInputChange('pharmacyRating', value)}
          label="Enter your pharmacyRating"
        />
        {errors.pharmacyRating && (
          <Text style={{color: 'red'}}>Field required</Text>
        )}



        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          {accountCreationLoader ? <ActivityIndicator color="white"  />  : <Text style={{ color: 'white', fontWeight: 'bold' }}>Submit</Text>}
        </TouchableOpacity>
        {/* {accountCreationLoader === true ? (
            <ActivityIndicator color="white" style={{ position: 'relative', top: height*(-0.077) }} />
          ) : null} */}
      </ScrollView>

  );
};

export default SetPharmacyCompanyPersonalData;


const styles = StyleSheet.create({
  button: {
    backgroundColor: '#8D68F6',
    height: height * 0.05, // 20% of window height
    width: width * 0.8, // 80% of window width
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: width * (0.025),

      borderRadius: 10,
      marginVertical: 30,
   
    },});