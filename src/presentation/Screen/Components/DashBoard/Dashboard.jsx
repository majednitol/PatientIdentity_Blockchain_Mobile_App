
import 'react-native-gesture-handler';
import { StatusBar, View, useColorScheme, Button } from 'react-native';


import { SafeAreaView } from 'react-native-safe-area-context';
import { DrawerItemList, createDrawerNavigator } from '@react-navigation/drawer';

import GetPersonalDetails from './Patient/GetPersonalDetails';
import SetPersonalHealthData from './Patient/SetPersonalHealthData';
import Prescription from './Patient/Prescription';
import TransferData from './Patient/TransferData';

import PatientPersonalDoctors from './Patient/PatientPersonalDoctors';
import GetPathologistPersonalData from './Pathologist/GetPathologistPersonalData';
import SentTestReportToDoctor from './Pathologist/SentTestReportToDoctor';
import GetMediResearchLabPersonalData from './MedicalResearchLab/GetMediResearchLabPersonalData';
import AddResearchLabReport from './MedicalResearchLab/AddResearchLabResport';
import ViewPrescriptionOrLabReport from './MedicalResearchLab/ViewPrescriptionOrLabReport';
import GetDoctorPersonalData from './Doctor/GetDoctorPersonalData';
import SentPrescription from './Doctor/SentPrescription';
import DoctorPersonalPatientList from './Doctor/DoctorPersonalPatientList';
import GetPharmacyCompanyPersonalData from './PharmacyCompany/GetPharmacyCompanyPersonalData';
import AddingTopMedichine from './PharmacyCompany/AddingTopMedicine';
import ViewTopMedicine from './PharmacyCompany/ViewTopMedicine';
import Upload_File from './Patient/Upload_File';
import Animated from 'react-native-reanimated';
import ProfilePicture from '../File/ProfilePicture';
import PatientPrescription from './Doctor/PatientPrescription';
import { ActivityIndicator, Icon, Text } from 'react-native-paper';
import Notification from '../Notification';

import { useContext, useEffect, useState } from 'react';
import { HealthContext } from '../../../../logic/context/health';

import OwnQRCode from '../File/OwnQRCode';
import { ScrollView } from 'react-native';
import ImageScanner from '../../../../scanner/image scanner/ImageScanner';
import SharedDataAllUserInfo from './Admin/SharedDataAllUserInfo';
import PathologistFromDoctor from './Pathologist/PathologistFromDoctor';
import PathologistToDoctor from './Pathologist/PathologistToDoctor';
import DoctorFromPathologist from './Doctor/DoctorFromPathologist';
import DoctorToPathologist from './Doctor/DoctorToPathologist';

import { useDispatch, useSelector } from 'react-redux';
import { fetchConnectedUser } from '../../../../logic/redux/connectedUserType/connectedUserSlice';
import { fetchPatientData } from '../../../../logic/redux/patient/PatientSlice';
import SmartAccount from '../../../../service/wallet connect/SmartAccount';
import { setPrivateKey } from '../../../../logic/redux/privateKey/privateKeySlice';
import { fetchDoctorData } from '../../../../logic/redux/doctor/DoctorSlice';
import { fetchMedicalResearchLabData } from '../../../../logic/redux/medical research lab/medicalResearchLabSlice';
import { fetchPharmacyCompanyData } from '../../../../logic/redux/pharmacy company/pharmacyCompanySlice';
import { fetchPathologistData } from '../../../../logic/redux/pathologist/pathologistSlice1';
import { ethers } from 'ethers';
import PersonalInfo from './Admin/PersonalInfo';
import Useranalytics from './Admin/UserAnalytics';
import SubscriptionInfo from './../../payment geteway/SubscriptionInfo';
import ShareData from './Admin/ShareData';
import AdminPrescription from './Admin/Prescription';
import { fetchAdminData } from '../../../../logic/redux/admin/AdminSlice';
import SharedDataAllDoctorsInfo from './Patient/SharedDataAllDoctorInfo';
import PatientAllPrescription from './PharmacyCompany/PatientAllPrescription';
import PatientAllprescription from './MedicalResearchLab/PatientAllprescription';
import GiveConfirmationTx from './Admin/GiveConfirmationTx';



const Drawer = createDrawerNavigator();

export default function Dashboard() {


  const {


    PharmacyCompanyData,
    MedicalResearchLab,
    PathologistData,
    pploader,
    isLoading, connectedAccountBalance, ConnectedAccountUser, web3Auth, setWeb3Auth, smartAccountAddress
  } = useContext(HealthContext);
  console.log("patientData88", patientData)
  const scheme = useColorScheme();
  StatusBar.setBackgroundColor('#8D68F6');

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
      headerbackgroundColor: '#8D68F6',
      headerTintColor: '#fff',
      iconcolor: '#808080',
    },
  };
  const dispatch = useDispatch();

  const { patientData, loading, error } = useSelector((state) => state.patient);
  
  const { pathologistData } = useSelector((state) => state.pathologist);
  const { connectedUserType, } = useSelector((state) => state.connectedUser);
  const [address, setAddress] = useState('')
  const [addressBalance, setAddressBalance] = useState('')
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

  useEffect(() => {

    dispatch(fetchConnectedUser()).then(() => {
      fetchAddress()
      fetchAddressBalance()
    })
  }, []);
  useEffect(() => {

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

  console.log("Truncated Address:", useraddress);
  return (
    <Drawer.Navigator
      drawerContent={props => {
        return (
          <SafeAreaView>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Animated.View
                style={{
                  height: 220,
                  width: '100%',
                  marginTop: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderBottomColor: '#f4f4f4',
                  borderBottomWidth: 1,
                  position: 'relative',
                }}>
                {isLoading || address == null ? (
                  <ActivityIndicator size={50} />
                ) : String(connectedUserType) === '1' ? (
                  <ProfilePicture userData={doctorData?.[8]} />
                ) : String(connectedUserType) === '2' ? (
                  <ProfilePicture userData={pathologistData?.[9]} />
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
                <Text
                  style={{
                    fontSize: 22,
                    marginVertical: 6,
                    fontWeight: 'bold',
                    color:
                      scheme === 'light'
                        ? MyTheme.lightColors.text
                        : MyTheme.darkcolors.text,
                  }}>
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
                <Text style={{ marginBottom: 2 }}>
                  {isLoading || address == null
                    ? console.log('object')
                    : String(connectedUserType) === '1'
                      ? doctorData?.[7] ? ethers.utils.parseBytes32String(doctorData?.[7]) : null
                      : String(connectedUserType) === '2'
                        ? pathologistData?.[8] ? ethers.utils.parseBytes32String(pathologistData?.[8]) : null
                        : String(connectedUserType) === '4'
                          ? pharmacyCompanyData?.[7] ? ethers.utils.parseBytes32String(pharmacyCompanyData?.[7]) : null
                          : String(connectedUserType) === '3'
                            ? medicalResearchLabData?.[8] ? ethers.utils.parseBytes32String(medicalResearchLabData?.[8]) : null
                            : String(connectedUserType) === '5'
                              ? patientData?.[7] ? ethers.utils.parseBytes32String(patientData?.[7]) : null : String(connectedUserType) === '6'
                                ? adminData?.data?.[7] ? ethers.utils.parseBytes32String(adminData?.data?.[7]) : null : null}
                </Text>
                <View
                  style={{
                    fontSize: 16,
                    color:
                      scheme === 'light'
                        ? MyTheme.lightColors.text
                        : MyTheme.darkcolors.text,
                    marginBottom: 50,
                  }}>
                  <Text style={{ textAlign: 'center', color: "red", fontWeight: 'bold' }}>
                    {addressBalance.slice(0, 11)} tBNB
                  </Text>
                  <Text style={{ textAlign: 'center', fontWeight: 'bold' }} selectable={true}>
                    {useraddress}
                  </Text>
                </View>

              </Animated.View>

              <DrawerItemList {...props} />
              <View style={{ marginBottom: 90, width: 250, marginLeft: 30, marginTop: 10 }}>
                <Button title="Logout" color="red" onPress={() => { logout() }} />
              </View></ScrollView>
          </SafeAreaView>

        );
      }}
      screenOptions={{
        drawerStyle: {
          backgroundColor:
            scheme === 'light'
              ? MyTheme.lightColors.backgroundColor
              : 'rgb(19, 18, 44)',
          width: 310,
        },
        headerStyle: {
          backgroundColor: scheme === 'light'
            ? '#8D68F6'
            : '#8D68F6',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        drawerLabelStyle: {
          color:
            scheme === 'light'
              ? MyTheme.lightColors.text
              : MyTheme.darkcolors.text,
        },
      }}>
      <Drawer.Screen
        name="Notification"
        options={{
          drawerLabel: 'Notification',
          title: 'Notification',
          drawerIcon: () => (
            <Icon
              source="bell-badge"
              color={scheme === 'light'
                ? MyTheme.lightColors.text
                : MyTheme.darkcolors.text}
              size={20}
            />
          ),
        }}
        component={Notification}
      />


      {/* patient */}
      {connectedUserType == '5' && ( //5
        <>
          <Drawer.Screen
            name="Home"
            options={{
              drawerLabel: 'Patient Basic Information',
              title: 'Patient Basic Information',
              drawerIcon: () => (
                <Icon
                  source="information"
                  color={scheme === 'light'
                    ? MyTheme.lightColors.text
                    : MyTheme.darkcolors.text}
                  size={20}
                />
              ),
            }}
            component={GetPersonalDetails}
          />

          <Drawer.Screen
            name="Update Personal Health data"
            options={{
              drawerLabel: 'Update Personal Health data',
              title: 'Update Personal Health data',
              drawerIcon: () => (
                <Icon
                  source="update"
                  color={scheme === 'light'
                    ? MyTheme.lightColors.text
                    : MyTheme.darkcolors.text}
                  size={20}
                />
              ),
            }}
            component={SetPersonalHealthData}
          />
          <Drawer.Screen
            name="Prescription"
            options={{
              drawerLabel: 'Prescription',
              title: 'Prescription',
              drawerIcon: () => (
                <Icon
                  source="prescription"
                  color={scheme === 'light'
                    ? MyTheme.lightColors.text
                    : MyTheme.darkcolors.text}
                  size={20}
                />
              ),
            }}
            component={Prescription}
          />
          <Drawer.Screen
            name="Upload File"
            options={{
              drawerLabel: 'Upload File',
              title: 'Upload File',
              drawerIcon: () => (
                <Icon
                  source="upload"
                  color={scheme === 'light'
                    ? MyTheme.lightColors.text
                    : MyTheme.darkcolors.text}
                  size={20}
                />
              ),
            }}
            component={Upload_File}
          />
          <Drawer.Screen
            name="Share data"
            options={{
              drawerLabel: 'Share data',
              title: 'Share data',
              drawerIcon: () => (
                <Icon
                  source="share-all"
                  color={scheme === 'light'
                    ? MyTheme.lightColors.text
                    : MyTheme.darkcolors.text}
                  size={20}
                />
              ),
            }}
            component={TransferData}
          />

          <Drawer.Screen
            name="Personal Doctor"
            options={{
              drawerLabel: 'Personal Doctor',
              title: 'Personal Doctor',
              drawerIcon: () => (
                <Icon
                  source="doctor"
                  color={scheme === 'light'
                    ? MyTheme.lightColors.text
                    : MyTheme.darkcolors.text}
                  size={20}
                />
              ),
            }}
            component={PatientPersonalDoctors}
          />
          <Drawer.Screen
            name="Shared Data To Users List"
            options={{
              drawerLabel: 'Shared Data To Doctors List ',
              title: 'Shared Data To Doctors List ',
              drawerIcon: () => (
                <Icon
                  source="account-group"
                  color={scheme === 'light'
                    ? MyTheme.lightColors.text
                    : MyTheme.darkcolors.text}
                  size={20}
                />
              ),
            }}
            component={SharedDataAllDoctorsInfo}
          />
          

          {/* <Drawer.Screen
            name="patient"
            options={{
              drawerLabel: 'patient',
              title: 'patient',
              drawerIcon: () => (
                <Icon
              source="doctor"
              color={scheme === 'light'
              ? MyTheme.lightColors.text
              : MyTheme.darkcolors.text}
              size={20}
            />
              ),
            }}
            component={PatientView}
          /> */}
        </>
      )}
      {connectedUserType == '6' && (
        <>
          <Drawer.Screen
            name="Personal Info"
            options={{
              drawerLabel: 'Personal Info',
              title: 'Personal Info',
              drawerIcon: () => (
                <Icon
                  source="information"
                  color={scheme === 'light'
                    ? MyTheme.lightColors.text
                    : MyTheme.darkcolors.text}
                  size={20}
                />
              ),
            }}
            component={PersonalInfo}
          />
          <Drawer.Screen
            name="User Analytics"
            options={{
              drawerLabel: 'User Analytics',
              title: 'User Analytics',
              drawerIcon: () => (
                <Icon
                  source="prescription"
                  color={scheme === 'light'
                    ? MyTheme.lightColors.text
                    : MyTheme.darkcolors.text}
                  size={20}
                />
              ),
            }}
            component={Useranalytics}
          />
          <Drawer.Screen
            name="Shared Data To Users List"
            options={{
              drawerLabel: 'Shared Data To Users List ',
              title: 'Shared Data To Users List ',
              drawerIcon: () => (
                <Icon
                  source="account-group"
                  color={scheme === 'light'
                    ? MyTheme.lightColors.text
                    : MyTheme.darkcolors.text}
                  size={20}
                />
              ),
            }}
            component={SharedDataAllUserInfo}
          />
                   <Drawer.Screen
            name="Give Confirmation"
            options={{
              drawerLabel: 'Give Confirmation ',
              title: 'Give Confirmation ',
              drawerIcon: () => (
                <Icon
                  source="account-group"
                  color={scheme === 'light'
                    ? MyTheme.lightColors.text
                    : MyTheme.darkcolors.text}
                  size={20}
                />
              ),
            }}
            component={GiveConfirmationTx}
          />
          <Drawer.Screen
            name="Prescription"
            options={{
              drawerLabel: 'Prescription',
              title: 'Prescription',
              drawerIcon: () => (
                <Icon
                  source="prescription"
                  color={scheme === 'light'
                    ? MyTheme.lightColors.text
                    : MyTheme.darkcolors.text}
                  size={20}
                />
              ),
            }}
            component={AdminPrescription}
          />
          <Drawer.Screen
            name="Share data"
            options={{
              drawerLabel: 'Share data',
              title: 'Share data',
              drawerIcon: () => (
                <Icon
                  source="share-all"
                  color={scheme === 'light'
                    ? MyTheme.lightColors.text
                    : MyTheme.darkcolors.text}
                  size={20}
                />
              ),
            }}
            component={ShareData}
          />
        </>
      )}
      {/* Doctor */}

      {connectedUserType == '1' && (
        <>
          <Drawer.Screen
            name="Personal Info"
            options={{
              drawerLabel: 'Personal Info',
              title: 'Personal Info',
              drawerIcon: () => (
                <Icon
                  source="information"
                  color={scheme === 'light'
                    ? MyTheme.lightColors.text
                    : MyTheme.darkcolors.text}
                  size={20}
                />
              ),
            }}
            component={GetDoctorPersonalData}
          />
          <Drawer.Screen
            name="Sent Prescription"
            options={{
              drawerLabel: 'Sent Prescription',
              title: 'Sent Prescription',
              drawerIcon: () => (
                <Icon
                  source="prescription"
                  color={scheme === 'light'
                    ? MyTheme.lightColors.text
                    : MyTheme.darkcolors.text}
                  size={20}
                />
              ),
            }}
            component={SentPrescription}
          />

          <Drawer.Screen
            name="Personal Patient"
            options={{
              drawerLabel: 'Personal Patient',
              title: 'Personal Patient',
              drawerIcon: () => (
                <Icon
                  source="account-injury"
                  color={scheme === 'light'
                    ? MyTheme.lightColors.text
                    : MyTheme.darkcolors.text}
                  size={20}
                />
              ),
            }}
            component={DoctorPersonalPatientList}
          />
          <Drawer.Screen
            name="Patient Prescription"
            options={{
              drawerLabel: 'Patient Prescription',
              title: 'Patient Prescription',
              drawerIcon: () => (
                <Icon
                  source="prescription"
                  color={scheme === 'light'
                    ? MyTheme.lightColors.text
                    : MyTheme.darkcolors.text}
                  size={20}
                />

              ),
            }}
            component={PatientPrescription}
          />

          <Drawer.Screen
            name="DoctorFromPathologist"
            options={{
              drawerLabel: 'DoctorDataFromPathologist',
              title: 'DoctorFromPathologist',
              drawerIcon: () => (
                <Icon
                  source="prescription"
                  color={scheme === 'light'
                    ? MyTheme.lightColors.text
                    : MyTheme.darkcolors.text}
                  size={20}
                />
              ),
            }}
            component={DoctorFromPathologist}
          />
          <Drawer.Screen
            name="DoctorToPathologist"
            options={{
              drawerLabel: 'DoctorDataToPathologist',
              title: 'DoctorToPathologist',
              drawerIcon: () => (
                <Icon
                  source="prescription"
                  color={scheme === 'light'
                    ? MyTheme.lightColors.text
                    : MyTheme.darkcolors.text}
                  size={20}
                />
              ),
            }}
            component={DoctorToPathologist}
          />
        </>
      )}
      {/* Pathlogist  */}
      {connectedUserType == '2' && (
        <>
          <Drawer.Screen
            name="Personal Info"
            options={{
              drawerLabel: 'Personal Info',
              title: 'Personal Info',
              drawerIcon: () => (
                <Icon
                  source="information"
                  color={scheme === 'light'
                    ? MyTheme.lightColors.text
                    : MyTheme.darkcolors.text}
                  size={20}
                />
              ),
            }}
            component={GetPathologistPersonalData}
          />
          <Drawer.Screen
            name="Share Report To Doctor"
            options={{
              drawerLabel: 'Share Report To Doctor',
              title: 'Share Report To Doctor',
              drawerIcon: () => (
                <Icon
                  source="prescription"
                  color={scheme === 'light'
                    ? MyTheme.lightColors.text
                    : MyTheme.darkcolors.text}
                  size={20}
                />
              ),
            }}
            component={SentTestReportToDoctor}
          />


          <Drawer.Screen
            name="PathologistFromDoctor"
            options={{
              drawerLabel: 'PathologistDataFromDoctor',
              title: 'PathologistFromDoctor',
              drawerIcon: () => (
                <Icon
                  source="doctor"
                  color={scheme === 'light'
                    ? MyTheme.lightColors.text
                    : MyTheme.darkcolors.text}
                  size={20}
                />

              ),
            }}
            component={PathologistFromDoctor}
          />
          <Drawer.Screen
            name="PathologistToDoctor"
            options={{
              drawerLabel: 'PathologistDataToDoctor',
              title: 'PathologistToDoctor',
              drawerIcon: () => (
                <Icon
                  source="doctor"
                  color={scheme === 'light'
                    ? MyTheme.lightColors.text
                    : MyTheme.darkcolors.text}
                  size={20}
                />

              ),
            }}
            component={PathologistToDoctor}
          />
        </>
      )}
      {/* Pharacy */}
      {connectedUserType == '4' && (
        <>
          <Drawer.Screen
            name="Home"
            options={{
              drawerLabel: 'Personal Information',
              title: 'Personal Information',
              drawerIcon: () => (
                <Icon
                  source="information"
                  color={scheme === 'light'
                    ? MyTheme.lightColors.text
                    : MyTheme.darkcolors.text}
                  size={20}
                />
              ),
            }}
            component={GetPharmacyCompanyPersonalData}
          />
          <Drawer.Screen
            name="Add Top Medicine"
            options={{
              drawerLabel: 'Add Top Medicine',
              title: 'Add Top Medicine',
              drawerIcon: () => (
                <Icon
                  source="medical-bag"
                  color={scheme === 'light'
                    ? MyTheme.lightColors.text
                    : MyTheme.darkcolors.text}
                  size={20}
                />
              ),
            }}
            component={AddingTopMedichine}
          />
          <Drawer.Screen
            name="View Medicine"
            options={{
              drawerLabel: 'View Medicine',
              title: 'Medicine',
              drawerIcon: () => (
                <Icon
                  source="medical-bag"
                  color={scheme === 'light'
                    ? MyTheme.lightColors.text
                    : MyTheme.darkcolors.text}
                  size={20}
                />
              ),
            }}
            component={ViewTopMedicine}
          />
          <Drawer.Screen
            name="Patient Prescription"
            options={{
              drawerLabel: 'Patient Prescription',
              title: 'Patient Prescription',
              drawerIcon: () => (
                <Icon
                  source="prescription"
                  color={scheme === 'light'
                    ? MyTheme.lightColors.text
                    : MyTheme.darkcolors.text}
                  size={20}
                />
              ),
            }}
            component={PatientAllPrescription}
          />
        </>
      )}
      {/* Medical  */}
      {connectedUserType == '3' && (
        <>
          <Drawer.Screen
            name="Home"
            options={{
              drawerLabel: 'Personal Info',
              title: 'Person Info',
              drawerIcon: () => (
                <Icon
                  source="information"
                  color={scheme === 'light'
                    ? MyTheme.lightColors.text
                    : MyTheme.darkcolors.text}
                  size={20}
                />
              ),
            }}
            component={GetMediResearchLabPersonalData}
          />
          <Drawer.Screen
            name="Add Report"
            options={{
              drawerLabel: 'Add Report',
              title: 'Add Report',
              drawerIcon: () => (
                <Icon
                  source="presentation"
                  color={scheme === 'light'
                    ? MyTheme.lightColors.text
                    : MyTheme.darkcolors.text}
                  size={20}
                />
              ),
            }}
            component={AddResearchLabReport}
          />
          <Drawer.Screen
            name="Patient Prescription"
            options={{
              drawerLabel: 'Patient Prescription',
              title: 'Patient Prescription',
              drawerIcon: () => (
                <Icon
                  source="prescription"
                  color={scheme === 'light'
                    ? MyTheme.lightColors.text
                    : MyTheme.darkcolors.text}
                  size={20}
                />
              ),
            }}
            component={PatientAllprescription}
          />
          <Drawer.Screen
            name="Prescription or Report"
            options={{
              drawerLabel: 'Prescription or Report',
              title: 'Prescription or Report',
              drawerIcon: () => (
                <Icon
                  source="prescription"
                  color={scheme === 'light'
                    ? MyTheme.lightColors.text
                    : MyTheme.darkcolors.text}
                  size={20}
                />
              ),
            }}
            component={ViewPrescriptionOrLabReport}
          />
        </>
      )}
      {/* <Drawer.Screen
        name="Search User"
        options={{
          drawerLabel: 'Search User',
          title: 'Search User',
          drawerIcon: () => (
            <Icon
              source="qrcode"
              color={scheme === 'light'
              ? MyTheme.lightColors.text
              : MyTheme.darkcolors.text}
              size={20}
            />
          ),
        }}
        component={SearchUser}
      /> */}
      <Drawer.Screen
        name="Own QR Code"
        options={{
          drawerLabel: 'Own QR Code',
          title: 'Own QR Code',
          drawerIcon: () => (
            <Icon
              source="qrcode"
              color={scheme === 'light'
                ? MyTheme.lightColors.text
                : MyTheme.darkcolors.text}
              size={20}
            />
          ),
        }}
        component={OwnQRCode}
      />
      <Drawer.Screen
        name="Image Scanner"
        options={{
          drawerLabel: 'Image Scanner',
          title: 'Image Scanner',
          drawerIcon: () => (
            <Icon
              source="qrcode-scan"
              color={scheme === 'light'
                ? MyTheme.lightColors.text
                : MyTheme.darkcolors.text}
              size={20}
            />
          ),
        }}
        component={ImageScanner}
      />



      <Drawer.Screen
        name="Subscription Status"
        options={{
          drawerLabel: 'Subscription Status',
          title: 'Subscription Status',
          drawerIcon: () => (
            <Icon
              source="qrcode-scan"
              color={scheme === 'light'
                ? MyTheme.lightColors.text
                : MyTheme.darkcolors.text}
              size={20}
            />
          ),
        }}
        component={SubscriptionInfo}
      />
    </Drawer.Navigator>
  );
}