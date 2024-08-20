import React, { useContext, useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { TextInput, Button, ActivityIndicator } from 'react-native-paper';
// import {useContract, useContractWrite} from '@thirdweb-dev/react-native';
// import {contractAddress} from '../../../../constant';
import { ScrollView } from 'react-native-gesture-handler';
import { HealthContext } from '../../../../../logic/context/health';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { DatePickerInput } from 'react-native-paper-dates';
import { useDispatch, useSelector } from 'react-redux';

import { fetchConnectedUser } from '../../../../../logic/redux/connectedUserType/connectedUserSlice';
import { createPathologistAccount } from '../../../../../logic/redux/pathologist/pathologistSlice1';

const { width, height } = Dimensions.get('window');
const SetPathologistPersonalData = () => {
  const {
    AddNewpathologist, generateUniqueId, ConnectedEntityType, ConnectedAccountUser, loader, setAccountCreationLoader, btnclick, emailAddress, smartAccount
  } = useContext(HealthContext);
  const navigation = useNavigation()
  const dispatch = useDispatch();
  const { loading, error, connectedUserType } = useSelector((state) => state.connectedUser);
  const { loading:accountCreationLoader, error:accountCreationError } = useSelector((state) => state.pathologist);
  const [call, setCall] = useState(false);
  // useEffect(() => {

  //   ConnectedEntityType();
  //   login()
  // }, [ConnectedEntityType]);


  const getUser = useMemo(() => async () => {
    async function fetchUser() {
      if (!loading) {

        dispatch(fetchConnectedUser()).then(() => {
          if (connectedUserType === '2') {
            navigation.navigate('Dashboard');
            console.log("connectedUserType2", connectedUserType);
          }
        });
      }
    }
    fetchUser();
  }, [loading, connectedUserType, dispatch, navigation]);
  useEffect(() => {
    if (btnclick === true) {
      navigation.setOptions({
        headerLeft: null
      })
    }
  }, [btnclick])
  useEffect(() => {
    if (call === true) {
      getUser();
    }
  }, [getUser, call]);
  const pathologistID = generateUniqueId();
  const licenseNumber = generateUniqueId();
  const [name, setName] = useState('');

  const [specializationArea, setspecializationArea] = useState('');
  const [totalExperience, settotalExperience] = useState('');
  const [inputDate, setInputDate] = React.useState('')

  const [errors, setErrors] = useState({});
  const handleInputChange = (name, value) => {
    if (name === 'name') {
      setName(value);
    } else if (name === 'totalExperience') {
      settotalExperience(value);
    } else if (name === 'specializationArea') {
      setspecializationArea(value);
    }
  };
  const handleSubmit = async () => {
    if (
      name.trim() !== '' &&

      specializationArea.trim() !== '' &&
      totalExperience.trim() !== '' &&
      licenseNumber !== ''
      &&
      inputDate !== ''

    ) {
      // Perform form submission
      console.log('Form submitted');
      try {
        const birthday = inputDate.toString().slice(0, 15)
        dispatch(
          createPathologistAccount({
            pathologistID,
            name,
            licenseNumber,
            specializationArea,
            totalExperience, birthday, emailAddress
          })
        ).then(() => {
          setCall(true)
          Alert.alert('SuccessFully created Account')

        })
        console.info('contract call successs');
      } catch (err) {
        console.error('contract call failure', err);
      }
    } else {
      console.log('Please fill up all fields');
      setErrors({
        name: name.trim() === '',

        specializationArea: specializationArea.trim() === '',
        totalExperience: totalExperience.trim() === '',

        licenseNumber: licenseNumber === '',
        inputDate: inputDate === '',
      });
    }
  };

  return (
    <ScrollView>
      {/* Your custom patient input form */}
      <ScrollView View style={{ marginHorizontal: 16 }}>


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
          value={specializationArea}
          error={errors.specializationArea}
          onChangeText={value => handleInputChange('specializationArea', value)}
          label="Enter your specializationArea"
        />
        {errors.specializationArea && (
          <Text style={{ color: 'red' }}>Field required</Text>
        )}

        <TextInput
          style={{ marginVertical: 10 }}
          mode="outlined"
          keyboardType="numeric"
          value={totalExperience}
          error={errors.totalExperience}
          onChangeText={value => handleInputChange('totalExperience', value)}
          label="Enter your totalExperience"
        />
        {errors.totalExperience && (
          <Text style={{ color: 'red' }}>Field required</Text>
        )}


        <DatePickerInput
          style={{ marginVertical: 10 }}
          label="Birthdate"
          locale="en"
          value={inputDate}
          onChange={(d) => setInputDate(d)}
          inputMode="start"
        />
        {errors.inputDate ? Alert.alert('Please enter your birthdate') : console.log(inputDate.toString().slice(0, 15))}

        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          {accountCreationLoader ? <ActivityIndicator color="white"  />  : <Text style={{ color: 'white', fontWeight: 'bold' }}>Submit</Text>}
        </TouchableOpacity>
        {/* {accountCreationLoader === true ? (
          <ActivityIndicator color="white" style={{ position: 'relative', top: height * (-0.077) }} />
        ) : null} */}
      </ScrollView>
    </ScrollView>
  );
};

export default SetPathologistPersonalData;

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgb(108, 99, 255)',
    height: height * 0.05, // 20% of window height
    width: width * 0.8, // 80% of window width
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: width * (0.05),
    borderRadius: 10,
    marginVertical: 30,

  },
});