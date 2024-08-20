import { View } from 'react-native';
import React, { useContext, useEffect } from 'react';


import { ActivityIndicator, Card, MD2Colors, Text } from 'react-native-paper';
import { HealthContext } from '../../../../../logic/context/health';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctorData } from '../../../../../logic/redux/doctor/DoctorSlice';
import SmartAccount from '../../../../../service/wallet connect/SmartAccount';
import { ethers } from 'ethers';
const GetDoctorPersonalData = () => {
  
  const dispatch = useDispatch();
  const { doctorData, loading, error } = useSelector((state) => state.doctor);
  const fetchData = async() => {
    const [smartWallet, saAddress] = await SmartAccount.connectedSmartAccount();
    console.log('saAddress7777', saAddress)
    dispatch(fetchDoctorData(saAddress)); 
    
  }
  function toString(text) {
    return ethers.utils.parseBytes32String(text);
  }
  
  const name = toString(doctorData?.[2])
  const birthDay = toString(doctorData?.[9])
  const Speciality = toString(doctorData?.[3])
  useEffect(() => {
    
    // getDoctorAllData(address);
    // getDoctorAllOtherData(address)
    fetchData()
    console.log(doctorData)
  }, []);
  
  return (
    <View style={{ marginHorizontal: 12, marginVertical: 50 }}>
     
        <Card>
          <Card.Content>
            <Text style={styles.title}>Doctor Basic Information</Text>
          <CustomText label="Account " value={doctorData?.[0]} />
          <CustomText label="EmailAddress" value={doctorData?.[16]} />
            <CustomText label="DoctorId " value={String(doctorData?.[1])} />
            <CustomText label="Doctor Name" value={name} />
            <CustomText label="Doctor BirthDay" value={birthDay} />
            <CustomText label="BMDC Number" value={String(doctorData?.[5])} />
            <CustomText label="Doctor Speciality" value={Speciality} />
            <CustomText
              label="Consultation Fee"
              value={String(doctorData?.[4])}
            />
            <CustomText
              label="Year Of Experience"
              value={String(doctorData?.[6])}
            />
          </Card.Content>
        </Card>
    
    </View>
  );
};

export default GetDoctorPersonalData;

const CustomText = ({ label, value }) => (
  <Text style={styles.text}>
    <Text style={styles.label}>{label}:</Text>{' '}
    <Text style={styles.boldValue} selectable={true}>{value}</Text>
  </Text>
);

const styles = {
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    marginBottom: 10,
    // fontSize:18
  },
  // label: {
  //   fontWeight: "bold",
  // },
  boldValue: {
    fontWeight: 'bold',
  },
};