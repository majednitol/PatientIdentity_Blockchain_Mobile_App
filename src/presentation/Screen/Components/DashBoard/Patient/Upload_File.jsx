import React, { useContext, useEffect, useState } from 'react';
import FileUpload from '../../File/FileUpload';

import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

import { HealthContext } from '../../../../../logic/context/health';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPatientData } from '../../../../../logic/redux/patient/PatientSlice';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import SmartAccount from '../../../../../service/wallet connect/SmartAccount';

const Upload_File = () => {

 
  const dispatch = useDispatch();
  const { patientData, loading, error } = useSelector((state) => state.patient);
  const [address,setAddress] = useState()
  const fetchAddress = async() => {
    const [smartWallet, saAddress] = await SmartAccount.connectedSmartAccount();
    setAddress(saAddress)
  }
  
  useEffect(() => {
    dispatch(fetchPatientData(address)); 
    
    fetchAddress()
}, []);


  return (
    <Animated.View
      style={{ flex: 1 }}
      entering={FadeInDown.springify()}
      exiting={FadeInUp.springify()}>
      <FileUpload userAddress={address} />

      {/* {console.warn(patientData)} */}
    </Animated.View>
  );
};

export default Upload_File;
