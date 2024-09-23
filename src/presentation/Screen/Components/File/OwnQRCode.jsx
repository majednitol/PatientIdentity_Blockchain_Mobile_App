// import React, { useState, useEffect, useContext } from 'react';
// import { View, Button, Text, StyleSheet } from 'react-native';
// import QRCode from 'react-native-qrcode-svg';
// import { HealthContext } from '../../../../logic/context/health';
// import { useColorScheme } from 'react-native';
// import SmartAccount from '../../../../service/wallet connect/SmartAccount';

// const OwnQRCode = () => {
//     const [qrValue, setQRValue] = useState('');
//     const [saAddress, setSaAddress] = useState('')

//     const theme = useColorScheme()
//     const fetchAddress = async() => {
//         const [smartWallet, saAddress] = await SmartAccount.connectedSmartAccount();
//         // console.log(saAddress)
//         setSaAddress(saAddress);
//     }
//     useEffect(() => {
//         fetchAddress().then(() => {
//             generateQRCodeValue(); 
//         })

//     }, [saAddress]);

//     const generateQRCodeValue = () => {
//         // Example object
//         if (saAddress !== null) {
//             setQRValue(saAddress)
//         }
//     };
//     return (
//         <View style={styles.container}>
//             <View style={styles.container2}>
//             {qrValue ? (
//                 <QRCode value={qrValue} size={230} color='red' />
//             ) : (
//                 <View>
//                     <Text>Loading QR Code...</Text>
//                 </View>
//             )}
//             </View>
//         </View>
//     );
// }
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',


//     },

//     container2: {
//         backgroundColor: 'white',
//         padding: 20,
//         borderRadius:10
//     },
// });
// export default OwnQRCode

import * as React from 'react';
import { View, ScrollView, StyleSheet, useColorScheme } from 'react-native';
import { Avatar, Text, Button, IconButton, Card, ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { fetchConnectedUser } from '../../../../logic/redux/connectedUserType/connectedUserSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminData } from '../../../../logic/redux/admin/AdminSlice';
import { fetchPatientData } from '../../../../logic/redux/patient/PatientSlice';
import { fetchMedicalResearchLabData } from '../../../../logic/redux/medical research lab/medicalResearchLabSlice';
import { fetchPharmacyCompanyData } from '../../../../logic/redux/pharmacy company/pharmacyCompanySlice';
import { fetchPathologistData } from '../../../../logic/redux/pathologist/pathologistSlice1';
import { fetchDoctorData } from '../../../../logic/redux/doctor/DoctorSlice';
import SmartAccount from '../../../../service/wallet connect/SmartAccount';
import { ethers } from 'ethers';
import { HealthContext } from '../../../../logic/context/health';
import ProfilePicture from './ProfilePicture';

export default function PatientDashboard() {
    const navigation = useNavigation()
    const scheme = useColorScheme();
    const MyTheme = {
        dark: false,
        darkcolors: {
          card: 'rgb(255, 255, 255)',
          text: 'white',
          border: 'rgb(199, 199, 204)',
          notification: 'rgb(255, 69, 58)',
          primary: '#dcb8ff',
          secondary: '#d0c1da',
          tertiary: '#f3b7be',
          error: '#ffb4ab',
          title: '#000000',
          background: '#000000',
        },
        lightColors: {
          borderBottomColor: '#f4f4f4',
          text: '#111',
    
          backgroundColor: '#rgb(228, 226, 255)',
          headerbackgroundColor: 'rgb(108, 99, 255)',
          headerTintColor: '#fff',
          iconcolor: '#808080',
        },
      };
      const dispatch = useDispatch();
      const {


        PharmacyCompanyData,
        MedicalResearchLab,
        PathologistData,
        pploader,
        isLoading, connectedAccountBalance, ConnectedAccountUser, web3Auth, setWeb3Auth, smartAccountAddress
      } = React.useContext(HealthContext);
      const { patientData, loading, error } = useSelector((state) => state.patient);
      
      const { pathologistData } = useSelector((state) => state.pathologist);
      const { connectedUserType, } = useSelector((state) => state.connectedUser);
      const [address, setAddress] = React.useState('')
      const [addressBalance, setAddressBalance] = React.useState('')
      // const web3Auth = useSelector(getWeb3Auth)
      const fetchAddress = async () => {
        const [smartWallet, saAddress] = await SmartAccount.connectedSmartAccount();
        //dispatch(fetchPatientData( saAddress ));
        console.log("connectedUserType00999", connectedUserType)
        if (String(connectedUserType) === '1') {
          dispatch(fetchDoctorData(saAddress));
        } else if (String(connectedUserType) === '2') {
          dispatch(fetchPathologistData(saAddress));
        } else if (String(connectedUserType) === '4') {
          dispatch(fetchPharmacyCompanyData(saAddress))
        } else if (String(connectedUserType) === '3') {
          dispatch(fetchMedicalResearchLabData(saAddress))
        } else if (String(connectedUserType) === '5') {
          dispatch(fetchPatientData(saAddress));
        }else if (String(connectedUserType) === '6') {
          dispatch(fetchAdminData(saAddress));
        }
    
    
        setAddress(saAddress)
      }
      const { adminData } = useSelector((state) => state.admin);
      const { doctorData } = useSelector((state) => state.doctor);
      const { medicalResearchLabData } = useSelector((state) => state.medicalResearchLab);
      const { pharmacyCompanyData } = useSelector((state) => state.pharmacyCompany);
      const fetchAddressBalance = async () => {
        const bal = await SmartAccount.Balance()
        setAddressBalance(bal)
      }
    
      React.useEffect(() => {
    
        dispatch(fetchConnectedUser()).then(() => {
          fetchAddress()
          fetchAddressBalance()
        })
      }, []);
      React.useEffect(() => {
    
        console.log("connectedUserType788888", connectedUserType)
        if (connectedUserType) {
          fetchAddress()
          fetchAddressBalance()
    
        }
      }, [connectedUserType]);
      if (error) {
        console.log("loading", error)
      } else {
        console.log("loading", patientData)
      }
      const logout = async () => {
        dispatch(setPrivateKey(null))
        //await web3Auth?.logout();
    
        console.log('Logged out');
    
      };
    
    
      const firstFive = address.slice(0, 10);
      const lastFive = address.slice(-10);
    
    
      const useraddress = `${firstFive}...${lastFive}`;
    
    const dashboards = [
        {
            title: 'Patient',
            connectedUserType:'5',
            components: [
                { label: 'Notifications', screen: 'Notifications' },
                { label: 'Your Information', screen: 'Your Information' },
                { label: "Update Health Data", screen: "Update Personal Health data" },
                { label: 'Your Prescriptions', screen: 'Your Prescriptions' },
                { label: 'Upload File', screen: 'Upload File' },
                { label: 'Share data', screen: 'Share data' }, { label: 'Your Doctors', screen: 'Your Doctors' }, { label: 'Shared User', screen: 'Shared User' }, { label: 'Share data', screen: 'Share data' },
                { label: "Own QR Code", screen: "Own QR Code" },
                { label: "Image Scanner", screen: "Image Scanner" },
                { label: "Subscription Status", screen: "Subscription Status" },
            ],
        },
        {
            title: 'Admin',
            connectedUserType:'6',
            components: [{ label: 'Notification', screen: 'Notification' },
                { label: 'Personal Info', screen: 'Personal Info' },
                { label: "User Analytics", screen: "User Analytics" },
                { label: "Shared Data To Users List", screen: "Shared Data To Users List" },
                { label: 'Prescription', screen: 'Prescription' },
                { label: 'Share data', screen: 'Share data' },
                { label: "Own QR Code", screen: "Own QR Code" },
                { label: "Image Scanner", screen: "Image Scanner" },
                { label: "Subscription Status", screen: "Subscription Status" },
            ],
        },{
            title: 'Doctor',
            connectedUserType:'1',
            components: [{ label: 'Notification', screen: 'Notification' },
                { label: 'Personal Info', screen: 'Personal Info' },
                { label: "Sent Prescription", screen: "Sent Prescription" },
                { label: 'Personal Patient', screen: 'Personal Patient' },
                { label: "Patient Prescription", screen: "Patient Prescription" },
                { label: 'DoctorFromPathologist', screen: 'DoctorFromPathologist' },
                { label: 'DoctorToPathologist', screen: 'DoctorToPathologist' },
                { label: "Own QR Code", screen: "Own QR Code" },
                { label: "Image Scanner", screen: "Image Scanner" },
                { label: "Subscription Status", screen: "Subscription Status" },
            ],
        },{
            title: 'Pathlogist',
            connectedUserType:'2',
            components: [{ label: 'Notification', screen: 'Notification' },
                { label: 'Personal Info', screen: 'Personal Info' },
                { label: "Share Report To Doctor", screen: "Share Report To Doctor" },
                { label: 'PathologistFromDoctor', screen: 'PathologistFromDoctor' },
                { label: "PathologistToDoctor", screen: "PathologistToDoctor" },
                { label: "Own QR Code", screen: "Own QR Code" },
                { label: "Image Scanner", screen: "Image Scanner" },
                { label: "Subscription Status", screen: "Subscription Status" },
            ],
        },{
            title: 'Pharacy',
            connectedUserType:'4',
            components: [{ label: 'Notification', screen: 'Notification' },
                { label: 'Personal Information', screen: 'Personal Information' },
                { label: "Add Top Medicine", screen: "Add Top Medicine" },
                { label: 'View Medicine', screen: 'View Medicine' },
                { label: "Patient Prescription", screen: "Patient Prescription" },                { label: "Own QR Code", screen: "Own QR Code" },
                { label: "Image Scanner", screen: "Image Scanner" },
                { label: "Subscription Status", screen: "Subscription Status" },

            ],
        },
        {
            title: 'Medical',
            connectedUserType:'3',
            components: [{ label: 'Notification', screen: 'Notification' },
                { label: 'Personal Info', screen: 'Personal Info' },
                { label: "Add Report", screen: "Add Report" },
                { label: 'Patient Prescription', screen: 'Patient Prescription' },
                { label: "Prescription or Report", screen: "Prescription or Report" },
                { label: "Own QR Code", screen: "Own QR Code" },
                { label: "Image Scanner", screen: "Image Scanner" },
                { label: "Subscription Status", screen: "Subscription Status" },

            ],
        },
    ];
    return (
        <ScrollView style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
            {isLoading || address == null ? (
                  <ActivityIndicator size={50} />
                ) : String(connectedUserType) === '1' ? (
                  <ProfilePicture userData={doctorData?.[8]} />
                ) : String(connectedUserType) === '2' ? (
                  <ProfilePicture userData={pathologistData?.[11]} />
                ) : String(connectedUserType) === '4' ? (
                  <ProfilePicture userData={pharmacyCompanyData?.[9]} />
                ) : String(connectedUserType) === '3' ? (
                  <ProfilePicture userData={medicalResearchLabData?.[9]} />
                ) : String(connectedUserType) === '5' ? (
                  <ProfilePicture userData={patientData?.[10]} />
                ) : String(connectedUserType) === '6' ? (
                  <ProfilePicture userData={adminData?.data?.[4]} />
                ) : null}
                {pploader ? (
                  <ActivityIndicator
                    size={60}
                    style={{ position: 'absolute', top: 20 }}
                  />
                ) : null}
                <View style={styles.headerText}>
                    <Text style={[styles.patientName, { color: scheme === 'light' ? MyTheme.lightColors.text : MyTheme.darkcolors.text }]}>

                  {isLoading || address == null
                    ? console.log('l')
                    : String(connectedUserType) === '1'
                      ? doctorData?.[2] ? ethers.utils.parseBytes32String(doctorData?.[2]) : null
                      : String(connectedUserType) === '2'
                        ? pathologistData?.[2] ? ethers.utils.parseBytes32String(pathologistData?.[2]) : null
                        : String(connectedUserType) === '4'
                          ? pharmacyCompanyData?.[2] ? ethers.utils.parseBytes32String(pharmacyCompanyData?.[2]) : null
                          : String(connectedUserType) === '3'
                            ? medicalResearchLabData?.[2] ? ethers.utils.parseBytes32String(medicalResearchLabData?.[2]) : null
                            : String(connectedUserType) === '5'
                              ? patientData?.[2] ? ethers.utils.parseBytes32String(patientData?.[2]) : null
                              : String(connectedUserType) === '6' ? adminData?.data?.[2] ? ethers.utils.parseBytes32String(adminData?.data?.[2]) : null : null}
               
                    </Text>
                    <Text style={[styles.patientId, { color: scheme === 'light' ? MyTheme.lightColors.text : MyTheme.darkcolors.text }]}>

{isLoading || address == null
  ? console.log('loading')
  : String(connectedUserType) === '1'
    ? doctorData?.[1] ? String(doctorData?.[1]) : null
    : String(connectedUserType) === '2'
      ? pathologistData?.[1] ? String(pathologistData?.[1]) : null
      : String(connectedUserType) === '4'
        ? pharmacyCompanyData?.[1] ? String(pharmacyCompanyData?.[1]) : null
        : String(connectedUserType) === '3'
          ? medicalResearchLabData?.[1] ? String(medicalResearchLabData?.[1]) : null
          : String(connectedUserType) === '5'
            ? patientData?.[1] ? String(patientData?.[1]) : null
            : String(connectedUserType) === '6' ? adminData?.data?.[1] ? String(adminData?.data?.[1]) : null : null}

  </Text>
                </View>
                <IconButton icon="bell" size={30} onPress={() => { }} />
            </View>
            <View style={styles.iconRow}>
                {dashboards[1].components.map((component, index) => (
                    <Button
                        key={index}
                        mode="outlined"
                        style={styles.iconButton}
                        onPress={() => navigation.navigate(component.screen)}
                    >
                        {component.label}
                    </Button>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        backgroundColor:"rgb(108, 99, 255)"
    },
    headerText: {
        flex: 1,
        marginLeft: 10,
    },
    patientName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
    },
    patientId: {
        fontSize: 16,
        color: 'black',
    },
    dashboardSelection: {
        // flexDirection: 'row',
        // justifyContent: 'space-around',
        marginBottom: 20,
    },
    dashboardButton: {
        // flex: 1,
        marginHorizontal: 5,
    },
    iconRow: {
        // flexDirection: 'row',
        // justifyContent: 'space-around',
        marginBottom: 15,
    },
    iconButton: {
        flex: 1,
        marginHorizontal: 5,
    },
});
