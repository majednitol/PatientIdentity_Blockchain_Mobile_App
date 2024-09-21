
import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, RefreshControl, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';



import { fetchPathologistDataFromDoctor, getDoctorAnotherData } from '../../../../../logic/redux/doctor/DoctorSlice';

import { useNavigation } from '@react-navigation/native';
import { fetchPathologistData } from '../../../../../logic/redux/pathologist/pathologistSlice1';
import { HealthContext } from '../../../../../logic/context/health';

const DoctorToPathologist = () => {
    
  const theme = useTheme();
  const dispatch = useDispatch();
  const { doctorAnotherData,loading } = useSelector((state) => state.doctor);
  const [pathologistDataArray, setPathologistDataArray] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(getDoctorAnotherData());
  }, [dispatch]);

  useEffect(() => {
    console.log(doctorAnotherData)
    const fetchData = async () => {
      if (!loading && doctorAnotherData?.[4]?.length > 0) {
        if (typeof doctorAnotherData?.[4] === 'string') {
          dataArray = doctorAnotherData?.[4].split(',').map(item => item.trim());
          console.log(dataArray)
          const dataPromises = dataArray?.map((pathoLogist) => {
            return dispatch(fetchPathologistData(pathoLogist));
          });
          const pathologistDataArray = await Promise.all(dataPromises);
          console.log('patientDataArray', pathologistDataArray)
          // dispatch(fetchPatientDataFromDoctor(doctor));
          setPathologistDataArray(pathologistDataArray.map(data => data.payload));
        }
      }
      
    };
    fetchData();
  }, [loading, doctorAnotherData]);

  const onRefresh = () => {
    setRefreshing(true);
    
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <Animated.View entering={FadeInDown.springify()} exiting={FadeInUp.springify()}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size={40} animating={true} color={theme.colors.blueA400} />
            </View>
          ) : (
            <>
              {pathologistDataArray.length > 0 ? (
                pathologistDataArray.map((pathologistData, index) => (
                  <PathoLogistCard key={index} pathologistData={pathologistData} />
                ))
              ) : (
                <Card style={{ marginTop: 20 }}>
                  <Card.Content>
                    <Text style={styles.title}>You didn't sent any prescription to any pathologist</Text>
                  </Card.Content>
                </Card>
              )}
            </>
          )}
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const PathoLogistCard = ({ pathologistData }) => {
  console.log('patientData', pathologistData);
  const dispatch = useDispatch();
    const { setIsDbVisiable,setUserAddress} = useContext(HealthContext);
  const navigation = useNavigation();
  
  // const [doctorDataArray, setDoctorDataArray] = useState([]);

  const fetchData2 = async () => {
    if ( pathologistData?.length > 0) {
     
      const patientDataFromDoctor =
         dispatch(fetchPathologistDataFromDoctor(pathologistData[0]));
      
         patientDataFromDoctor.then((response) => {
          // Access the payload array
           const payloadArray = response.payload;
           if (payloadArray!==null) {
               navigation.navigate('DisplayFile', { imageUrls: payloadArray });
              //  setUserAddress(pathologist)
               setIsDbVisiable(true)
         }
          
          console.log('patientDataFromDoctorpayloadArray',payloadArray);
        }).catch((error) => {
          console.error('Error fetching doctor data:', error);
        });
  }
    
  };
  //  useEffect(() => {
   
    
  // }, [ doctorData]);
  return (
    <TouchableOpacity onPress={async () => {
      await fetchData2();
      // console.log("patientDataFromDoctorArray657",patientDataFromDoctorArray)
      
    }}>
      <Card style={styles.card}>
        <Card.Content>
          {pathologistData ? (
            <>
            <CustomText label="Account " value={pathologistData?.[0]} />
                               <CustomText label="EmailAddress" value={''} />
                              <CustomText label="PathologistID" value={String(pathologistData?.[1])} />
                               <CustomText label="Pathologist Name" value={pathologistData?.[2]} />
            </>
          ) : (
            <ActivityIndicator />
          )}
        </Card.Content>
      </Card>
    </TouchableOpacity>
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
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
  },
  boldValue: {
    fontWeight: 'bold',
  },
});

export default DoctorToPathologist;



