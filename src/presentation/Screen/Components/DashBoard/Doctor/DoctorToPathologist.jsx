


// import React, { useState, useEffect, useContext } from 'react';
// import { View, StyleSheet, RefreshControl } from 'react-native';
// import { ActivityIndicator, Card, Text, useTheme } from 'react-native-paper';
// import { ScrollView } from 'react-native-gesture-handler';
// import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
// import { HealthContext } from '../../../../../logic/context/health';
// import { TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// const DoctorToPathologist = () => {
//     const theme = useTheme();
//     const { isLoading,
//         getDoctorAllData,
//         doctorData,
//         reducerValue, pathologistDoctorList, doctorPathoList, setIsDbVisiable, getDoctorAllOtherData, address ,isUserCardShowTo} = useContext(HealthContext);
//     const [DoctorPersonalPathoList, setDoctorPersonalPathoList] = useState([]);
//     const [refreshing, setRefreshing] = useState(false);
//     console.log("doctorPathoList888888", isUserCardShowTo)
//     const onRefresh = () => {
//         setRefreshing(true);
//         getDoctorAllData();
//         setRefreshing(false);
//     };
//     useEffect(() => {
//         getDoctorAllOtherData(address)
//         getDoctorAllData();
//         doctorData
//         setIsDbVisiable(true)
//     }, [reducerValue])
//     useEffect(() => {
//         if (!isLoading && Array.isArray(doctorData)) {
//             const personalPathologists = doctorPathoList;
//             setDoctorPersonalPathoList(personalPathologists || []);
//         }
//     }, [doctorData, isLoading]);

//     return (
//         <View style={styles.container}>
//             <ScrollView
//                 refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//             >
//                 <Animated.View entering={FadeInDown.springify()} exiting={FadeInUp.springify()}>
//                     {isLoading ? (
//                         <View style={styles.loadingContainer}>
//                             <ActivityIndicator size={40} animating={true} color={theme.colors.blueA400} />
//                         </View>
//                     ) : (
//                         <>
//                             {DoctorPersonalPathoList.length > 0 ? (
//                                 DoctorPersonalPathoList.slice().reverse().map((pathologist, index) => (
//                                     <PathologistCard key={index} pathologist={pathologist} />
//                                 ))
//                             ) : (
//                                 <Card style={{ marginTop: 20 }}>
//                                     <Card.Content>
//                                         <Text style={styles.title}>You did't sent any prescription</Text>
//                                     </Card.Content>
//                                 </Card>
//                             )}
//                         </>
//                     )}
//                 </Animated.View>
//             </ScrollView>
//         </View>
//     );
// };

// const PathologistCard = ({ pathologist }) => {
//     console.log("pathologist", pathologist)
//     const { isLoading, getPathologistAllData, emailAddress, getPathologistDataFromDoctor, getDoctorDataFromPathologist, anotherUser, setAnotherUser, doctorReportFromPatho, prescriptionFromDoctor, doctorData, isUserCardShowTo, setIsUserCardShowTo, isUserCardShowFrom, setIsUserCardShowFrom, address, setIsDbVisiable } = useContext(HealthContext);
//     const navigation = useNavigation();
//     const [pathologistData, setPathologistData] = useState(null);
//     const [imageUrl, setImageUrl] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const fetchData = async () => {

//         try {
//             const data = await getPathologistAllData(pathologist);
//             setPathologistData(data);
//             const responsedData = await getPathologistDataFromDoctor(address, pathologist);
//             setImageUrl(responsedData)
//             setLoading(false)
//             console.log("pathologistdata", pathologist)
//             if (responsedData.length > 0) {
//                 setIsUserCardShowTo(true)
//             }
//     console.log("doctorPathoList888888999000", isUserCardShowTo)

//         } catch (error) {
//             console.error(error);
//         }

//     };
//     useEffect(() => {

//         fetchData();
//     console.log("ooooooooooooooooo", isUserCardShowTo)
        
//     }, [pathologist]);

//     return (
//         <View>
//             {isUserCardShowTo === true ? (<TouchableOpacity onPress={() => {
//                 navigation.navigate('DisplayFile', { imageUrls: imageUrl });
//                 setAnotherUser(pathologist)
//                 setIsDbVisiable(true)
//             }}>
//                 <Card style={styles.card}>
//                     {console.log("pathologist", pathologist)}
//                     <Card.Content>
//                         {pathologistData ? (
//                             <>
//                                 <CustomText label="Account " value={pathologistData?.[0]} />
//                                 <CustomText label="EmailAddress" value={emailAddress} />
//                                 <CustomText label="PathologistID" value={String(pathologistData?.[1])} />
//                                 <CustomText label="Pathologist Name" value={pathologistData?.[2]} />
//                             </>
//                         ) : (
//                             <ActivityIndicator />

//                         )}
//                     </Card.Content>
//                 </Card>
//             </TouchableOpacity>) : (<Card style={{ marginTop: 20 }}>
//                 <Card.Content>
//                     <Text style={styles.title}>You did't sent any prescription</Text>
//                 </Card.Content>
//             </Card>)}
//         </View>
//     );
// };

// const CustomText = ({ label, value }) => (
//     <Text style={styles.text}>
//         <Text style={styles.label}>{label}:</Text>{' '}
//         <Text style={styles.boldValue} selectable={true}>{value}</Text>
//     </Text>
// );

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         marginBottom: 50,
//         marginHorizontal: 20,
//         marginTop: 15,
//         justifyContent: 'center',
//     },
//     loadingContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     card: {
//         marginBottom: 10,
//         elevation: 20,
//     },
//     title: {
//         fontSize: 22,
//         fontWeight: 'bold',
//         marginBottom: 10,
//     },
//     text: {
//         marginTop: 10,
//     },
//     label: {
//         fontWeight: 'bold',
//     },
//     boldValue: {
//         fontWeight: 'bold',
//     },
// });

// export default DoctorToPathologist;





import React, { useState, useEffect } from 'react';
import { View, StyleSheet, RefreshControl, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';



import { fetchPathologistDataFromDoctor, getDoctorAnotherData } from '../../../../../logic/redux/doctor/DoctorSlice';

import { useNavigation } from '@react-navigation/native';
import { fetchPathologistData } from '../../../../../logic/redux/pathologist/pathologistSlice1';

const DoctorToPathologist = () => {
    
  const theme = useTheme();
  const dispatch = useDispatch();
  const { doctorAnotherData,loading } = useSelector((state) => state.doctor);
  const [pathologistDataArray, setPathologistDataArray] = useState([]);
const [patientDataFromDoctorArray, setPatientDataFromDoctorArray] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

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
                    <Text style={styles.title}>No doctor data available</Text>
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
               setUserAddress(pathologist)
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
                               <CustomText label="EmailAddress" value={emailAddress} />
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



