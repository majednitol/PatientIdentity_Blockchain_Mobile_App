


import React, { useState, useEffect } from 'react';
import { View, StyleSheet, RefreshControl, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctorData, fetchPatientDataFromDoctor, getDoctorAnotherData } from '../../../../../logic/redux/doctor/DoctorSlice';

import { fetchPatientData } from '../../../../../logic/redux/patient/PatientSlice';
import { useNavigation } from '@react-navigation/native';
import { ethers } from 'ethers';
import ProfilePicture from '../../File/ProfilePicture';

const DoctorPersonalPatientList = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { doctorAnotherData, loading } = useSelector((state) => state.doctor);
  const [patientDataArray, setPatientDataArray] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    dispatch(getDoctorAnotherData());
  }, [dispatch]);

  useEffect(() => {
    console.log(doctorAnotherData)
    const fetchData = async () => {
      if (!loading && doctorAnotherData?.[2]?.length > 0) {
        if (typeof doctorAnotherData?.[2] === 'string') {
          dataArray = doctorAnotherData?.[2].split(',').map(item => item.trim());
          console.log(dataArray)
          const dataPromises = dataArray?.map((patient) => {
            return dispatch(fetchPatientData(patient));
          });
          const patientDataArray = await Promise.all(dataPromises);
          console.log('patientDataArray', patientDataArray)

          setPatientDataArray(patientDataArray.map(data => data.payload));
        }
        setIsDataLoaded(true);
      }

    };
    fetchData();
  }, [loading, doctorAnotherData]);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getDoctorAnotherData());
    setIsDataLoaded(false);
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <Animated.View entering={FadeInDown.springify()} exiting={FadeInUp.springify()}>
          {loading && !isDataLoaded ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size={40} animating={true} color={theme.colors.blueA400} />
            </View>
          ) : (
            <>
              {isDataLoaded && patientDataArray.length === 0 ? (
                <Card style={{ marginTop: 20 }}>
                  <Card.Content>
                    <Text style={styles.title}>No Patient data available</Text>
                  </Card.Content>
                </Card>
              ) : (
                patientDataArray.map((patientData, index) => (
                  <PatientCard key={index} patientData={patientData} />
                ))
              )}
            </>
          )}
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const PatientCard = ({ patientData }) => {
  console.log('patientData', patientData);
  const dispatch = useDispatch();

  const navigation = useNavigation();

  // const [doctorDataArray, setDoctorDataArray] = useState([]);
  const [patientDataFromDoctorArray, setPatientDataFromDoctorArray] = useState([]);
  const fetchData2 = async () => {
    if (patientData?.length > 0) {

      const patientDataFromDoctor =
        dispatch(fetchPatientDataFromDoctor(patientData[0]));

      patientDataFromDoctor.then((response) => {
        // Access the payload array
        const payloadArray = response.payload;
        if (payloadArray !== null) {
          navigation.navigate('DisplayFile', { imageUrls: payloadArray });
        }

        console.log('patientDataFromDoctorpayloadArray', payloadArray);
      }).catch((error) => {
        console.error('Error fetching doctor data:', error);
      });
    }

  };
  //  useEffect(() => {


  // }, [ doctorData]);
  return (
    <View >
      <Card style={styles.card} onPress={async () => {
        await fetchData2();


      }}>
        <Card.Content>
          {patientData ? (
            <>
              <View style={{
                flexDirection: 'row',         // Aligns buttons in a row
                justifyContent: 'space-between',     // Centers buttons horizontally
                alignItems: 'center',         // Centers buttons vertically

              }}>
                <ProfilePicture userData={patientData?.[10]} height={150} width={119} borderRadius={20} />
                <View style={{ width: 171, height: 124, marginBottom: 20 }}>
                  <CustomText label="Account" value={patientData[0]} />
                  <CustomText label="PatientId" value={String(patientData[1])} />
                  <CustomText label="Patient Name" value={ethers.utils.parseBytes32String(patientData[2])} />
                  <CustomText label="Patient Gender" value={ethers.utils.parseBytes32String(patientData[3])} />
                </View>
              </View>
            </>
          ) : (
            <ActivityIndicator />
          )}
        </Card.Content>
      </Card>
    </View>
  );
};

const CustomText = ({ label, value }) => (
  <Text style={styles.text}>
    <Text style={styles.label}>{label}:</Text>{' '}
    <Text style={styles.boldValue} selectable={true}>{value}</Text>
  </Text>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 50,
    marginHorizontal: 20,
    marginTop: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    marginBottom: 10,
    elevation: 20,

  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    marginBottom: 2,
    marginTop: 5
    // lineHeight:14
  },
  label: {
    fontWeight: 'bold',
  },
  boldValue: {
    // fontWeight: 'bold',
  },
});

export default DoctorPersonalPatientList;



