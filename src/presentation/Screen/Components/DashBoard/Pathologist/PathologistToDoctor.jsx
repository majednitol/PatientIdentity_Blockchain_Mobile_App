


// import React, { useState, useEffect, useContext } from 'react';
// import { View, StyleSheet, RefreshControl } from 'react-native';
// import { ActivityIndicator, Card, Text, useTheme } from 'react-native-paper';
// import { ScrollView } from 'react-native-gesture-handler';
// import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
// import { HealthContext } from '../../../../../logic/context/health';
// import { TouchableOpacity } from '@gorhom/bottom-sheet';
// import { useNavigation } from '@react-navigation/native';

// const PathologistToDoctor = () => {
//   const theme = useTheme();
//   const { isLoading,
//     getPathologistAllData, pathologistDoctorList, setIsDbVisiable,
//     PathologistData, reducerValue } = useContext(HealthContext);
//   const [PathoPersonalDoctorsList, setPathoPersonalDoctorList] = useState([]);
//   const [refreshing, setRefreshing] = useState(false);

//   const onRefresh = () => {
//     setRefreshing(true);
//     getPathologistAllData();
//     setRefreshing(false);
//   };
//   useEffect(() => {
//     getPathologistAllData();
//     PathologistData
//     setIsDbVisiable(true)
//   }, [reducerValue])
//   useEffect(() => {
//     if (!isLoading && Array.isArray(PathologistData)) {
//       const personalDoctors = pathologistDoctorList;
//       console.log("personalDoctors9999", personalDoctors)
//       setPathoPersonalDoctorList(personalDoctors || []);
//     }
//   }, [PathologistData, isLoading]);

//   return (
//     <View style={styles.container}>
//       <ScrollView
//         refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//       >
//         <Animated.View entering={FadeInDown.springify()} exiting={FadeInUp.springify()}>
//           {isLoading ? (
//             <View style={styles.loadingContainer}>
//               <ActivityIndicator size={40} animating={true} color={theme.colors.blueA400} />
//             </View>
//           ) : (
//             <>
//               {PathoPersonalDoctorsList.length > 0 ? (
//                 PathoPersonalDoctorsList.slice().reverse().map((doctor, index) => (
//                   <DoctorCard key={index} doctor={doctor} />
//                 ))
//               ) : (
//                 <Card style={{ marginTop: 20 }}>
//                   <Card.Content>
//                     <Text style={styles.title}>You did't sent any report</Text>
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
//   const { isLoading, getDoctorAllData, emailAddress, getDoctorDataFromPathologist, doctorReportFromPatho, doctorData, address, isUserCardShowTo, setIsUserCardShowTo,isUserCardShowFrom, setIsUserCardShowFrom, setIsDbVisiable, setAnotherUser } = useContext(HealthContext);
//   const navigation = useNavigation();
//   const [doctorDatainfo, setDoctorDataInfo] = useState(null);
//   const [imageUrl, setImageUrl] = useState(null);
//   const fetchData = async () => {
//     if (!isLoading) {
//       try {
//         const data = await getDoctorAllData(doctor)
//         setDoctorDataInfo(data)
//         const responsedData = await getDoctorDataFromPathologist(address, doctor);
//         setImageUrl(responsedData)
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   };
//   useEffect(() => {

//     if (imageUrl?.length > 0) {
//       setIsUserCardShowTo(true)
//     }
//     fetchData();
//   }, [doctor,imageUrl]);

//   return (
//     <View>
//       {isUserCardShowTo === true ? (<TouchableOpacity onPress={() => {
//         navigation.navigate('DisplayFile', { imageUrls: imageUrl });
//         setAnotherUser(doctor)
//         setIsDbVisiable(true);
//       }}>
//         <Card style={styles.card}>
//           <Card.Content>
//             {doctorData ? (
//               <>
//                 <CustomText label="Account " value={doctorDatainfo?.[0]} />
//                 <CustomText label="EmailAddress" value={emailAddress} />
//                 <CustomText label="DoctorId " value={String(doctorDatainfo?.[1])} />
//                 <CustomText label="Doctor Name" value={doctorDatainfo?.[2]} />
//               </>
//             ) : (
//               <ActivityIndicator />
//             )}
//           </Card.Content>
//         </Card>
//       </TouchableOpacity>) : (<Card style={{ marginTop: 20 }}>
//         <Card.Content>
//           <Text style={styles.title}>You did't sent any report</Text>
//         </Card.Content>
//       </Card>)}
//     </View>

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

// export default PathologistToDoctor;


import React, { useState, useEffect } from 'react';
import { View, StyleSheet, RefreshControl, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';


import { fetchPatientDataFromDoctor, getPersonalDoctor } from '../../../../../logic/redux/patient/PatientSlice';
import { fetchDoctorData } from '../../../../../logic/redux/doctor/DoctorSlice';
import { useNavigation } from '@react-navigation/native';
import { fetchDoctorDataFromPathologist, fetchPathologistData } from '../../../../../logic/redux/pathologist/pathologistSlice1';
import SmartAccount from '../../../../../service/wallet connect/SmartAccount';
import { ethers } from 'ethers';
import ProfilePicture from '../../File/ProfilePicture';

const PathologistToDoctor = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { pathologistData, loading, error } = useSelector((state) => state.pathologist);

  const [doctorDataArray, setDoctorDataArray] = useState([]);
  const [patientDataFromDoctorArray, setPatientDataFromDoctorArray] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const fetchpathoData = async () => {
    const [smartWallet, saAddress] = await SmartAccount.connectedSmartAccount();
    dispatch(fetchPathologistData(saAddress));
  }
  useEffect(() => {
    fetchpathoData()
  }, [dispatch]);

  useEffect(() => {
    const fetchData = async () => {
      if (!loading && pathologistData?.[7]?.length > 0) {
        if (typeof pathologistData?.[7] === 'string') {
          dataArray = pathologistData?.[7].split(',').map(item => item.trim());
          console.log("dataArray", dataArray)
          const dataPromises = dataArray?.map((doctor) => {
            return dispatch(fetchDoctorData(doctor));
          });
          const doctorDataArray = await Promise.all(dataPromises);
          console.log('doctorDataArray', doctorDataArray)
          // dispatch(fetchPatientDataFromDoctor(doctor));
          setDoctorDataArray(doctorDataArray.map(data => data.payload));

        }
        setIsDataLoaded(true);
      }

    };
    fetchData();
  }, [loading, pathologistData]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchpathoData()
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
              <ActivityIndicator size={40} animating={true} color={theme.colors.blueA400} />
            </View>
          ) : (
            <>
              {isDataLoaded && doctorDataArray.length === 0 ? (
                <Card style={{ marginTop: 20 }}>
                  <Card.Content>
                    <Text style={styles.title}>No doctor data available</Text>
                  </Card.Content>
                </Card>
              ) : (
                doctorDataArray.map((doctorData, index) => (
                  <DoctorCard key={index} doctorData={doctorData} />
                ))
              )}
            </>
          )}
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const DoctorCard = ({ doctorData }) => {
  console.log('DoctorCard66', doctorData);
  const dispatch = useDispatch();
  const { personalDoctor, loading } = useSelector((state) => state.patient);
  const navigation = useNavigation();
  const [imageUrl, setImageUrl] = useState("");
  // const [doctorDataArray, setDoctorDataArray] = useState([]);
  const [patientDataFromDoctorArray, setPatientDataFromDoctorArray] = useState([]);
  const fetchData2 = async () => {
    if (doctorData?.length > 0) {

      const patientDataFromDoctor =
        dispatch(fetchDoctorDataFromPathologist(doctorData[0]));

      patientDataFromDoctor.then((response) => {
        // Access the payload array
        const payloadArray = response.payload;
        if (payloadArray !== null) {
          navigation.navigate('DisplayFile', { imageUrls: payloadArray });
        }
        // setPatientDataFromDoctorArray(payloadArray)
        console.log('patientDataFromDoctorpayloadArray', payloadArray);
      }).catch((error) => {
        console.error('Error fetching doctor data:', error);
      });
    }

  };
  useEffect(() => {


  }, [doctorData]);
  return (
    <View>
      <Card style={styles.card}>
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

export default PathologistToDoctor;
