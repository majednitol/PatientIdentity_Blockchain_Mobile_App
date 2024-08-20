import React, { useContext, useEffect, useState } from 'react';
import DisplayFile from '../../File/DisplayFile';

import Animated from 'react-native-reanimated';
import { HealthContext } from '../../../../../logic/context/health';
import { RefreshControl, ScrollView } from 'react-native';
import { ActivityIndicator, MD2Colors, useTheme } from 'react-native-paper';
import { fetchPatientData } from '../../../../../logic/redux/patient/PatientSlice';
import { useDispatch, useSelector } from 'react-redux';
import SmartAccount from '../../../../../service/wallet connect/SmartAccount';


const Prescription = () => {
  const theme = useTheme();
  const {
    getPatientAllData,reducerValue,setIsDbVisiable,setAnotherUser,smartAccount
  } = useContext(HealthContext);
  const dispatch = useDispatch();
  const { patientData, loading, error } = useSelector((state) => state.patient);
  const [refreshing, setRefreshing] = useState(false);
  const fetchpatient = async() => {
    const [smartWallet, saAddress] = await SmartAccount.connectedSmartAccount();
    console.log('saAddress7777', saAddress)
    dispatch(fetchPatientData(saAddress)); 
    
}
  const onRefresh = () => {
    setRefreshing(true);
    // getPatientAllData();
    fetchpatient()
    patientData
    setRefreshing(false);

  };

  useEffect(() => {
   
    fetchpatient()
      patientData
      setIsDbVisiable(true)
    
    
  }, [reducerValue])
  
  useEffect(() => {
    fetchpatient()
      
    
}, [reducerValue]);


if (loading) {
  return <ActivityIndicator animating={true} color={theme.colors.primary} />;
}

if (error) {
console.log('patienterror',error);
}
  return (
    
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }><Animated.View>
        <DisplayFile userData={patientData?.[8]} />
        </Animated.View>
      </ScrollView>
    
  );
};

export default Prescription;
