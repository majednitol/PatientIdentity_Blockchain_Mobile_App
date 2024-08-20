// import React, { useEffect, useState } from 'react';
// import { View, Text, Button, TextInput, ActivityIndicator } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchPatientData, shareData } from './PatientSlice';
// import SmartAccount from '../../../service/wallet connect/SmartAccount';

// // import { fetchCounterValue, setCounterValue } from './apiSlice';

// const PatientView = () => {
//   const dispatch = useDispatch();
//   const { patientData, loading, error } = useSelector((state) => state.patient);

 
//   useEffect(() => {
//       dispatch(fetchPatientData());
//         dispatch(shareData("0xF04d80AcaFAeC72485Bf136E8254BD5B6CDA3a19","0xF04d80AcaFAeC72485Bf136E8254BD5B6CDA3a19"));
      
//   }, []);



//   if (loading) {
//     return <ActivityIndicator />;
//   }

//   if (error) {
//  console.log('patienterror',error);
//   }

//   return (
//     <View>
//       {/* <Text>Counter Value: {}</Text>
//       <TextInput
//         placeholder="New Counter Value"
//         value={newValue}
//         onChangeText={setNewValue}
//         keyboardType="numeric"
//       />
//       <Button title="Set Counter" onPress={handleSetCounter} /> */}
//       <Text>{JSON.stringify(patientData[0])}</Text>
//     </View>
//   );
// };

// export default PatientView;

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const PatientView = () => {
  return (
    <View>
      <Text>PatientView</Text>
    </View>
  )
}

export default PatientView

const styles = StyleSheet.create({})