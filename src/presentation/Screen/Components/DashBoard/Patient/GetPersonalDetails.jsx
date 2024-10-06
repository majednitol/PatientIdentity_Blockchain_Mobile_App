import React, { useEffect, useState } from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { ActivityIndicator, Card, Text, useTheme } from 'react-native-paper';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPatientData } from '../../../../../logic/redux/patient/PatientSlice';
import SmartAccount from '../../../../../service/wallet connect/SmartAccount';
import PersonalHealthData from './PersonalHealthData';
import { ethers } from 'ethers';

const GetPersonalDetails = () => {
  const theme = useTheme();
 
  const { patientData, loading, error } = useSelector((state) => state.patient);

  const [refreshing, setRefreshing] = useState(false);
  const [saAddress, setSaAddress] = useState('');
  const dispatch = useDispatch();
  const fetchData = async () => {
    const [smartWallet, saAddress] = await SmartAccount.connectedSmartAccount();
    console.log('saAddress7777', saAddress);
    dispatch(fetchPatientData(saAddress));
    setSaAddress(saAddress);
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (error) {
    console.log('patienterror', error);
  }

  return (
    <Animated.View
      style={{ marginHorizontal: 12, marginVertical: 50 }}
      entering={FadeInDown.springify()}
      exiting={FadeInUp.springify()}>
      <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View>
          {loading ? (
            <ActivityIndicator color={theme.colors.primary} />
          ) : (
            <View>
              <Card style={{ elevation: 7 }}>
                <Card.Content>
                  <Text style={styles.title}>Patient Basic Information</Text>
                  <CustomText label="Account" value={patientData?.[0]} />
                  <CustomText label="EmailAddress" value={ethers.utils.parseBytes32String(patientData?.[12])} />
                  <CustomText label="PatientId" value={String(patientData?.[1])} />
                    <CustomText label="Patient Name" value={ethers.utils.parseBytes32String(patientData?.[2])} />
                    {console.log(patientData?.[1])}
                  <CustomText label="Patient Birthday" value={ethers.utils.parseBytes32String(patientData?.[11])} />
                    <CustomText label="Patient Gender" value={ethers
                      .utils.parseBytes32String(patientData?.[3])} />
                  <CustomText label="Patient Age" value={String(patientData?.[4])} />
                  <CustomText label="Patient Location" value={ethers.utils.parseBytes32String(patientData?.[5])} />
                </Card.Content>
              </Card>
              <PersonalHealthData personalData={patientData?.[9]} />
            </View>
          )}
        </View>
      </ScrollView>
    </Animated.View>
  );
};

const CustomText = ({ label, value }) => (
  <Text style={styles.text}>
    <Text style={styles.label}>{label}:</Text> <Text style={styles.boldValue}>{value}</Text>
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
  },
  label: {
    fontWeight: 'bold',
  },
  boldValue: {
    fontWeight: 'bold',
  },
};

export default GetPersonalDetails;
