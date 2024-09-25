import React, { useContext, useState, useEffect, useMemo } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity,ScrollView, Image } from 'react-native';
import { TextInput, Button, ActivityIndicator, IconButton } from 'react-native-paper';
// import {useContract, useContractWrite} from '@thirdweb-dev/react-native';
// import {contractAddress} from '../../../../constant';

import { HealthContext } from '../../../../../logic/context/health';
import { useNavigation } from '@react-navigation/native';
import { fetchConnectedUser } from '../../../../../logic/redux/connectedUserType/connectedUserSlice';
import { useDispatch, useSelector } from 'react-redux';

import { Alert } from 'react-native';
import { createMedicalResearchLabAccount } from '../../../../../logic/redux/medical research lab/medicalResearchLabSlice';
const { width, height } = Dimensions.get('window');

const SetMediResearchLabPersonalData = () => {
  const {
    AddMedicalResearchLab, generateUniqueId, ConnectedEntityType, ConnectedAccountUser, loader, setAccountCreationLoader, btnclick, emailAddress, smartAccount
  } = useContext(HealthContext);
  const labID = generateUniqueId();
  const licenseID = generateUniqueId();
  console.log("uniqueId", labID)
  console.log('StConnectedAccountUser', String(ConnectedAccountUser))

  const [name, setName] = useState('');

  const [researchArea, setresearchArea] = useState('');


  const [labRating, setlabRating] = useState('');
  const [errors, setErrors] = useState({});
  const navigation = useNavigation()
  const dispatch = useDispatch();
  const { loading, error, connectedUserType } = useSelector((state) => state.connectedUser);
  const { loading:accountCreationLoader, error:accountCreationError } = useSelector((state) => state.medicalResearchLab);
  const [call, setCall] = useState(false);

  const getUser = useMemo(() => async () => {
    async function fetchUser() {
      if (!loading) {

        dispatch(fetchConnectedUser()).then(() => {
          if (connectedUserType === '3') {
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
    } else if (name === 'researchArea') {
      setresearchArea(value);
    } else if (name === 'labRating') {
      setlabRating(value);
    }
  };
  const handleSubmit = async () => {
    if (
      name.trim() !== '' &&

      researchArea.trim() !== '' &&

      labRating.trim() !== ''

    ) {
      // Perform form submission
      console.log('Form submitted');
      try {

        dispatch(
          createMedicalResearchLabAccount({
            labID, name, licenseID, researchArea, labRating, emailAddress
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

        researchArea: researchArea.trim() === '',

        labRating: labRating.trim() === '',
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
          style={{ marginVertical: 10 }}
          mode="outlined"
          keyboardType="default"
          value={name}
          error={errors.name}
          onChangeText={value => handleInputChange('name', value)}
          label="Enter your name"
        />
        {errors.name && <Text style={{ color: 'red' }}>Field required</Text>}

        <TextInput
          style={{ marginVertical: 10 }}
          mode="outlined"
          keyboardType="default"
          value={researchArea}
          error={errors.researchArea}
          onChangeText={value => handleInputChange('researchArea', value)}
          label="Enter your researchArea"
        />
        {errors.researchArea && (
          <Text style={{ color: 'red' }}>Field required</Text>
        )}


        <TextInput
          style={{ marginVertical: 10 }}
          mode="outlined"
          keyboardType="numeric"
          value={labRating}
          error={errors.labRating}
          onChangeText={value => handleInputChange('labRating', value)}
          label="Enter your labRating"
        />


        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          {accountCreationLoader ? <ActivityIndicator color="white"  />  : <Text style={{ color: 'white', fontWeight: 'bold' }}>Submit</Text>}
        </TouchableOpacity>
        {/* {accountCreationLoader === true ? (
          <ActivityIndicator color="white" style={{ position: 'relative', top: height * (-0.077) }} />
        ) : null} */}
      </ScrollView>
  
  );
};

export default SetMediResearchLabPersonalData;

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

  },
});