
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, RefreshControl, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';


import { fetchPatientDataFromDoctor, getPersonalDoctor } from '../../../../../logic/redux/patient/PatientSlice';
import { fetchDoctorData } from '../../../../../logic/redux/doctor/DoctorSlice';
import { useNavigation } from '@react-navigation/native';
import ProfilePicture from '../../File/ProfilePicture';
import { ethers } from 'ethers';

const PatientPersonalDoctors = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { personalDoctor, loading } = useSelector((state) => state.patient);
  const [doctorDataArray, setDoctorDataArray] = useState([]);
const [patientDataFromDoctorArray, setPatientDataFromDoctorArray] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  useEffect(() => {
    dispatch(getPersonalDoctor());
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      if (!loading && personalDoctor?.length > 0) {
        const dataPromises = personalDoctor?.map((doctor) => {
          return dispatch(fetchDoctorData(doctor));
        });
        const doctorDataArray = await Promise.all(dataPromises);
        console.log('doctorDataArray', doctorDataArray)
        // dispatch(fetchPatientDataFromDoctor(doctor));
        setDoctorDataArray(doctorDataArray.map(data => data.payload));
        setIsDataLoaded(true);
        
      }
      
    };
    fetchData();
  }, [loading, personalDoctor]);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getPersonalDoctor());
    isDataLoaded(false)
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
              <ActivityIndicator size={40} animating={true} color={theme.colors.primary} />
            </View>

          ) : (
            <>
              {isDataLoaded&& doctorDataArray.length === 0 ? (
                <Card style={{ marginTop: 20 }}>
                  <Card.Content>
                    <Text style={styles.title}>No doctor data available</Text>
                  </Card.Content>
                </Card>
              ) :(
                doctorDataArray.map((doctorData, index) => (
                  <DoctorCard key={index} doctorData={doctorData} />
                ))
              ) }
            </>
          )}
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const DoctorCard = ({ doctorData }) => {
  console.log('DoctorCard', doctorData);
  const dispatch = useDispatch();
  const { personalDoctor, loading } = useSelector((state) => state.patient);
  const navigation = useNavigation();
  const [imageUrl, setImageUrl] = useState("");
  // const [doctorDataArray, setDoctorDataArray] = useState([]);
  const [patientDataFromDoctorArray, setPatientDataFromDoctorArray] = useState([]);
  const fetchData2 = async () => {
    if ( doctorData?.length > 0) {
     
      const patientDataFromDoctor =
         dispatch(fetchPatientDataFromDoctor(doctorData[0]));
      
         patientDataFromDoctor.then((response) => {
          // Access the payload array
           const payloadArray = response.payload;
           if (payloadArray!==null) {
            navigation.navigate('DisplayFile', { imageUrls: payloadArray });
         }
          setPatientDataFromDoctorArray(payloadArray)
          console.log('patientDataFromDoctorpayloadArray',payloadArray);
        }).catch((error) => {
          console.error('Error fetching doctor data:', error);
        });
  }
    
  };
   useEffect(() => {
   
    
  }, [ doctorData]);
  return (
  <View>
      <Card style={styles.card} onPress={async () => {
      await fetchData2();
      // console.log("patientDataFromDoctorArray657",patientDataFromDoctorArray)
      
    }}>
        <Card.Content>
          {doctorData ? (
            <>
            <View style={{
                flexDirection: 'row',         // Aligns buttons in a row
                justifyContent: 'space-between',     // Centers buttons horizontally
                alignItems: 'center',         // Centers buttons vertically

              }}>
                <ProfilePicture userData={doctorData?.[8]} height={150} width={119} borderRadius={20} />  
                <View>
                <CustomText label="Account " value={doctorData[0]} />
              <CustomText label="DoctorId " value={String(doctorData[1])} />
              <CustomText label="Doctor Name" value={ethers.utils.parseBytes32String(doctorData[2])} />
                <CustomText label="BMDC Number" value={String(doctorData[5])} />
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
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
  },
  boldValue: {
    fontWeight: 'bold',
  },
});

export default PatientPersonalDoctors;




// import React, { useState, useEffect, useContext } from 'react';
// import { View, StyleSheet, RefreshControl, TouchableOpacity } from 'react-native';
// import { ActivityIndicator, Card, MD2Colors, Text, useTheme } from 'react-native-paper';
// import { ScrollView } from 'react-native-gesture-handler';
// import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
// import { HealthContext } from '../../../../../logic/context/health';
// import { useNavigation } from '@react-navigation/native';
// import { fetchPatientDataFromDoctor, getPersonalDoctor } from '../../../../../logic/redux/patient/PatientSlice';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchDoctorData } from '../../../../../logic/redux/doctor/DoctorSlice';

// const PatientPersonalDoctors = () => {
//   const theme = useTheme();
//   // const { patientData, isLoading, getPatientAllData, reducerValue, smartAccount } = useContext(HealthContext);
//   const dispatch = useDispatch();
//   const { personalDoctor, loading, error } = useSelector((state) => state.patient);

//   const [patientPersonalDoctorsList, setPatientPersonalDoctorsList] = useState([]);
//   const [refreshing, setRefreshing] = useState(false);

//   useEffect(() => {
//     dispatch(getPersonalDoctor());
//   }, []);
  
//   useEffect(() => {
   
//   }, []);

//   useEffect(() => {
//     if (!loading && Array.isArray(personalDoctor)) {
//       const personalDoctors = personalDoctor;
//       console.log("personalDoctors",personalDoctors)
//       setPatientPersonalDoctorsList(personalDoctors || []);
//     }
//   }, [personalDoctor]);

//   const onRefresh = () => {
//     setRefreshing(true);
    
//     getPersonalDoctor();
//     setRefreshing(false);
//   };

//   return (
//     <View style={styles.container}>
//       <ScrollView
//         refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//       >
//         <Animated.View entering={FadeInDown.springify()} exiting={FadeInUp.springify()}>
//           {loading ? (
//             <View style={styles.loadingContainer}>
//               <ActivityIndicator size={40} animating={true} color={theme.colors.blueA400} />
//             </View>
//           ) : (
//             <>
//               {patientPersonalDoctorsList.length > 0 ? (
//                 patientPersonalDoctorsList.slice().reverse().map((doctor, index) => (
//                   <DoctorCard key={index} doctor={doctor} />
//                 ))
//               ) : (
//                 <Card style={{ marginTop: 20 }}>
//                   <Card.Content>
//                     <Text style={styles.title}>You don't have treatment from anyone</Text>
//                   </Card.Content>
//                 </Card>
//               )}
//             </>
//           )}
//         </Animated.View>
//       </ScrollView>
//     </View>
//   );
// };

// const DoctorCard = ({ doctor }) => {
//   const { isLoading, getDoctorAllData, getPatientDataFromDoctor, address } = useContext(HealthContext);
//   // const [doctorData, setDoctorData] = useState(null);
//   const [imageUrl, setImageUrl] = useState("");
//   const navigation = useNavigation();
//   const dispatch = useDispatch();
//   // const { patientDataFromDoctor, loading: doctorLoading } = useSelector((state) => state.patient);
//   const [doctorData, setDoctorData] = useState([]);
//   const [patientDataFromDoctor, setPatientDataFromDoctor] = useState([]);
//   // const { doctorData,loading, error } = useSelector((state) => state.doctor);

//   useEffect(() => {
//     const fetchData = async () => {
//       if ( doctor?.length > 0) {
//         const data = 
//            dispatch(fetchDoctorData(doctor));
      
        
//            data.then((response) => {
          
//           const payloadArray = response.payload;
//         setDoctorData(payloadArray)
//           console.log('payloadArray',payloadArray);
//         }).catch((error) => {
//           console.error('Error fetching doctor data:', error);
//         });
       
        
//       //   const patientDataFromDoctor =
//       //      dispatch(fetchPatientDataFromDoctor(doctor));
        
//       //      patientDataFromDoctor.then((response) => {
//       //       // Access the payload array
//       //       const payloadArray = response.payload;
//       //  setPatientDataFromDoctor(payloadArray)
//       //       console.log('patientDataFromDoctor',payloadArray);
//       //     }).catch((error) => {
//       //       console.error('Error fetching doctor data:', error);
//       //     });
    
       
       
//       }
      
//     };
//     fetchData();
//   }, []);
  
//   const fetchData2 = async () => {
//     if ( doctor?.length > 0) {
     
//       const patientDataFromDoctor =
//          dispatch(fetchPatientDataFromDoctor(doctor));
      
//          patientDataFromDoctor.then((response) => {
//           // Access the payload array
//           const payloadArray = response.payload;
//      setPatientDataFromDoctor(payloadArray)
//           console.log('patientDataFromDoctorpayloadArray',payloadArray);
//         }).catch((error) => {
//           console.error('Error fetching doctor data:', error);
//         });
  
     
     
//     }
    
//   };
//   return (
//     <TouchableOpacity onPress={async () => {
//       await fetchData2();
//       if (patientDataFromDoctor!=null) {
//         navigation.navigate('DisplayFile', { imageUrls: patientDataFromDoctor });
//       }
     
//     }}>
//       <Card style={styles.card}>
//         <Card.Content>
//           {doctorData ? (
//             <>
//               <CustomText label="Account " value={doctorData[0]} />
//               <CustomText label="DoctorId " value={String(doctorData[1])} />
//               <CustomText label="Doctor Name" value={doctorData[2]} />
//               <CustomText label="BMDC Number" value={String(doctorData[5])} />
//             </>
//           ) : (
//             <ActivityIndicator />
//           )}
//         </Card.Content>
//       </Card>
//     </TouchableOpacity>
//   );
// };

// const CustomText = ({ label, value }) => (
//   <Text style={styles.text}>
//     <Text style={styles.label}>{label}:</Text>{' '}
//     <Text style={styles.boldValue} selectable={true}>{value}</Text>
//   </Text>
// );

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginBottom: 50,
//     marginHorizontal: 20,
//     marginTop: 15,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   card: {
//     marginBottom: 10,
//     elevation: 20,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   text: {
//     marginBottom: 10,
//   },
//   label: {
//     fontWeight: 'bold',
//   },
//   boldValue: {
//     fontWeight: 'bold',
//   },
// });

// export default PatientPersonalDoctors;