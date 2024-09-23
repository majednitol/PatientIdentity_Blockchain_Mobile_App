import React, { useContext, useEffect, useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { TextInput, Button, ActivityIndicator, MD2Colors, IconButton } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { HealthContext } from '../../../../../logic/context/health';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';
import { BackHandler } from 'react-native';
import { DatePickerInput } from 'react-native-paper-dates';
import { useDispatch, useSelector } from 'react-redux';
import { createPatientAccount } from '../../../../../logic/redux/patient/PatientSlice';
import { fetchConnectedUser } from '../../../../../logic/redux/connectedUserType/connectedUserSlice';
import SmartAccount from '../../../../../service/wallet connect/SmartAccount';

const { width, height } = Dimensions.get('window');

const SetPatientPersonalDetails = () => {
  const {
    generateUniqueId, btnclick, emailAddress } = useContext(HealthContext);

  const dispatch = useDispatch();
  const { loading, error, connectedUserType } = useSelector((state) => state.connectedUser);
  const { loading:accountCreationLoader, error:accountCreationError } = useSelector((state) => state.patient);
  const patientID = generateUniqueId();
  console.log("uniqueId", patientID);
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [inputDate, setInputDate] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');
  const [errors, setErrors] = useState({});
  const [call, setCall] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  
  const genderList = [
    { label: 'male', value: 'male' },
    { label: 'female', value: 'female' },
  ];
  const getUser = useMemo(() => async () => {
    async function fetchUser() {
      if (!loading) {
       
        dispatch(fetchConnectedUser()).then(() => {
          if (connectedUserType === '5') {
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
      });
    }
  }, [btnclick, navigation]);

  useEffect(() => {
    if (call === true) {
      getUser();
    }


  }, [getUser, call]);

  const handleInputChange = (name, value) => {
    if (name === 'name') {
      setName(value);
    } else if (name === 'gender') {
      setGender(value);
    } else if (name === 'age') {
      setAge(value);
    } else if (name === 'location') {
      setLocation(value);
    }
  };

  const handleSubmit = async () => {
    if (
      name.trim() !== '' &&
      age.trim() !== '' &&
      location.trim() !== '' &&
      gender.trim() !== '' &&
      inputDate !== ''
    ) {
      console.log('Form submitted');

      const birthday = inputDate.toString().slice(0, 15);
      dispatch(
        createPatientAccount({
          patientID,
          name,
          gender,
          age,
          location,
          birthday,
          emailAddress
        })
      ).then(() => {
        Alert.alert('SuccessFully created Account')
        setCall(true)
      })
      


    } else {
      console.log('Please fill up all fields');
      setErrors({
        name: name.trim() === '',
        gender: gender.trim() === '',
        age: age.trim() === '',
        location: location.trim() === '',
        inputDate: inputDate === '',
      });
    }
  };

  return (
    
      <ScrollView  style={{ marginHorizontal: 16, backgroundColor:"#F6F6F6"}}>
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
          value={gender}
          error={errors.gender}
          onChangeText={value => handleInputChange('gender', value)}
          label="Enter your gender"
        />
        {errors.gender && <Text style={{ color: 'red' }}>Field required</Text>}

        <TextInput
          style={{ marginVertical: 10 }}
          mode="outlined"
          keyboardType="numeric"
          value={age}
          error={errors.age}
          onChangeText={value => handleInputChange('age', value)}
          label="Enter your age"
        />
        {errors.age && <Text style={{ color: 'red' }}>Field required</Text>}

        <TextInput
          style={{ marginVertical: 10 }}
          mode="outlined"
          keyboardType="default"
          value={location}
          error={errors.location}
          onChangeText={value => handleInputChange('location', value)}
          label="Enter your location"
        />
        {errors.location && <Text style={{ color: 'red' }}>Field required</Text>}

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
    
  );
};

export default SetPatientPersonalDetails;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#8D68F6',
    height: height * 0.05,
    width: width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: width * (0.05),
    borderRadius: 10,
    marginVertical: 30,
  },
  
});
