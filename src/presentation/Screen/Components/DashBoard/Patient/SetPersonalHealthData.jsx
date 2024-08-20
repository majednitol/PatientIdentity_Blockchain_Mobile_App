import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, Alert, StyleSheet } from 'react-native';
import { TextInput, Button, ActivityIndicator } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { HealthContext } from '../../../../../logic/context/health';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPatientData, updatePatientHealthData } from '../../../../../logic/redux/patient/PatientSlice';
import SmartAccount from '../../../../../service/wallet connect/SmartAccount';

const { width, height } = Dimensions.get('window');
const FONT_SIZE_BASE = Math.min(width, height) * 0.04; // Adjust base font size according to screen dimensions

const SetPersonalHealthData = () => {
  const { setPatientPersonalData, smartAccount } = useContext(HealthContext);
  
  const [heigh, setHeight] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [previousDiseases, setPreviousDiseases] = useState('');
  const [medicineDrugs, setMedicineDrugs] = useState('');
  const [badHabits, setBadHabits] = useState('');
  const [chronicDiseases, setChronicDiseases] = useState('');
  const [healthAllergies, setHealthAllergies] = useState('');
  const [birthDefects, setBirthDefects] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const fetchData = async () => {
    const [smartWallet, saAddress] = await SmartAccount.connectedSmartAccount();
    console.log('saAddress7777', saAddress);
    dispatch(fetchPatientData(saAddress));
    
  };
  const { updateloading:ispatientLoading, error } = useSelector((state) => state.patient);
  const handleInputChange = (name, value) => {
    if (name === 'heigh') {
      setHeight(value);
    } else if (name === 'bloodGroup') {
      setBloodGroup(value);
    } else if (name === 'previousDiseases') {
      setPreviousDiseases(value);
    } else if (name === 'medicineDrugs') {
      setMedicineDrugs(value);
    } else if (name === 'badHabits') {
      setBadHabits(value);
    } else if (name === 'chronicDiseases') {
      setChronicDiseases(value);
    } else if (name === 'healthAllergies') {
      setHealthAllergies(value);
    } else if (name === 'birthDefects') {
      setBirthDefects(value);
    }
  };

  const handleSubmit = () => {
   
      if (
        heigh.trim() !== '' &&
        bloodGroup.trim() !== '' &&
        previousDiseases.trim() !== '' &&
        medicineDrugs.trim() !== '' &&
        badHabits.trim() !== '' &&
        chronicDiseases.trim() !== '' &&
        healthAllergies.trim() !== '' &&
        birthDefects.trim() !== ''
      ) {
        console.log('Form submitted');
        dispatch(updatePatientHealthData(
         { heigh,
          bloodGroup,
          previousDiseases,
          medicineDrugs,
          badHabits,
          chronicDiseases,
          healthAllergies,
          birthDefects}
        )).then(() => {
          Alert.alert("Data updated successfully")
          fetchData()
        });
      } else {
        console.log('Please fill up all fields');
        setErrors({
          heigh: heigh.trim() === '',
          previousDiseases: previousDiseases.trim() === '',
          badHabits: badHabits.trim() === '',
          bloodGroup: bloodGroup.trim() === '',
          medicineDrugs: medicineDrugs.trim() === '',
          chronicDiseases: chronicDiseases.trim() === '',
          healthAllergies: healthAllergies.trim() === '',
          birthDefects: birthDefects.trim() === '',
        });
      }
    
  };



  return (
    <ScrollView>

      <Animated.View entering={FadeInDown.duration(800)}
        exiting={FadeInUp.springify()} style={{ marginHorizontal: 16 }}>
        <TextInput
          style={{ marginVertical: height * 0.01 }}
          mode="outlined"
          keyboardType="numeric"
          value={heigh}
          error={errors.heigh}
          onChangeText={value => handleInputChange('heigh', value)}
          label="Enter your height"
        />
        {errors.heigh && <Text style={{ color: 'red' }}>Field required</Text>}

        <TextInput
          style={{ marginVertical: height * 0.01 }}
          mode="outlined"
          keyboardType="default"
          value={previousDiseases}
          error={errors.previousDiseases}
          onChangeText={value => handleInputChange('previousDiseases', value)}
          label="Enter your previousDiseases"
        />
        {errors.previousDiseases && (
          <Text style={{ color: 'red' }}>Field required</Text>
        )}

        <TextInput
          style={{ marginVertical: height * 0.01 }}
          mode="outlined"
          keyboardType="default"
          value={badHabits}
          error={errors.badHabits}
          onChangeText={value => handleInputChange('badHabits', value)}
          label="Enter your badHabits"
        />
        {errors.badHabits && <Text style={{ color: 'red' }}>Field required</Text>}

        <TextInput
          style={{ marginVertical: height * 0.01 }}
          mode="outlined"
          keyboardType="default"
          value={bloodGroup}
          error={errors.bloodGroup}
          onChangeText={value => handleInputChange('bloodGroup', value)}
          label="Enter your bloodGroup"
        />
        {errors.bloodGroup && (
          <Text style={{ color: 'red' }}>Field required</Text>
        )}

        <TextInput
          style={{ marginVertical: height * 0.01 }}
          mode="outlined"
          keyboardType="default"
          value={medicineDrugs}
          error={errors.medicineDrugs}
          onChangeText={value => handleInputChange('medicineDrugs', value)}
          label="Enter your medicineDrugs"
        />
        {errors.medicineDrugs && (
          <Text style={{ color: 'red' }}>Field required</Text>
        )}
        <TextInput
          style={{ marginVertical: height * 0.01 }}
          mode="outlined"
          keyboardType="default"
          value={chronicDiseases}
          error={errors.chronicDiseases}
          onChangeText={value => handleInputChange('chronicDiseases', value)}
          label="Enter your chronicDiseases"
        />
        {errors.chronicDiseases && (
          <Text style={{ color: 'red' }}>Field required</Text>
        )}

        <TextInput
          style={{ marginVertical: height * 0.01 }}
          mode="outlined"
          keyboardType="default"
          value={healthAllergies}
          error={errors.healthAllergies}
          onChangeText={value => handleInputChange('healthAllergies', value)}
          label="Enter your healthAllergies"
        />
        {errors.birthDefects && (
          <Text style={{ color: 'red' }}>Field required</Text>
        )}
        <TextInput
          style={{ marginVertical: height * 0.01 }}
          mode="outlined"
          keyboardType="default"
          value={birthDefects}
          error={errors.birthDefects}
          onChangeText={value => handleInputChange('birthDefects', value)}
          label="Enter your birthDefects"
        />
        {errors.birthDefects && (
          <Text style={{ color: 'red' }}>Field required</Text>
        )}
        <TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit}
            // Text color
          >

            
            {ispatientLoading ? <ActivityIndicator color="white"  />  : <Text style={{ color: 'white', fontWeight: 'bold' }}>Submit</Text>}
          </TouchableOpacity>
          {/* {ispatientLoading === true ? <ActivityIndicator color="white" style={{ position: 'relative', top:  -height * 0.075 }} /> : null} */}
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );
};

export default SetPersonalHealthData;
const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgb(108, 99, 255)',
    height: height * 0.05,
    width: width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: width * (0.05),
    borderRadius: 10,
    marginVertical: 30,
  },
});