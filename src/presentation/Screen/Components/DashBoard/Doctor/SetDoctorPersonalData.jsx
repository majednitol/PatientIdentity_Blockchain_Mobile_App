import React, { useContext, useEffect, useMemo, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { TextInput, Button, ActivityIndicator } from 'react-native-paper';
// import {useContract, useContractWrite} from '@thirdweb-dev/react-native';
// import {contractAddress} from '../../../../constant';
import { ScrollView } from 'react-native-gesture-handler';
import { HealthContext } from '../../../../../logic/context/health';
import { useNavigation } from '@react-navigation/native';
import { DatePickerInput } from 'react-native-paper-dates';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConnectedUser } from '../../../../../logic/redux/connectedUserType/connectedUserSlice';
import { createDoctorAccount } from '../../../../../logic/redux/doctor/DoctorSlice';
const { width, height } = Dimensions.get('window');


const SetDoctorPersonalData = () => {
  const {
    generateUniqueId, btnclick,emailAddress  } = useContext(HealthContext);
  const navigation = useNavigation()
  const dispatch = useDispatch();
  const { loading, connectedUserType } = useSelector((state) => state.connectedUser);
  const { loading:accountCreationLoader } = useSelector((state) => state.doctor);
  const [call, setCall] = useState(false);
  // useEffect(() => {

  //   ConnectedEntityType();
  //   login()
  // }, [ConnectedEntityType]);
  const doctorID = generateUniqueId();
  const BMDCNumber = generateUniqueId();
  console.log("uniqueId", doctorID)
  const getUser = useMemo(() => async () => {
    async function fetchUser() {
      if (!loading) {
       
        dispatch(fetchConnectedUser()).then(() => {
          if (connectedUserType === '1') {
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
  const [name, setName] = useState('');
  const [inputDate, setInputDate] = React.useState('')
  const [specialty, setspecialty] = useState('');
  const [consultationFee, setconsultationFee] = useState('');

  const [yearOfExperience, setyearOfExperience] = useState('');
  const [errors, setErrors] = useState({});
  const handleInputChange = (name, value) => {
    if (name === 'name') {
      setName(value);
    } else if (name === 'specialty') {
      setspecialty(value);
    } else if (name === 'consultationFee') {
      setconsultationFee(value);
    } else if (name === 'yearOfExperience') {
      setyearOfExperience(value);
    }
  };

  const handleSubmit = async () => {
    if (
      name.trim() !== '' &&

      specialty.trim() !== '' &&
      consultationFee.trim() !== '' &&

      yearOfExperience.trim() !== ''
      && inputDate !== ''
      
    ) {
      // Perform form submission
      console.log('Form submitted');
      try {
        const birthday = inputDate.toString().slice(0, 15)
      

        dispatch(
          createDoctorAccount({
            doctorID,
            name,
            specialty,
            consultationFee,
            BMDCNumber,
            yearOfExperience, birthday,emailAddress
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

        specialty: specialty.trim() === '',
        consultationFee: consultationFee.trim() === '',

        yearOfExperience: yearOfExperience.trim() === '',
        inputDate: inputDate === '',
      });
    }
  };

  return (
    <ScrollView>
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
          value={specialty}
          error={errors.specialty}
          onChangeText={value => handleInputChange('specialty', value)}
          label="Enter your specialty"
        />
        {errors.specialty && <Text style={{ color: 'red' }}>Field required</Text>}

        <TextInput
          style={{ marginVertical: 10 }}
          mode="outlined"
          keyboardType="numeric"
          value={consultationFee}
          error={errors.consultationFee}
          onChangeText={value => handleInputChange('consultationFee', value)}
          label="Enter your consultationFee"
        />
        {errors.consultationFee && (
          <Text style={{ color: 'red' }}>Field required</Text>
        )}


        <TextInput
          style={{ marginVertical: 10 }}
          mode="outlined"
          keyboardType="numeric"
          value={yearOfExperience}
          error={errors.yearOfExperience}
          onChangeText={value => handleInputChange('yearOfExperience', value)}
          label="Enter your yearOfExperience"
        />
        {errors.yearOfExperience && (
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
          {accountCreationLoader ?  <ActivityIndicator color="white"  /> : <Text style={{ color: 'white', fontWeight: 'bold' }}>Submit</Text>}

        </TouchableOpacity>
        {/* {accountCreationLoader === true ? (
          <ActivityIndicator color="white" style={{ position: 'relative', top: height * (-0.077) }} />
        ) : null} */}
      </ScrollView>
    </ScrollView>
  );
};

export default SetDoctorPersonalData;

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