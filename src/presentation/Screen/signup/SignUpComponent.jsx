import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
 // Import IconButton from react-native-paper
import PrimaryScreen from './PrimaryScreen';
import SetPatientPersonalDetails from '../Components/DashBoard/Patient/SetPersonalDetails';
import SetDoctorPersonalData from '../Components/DashBoard/Doctor/SetDoctorPersonalData';
import SetPathologistPersonalData from '../Components/DashBoard/Pathologist/SetPathologistPersonalData';
import SetMediResearchLabPersonalData from '../Components/DashBoard/MedicalResearchLab/SetMediResearchLabPersonalData';
import SetPharmacyCompanyPersonalData from '../Components/DashBoard/PharmacyCompany/SetPharmacyCompanyPersonalData';
import { Button, IconButton, MD3Colors } from 'react-native-paper';
import { HealthContext } from '../../../logic/context/health';
import SetAdmin from '../Components/DashBoard/Admin/SetAdmin';


const Stack = createStackNavigator();

const SignUpComponent = () => {
  const {
    setKey,setPrivateKey
  } = useContext(HealthContext);
  const logout = async () => {
    setPrivateKey('')
    setKey('');
    console.log('Logged out');

  };
  return (
    <Stack.Navigator
      screenOptions={() => ({
        headerStyle: {
          backgroundColor: 'rgb(108, 99, 255)'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold'
        },
        headerRight: () => (
          <IconButton
            icon="logout" 
            iconColor={MD3Colors.error50}
            onPress={() => {
              logout()
              
            }}
          />
        )
      })}
    >
      <Stack.Screen name="SignUp Screen" component={PrimaryScreen} />
      <Stack.Screen
        name="Patient SignUp Screen"
        component={SetPatientPersonalDetails}
      />
      <Stack.Screen
        name="Doctor SignUp Screen"
        component={SetDoctorPersonalData}
      />
      <Stack.Screen
        name="Pathologist SignUp Screen"
        component={SetPathologistPersonalData}
      />
      <Stack.Screen
        name="Medical Research Lab SignUp Screen"
        component={SetMediResearchLabPersonalData}
      />
      <Stack.Screen
        name="Pharmacy company SignUp Screen"
        component={SetPharmacyCompanyPersonalData}
      />
      <Stack.Screen
        name="Admin SignUp Screen"
        component={SetAdmin}
      />
    </Stack.Navigator>
  );
};

export default SignUpComponent;
