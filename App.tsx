
// import { View, useColorScheme } from 'react-native';
// import { useTheme } from 'react-native-paper';

// import {
//   NavigationContainer,
//   DefaultTheme,
//   DarkTheme,
// } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';

// import SplashScreen from './src/presentation/Screen/Splash Screen/SplashScreen';
// import HomeScreen from './src/presentation/Screen/HomeScreen';
// import NotConnected from './src/presentation/Screen/NotConnected';
// import PrimaryScreen from './src/presentation/Screen/signup/PrimaryScreen';
// import React, { useState } from 'react';
// import HealthProvider from './src/logic/context/health';


// import ScannerScreen from './src/scanner/qrcode scanner/ScannerScreen';
// import ImageScanner from './src/scanner/image scanner/ImageScanner';
// import Dashboard from './src/presentation/Screen/Components/DashBoard/Dashboard';
// import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
// import DisplayFile from './src/presentation/Screen/Components/File/DisplayFile';
// import SentPrescription from './src/presentation/Screen/Components/DashBoard/Doctor/SentPrescription';
// import TransferData from './src/presentation/Screen/Components/DashBoard/Patient/TransferData';
// import SentTestReportToDoctor from './src/presentation/Screen/Components/DashBoard/Pathologist/SentTestReportToDoctor';
// import store from './src/logic/redux/store';
// import { Provider } from 'react-redux';
// import { StripeProvider } from '@stripe/stripe-react-native';
// import PaymentScreen from './src/presentation/Screen/payment geteway/PaymentScreen';
// const Stack = createStackNavigator();

// export default function App() {
//   const scheme = useColorScheme();
//   const theme = useTheme();

//   return (
//     <GestureHandlerRootView
//       style={{ flex: 1, backgroundColor: theme.colors.background }}>

//       <BottomSheetModalProvider>
//         <Provider store={store}>
//           <StripeProvider
//             publishableKey="pk_test_51PsUlqAiNNIfYSMS6ZmmuLEfbgqWFRtfGroVMrqkMs1jYt3e1LLNy5fkSYUnQ8JcdKTFVuMIWg0FfeLQCLSOHzhl00F0Vxv3Hn"
//             merchantIdentifier="merchant.com.yourapp">

//             <HealthProvider>
//               <NavigationContainer
//                 theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
//                 <Stack.Navigator initialRouteName="Splash">
//                   <Stack.Screen
//                     name="Splash"
//                     component={SplashScreen}
//                     options={{ headerShown: false }}
//                   />

//                   <Stack.Screen
//                     name="HomeScreen"
//                     component={HomeScreen}
//                     options={{ headerShown: false }}
//                   />
//                   <Stack.Screen
//                     name="NotConnected"
//                     component={NotConnected}
//                     options={{ headerShown: false }}
//                   />
//                   <Stack.Screen
//                     name="SignUp"
//                     component={PrimaryScreen}
//                     options={{ headerShown: false }}
//                   />
//                   <Stack.Screen
//                     name="AddressScanner"
//                     component={ScannerScreen}
//                     options={{ headerShown: true }}
//                   />
//                   <Stack.Screen
//                     name="ImageScanner"
//                     component={ImageScanner}
//                     options={{ headerShown: true }}
//                   />
//                   <Stack.Screen
//                     name="Dashboard"
//                     component={Dashboard}
//                     options={{ headerShown: false }}
//                   />
//                   <Stack.Screen
//                     name="DisplayFile"
//                     component={DisplayFile}
//                     options={{ headerShown: true }}
//                   />
//                   <Stack.Screen
//                     name="Sent Prescription"
//                     component={SentPrescription}
//                     options={{ headerShown: true }}
//                   />
//                   <Stack.Screen
//                     name="Share Prescription"
//                     component={TransferData}
//                     options={{ headerShown: true }}
//                   />
//                   <Stack.Screen
//                     name="Sent Test Report"
//                     component={SentTestReportToDoctor}
//                     options={{ headerShown: true }}
//                   />
//                   <Stack.Screen
//                     name="Payment"
//                     component={PaymentScreen}
//                     options={{ headerShown: true }}
//                   />
//                 </Stack.Navigator>
//               </NavigationContainer>
//             </HealthProvider>
//           </StripeProvider>
//         </Provider>

//       </BottomSheetModalProvider>

//     </GestureHandlerRootView>
//   );
// }
import { View, useColorScheme } from 'react-native';
import { useTheme } from 'react-native-paper';

import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import SplashScreen from './src/presentation/Screen/Splash Screen/SplashScreen';
import HomeScreen from './src/presentation/Screen/HomeScreen';
import NotConnected from './src/presentation/Screen/NotConnected';
import PrimaryScreen from './src/presentation/Screen/signup/PrimaryScreen';
import React, { useState } from 'react';
import HealthProvider from './src/logic/context/health';


import ScannerScreen from './src/scanner/qrcode scanner/ScannerScreen';
import ImageScanner from './src/scanner/image scanner/ImageScanner';
import Dashboard from './src/presentation/Screen/Components/DashBoard/Dashboard';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import DisplayFile from './src/presentation/Screen/Components/File/DisplayFile';
import SentPrescription from './src/presentation/Screen/Components/DashBoard/Doctor/SentPrescription';
import TransferData from './src/presentation/Screen/Components/DashBoard/Patient/TransferData';
import SentTestReportToDoctor from './src/presentation/Screen/Components/DashBoard/Pathologist/SentTestReportToDoctor';
import store from './src/logic/redux/store';
import { Provider } from 'react-redux';
import { StripeProvider } from '@stripe/stripe-react-native';
import PaymentScreen from './src/presentation/Screen/payment geteway/PaymentScreen';
import { screensConfig } from './screens';


const Stack = createStackNavigator();

export default function App() {
  const scheme = useColorScheme();
  const theme = useTheme();

  return (
    <GestureHandlerRootView
      style={{ flex: 1, backgroundColor: theme.colors.background }}>

      <BottomSheetModalProvider>
        <Provider store={store}>
          <StripeProvider
            publishableKey="pk_test_51PsUlqAiNNIfYSMS6ZmmuLEfbgqWFRtfGroVMrqkMs1jYt3e1LLNy5fkSYUnQ8JcdKTFVuMIWg0FfeLQCLSOHzhl00F0Vxv3Hn"
            merchantIdentifier="merchant.com.yourapp">

            <HealthProvider>
              <NavigationContainer
                theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
 <Stack.Navigator
                  initialRouteName="Splash"
                  screenOptions={{
                    headerStyle: { backgroundColor: '#8D68F6' },
                    headerTintColor: 'white',
                    headerTitleStyle: { fontWeight: 'bold',color:"white" },
                  }}
                >
                  <Stack.Screen
                    name="Splash"
                    component={SplashScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="NotConnected"
                    component={NotConnected}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="SignUp"
                    component={PrimaryScreen}
                    options={{ headerShown: false }}
                  />
                  <Stack.Screen
                    name="Dashboard"
                    component={Dashboard}
                    options={{ headerShown: false }}
                  />

                  {Object.entries(screensConfig).map(([screenName, component]) => (
                    <Stack.Screen key={screenName} name={screenName} component={component} options={{ headerShown: true }} />
                  ))}

                </Stack.Navigator>
              </NavigationContainer>
            </HealthProvider>
          </StripeProvider>
        </Provider>

      </BottomSheetModalProvider>

    </GestureHandlerRootView>
  );
}