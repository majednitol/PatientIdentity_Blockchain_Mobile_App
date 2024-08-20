// import React, { useContext, useEffect, useState } from 'react';
// import { Alert, Linking, StyleSheet, Text, View } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera';
// import { useNavigation } from '@react-navigation/native';
// import { HealthContext } from '../logic/context/health';

// export function ScannerScreen() {
//   const navigation = useNavigation();
//   const { setScanAddress } = useContext(HealthContext);
//   const [enableOnCodeScanned, setEnableOnCodeScanned] = useState(true);
//   const { requestPermission: requestCameraPermission } = useCameraPermission();
//   const device = useCameraDevice('back');

//   useEffect(() => {
//     handleCameraPermission();
//   }, []);

//   const codeScanner = useCodeScanner({
//     codeTypes: ['qr', 'ean-13'],
//     onCodeScanned: codes => {
//       if (enableOnCodeScanned) {
//         let value = codes[0]?.value;
//         console.log(value);
//         setScanAddress(value);
//         setTimeout(() => {
//           if (navigation.canGoBack()) {
//             navigation.pop(); // Navigating back to the previous screen if possible
//           }
//         }, 100);
//         setEnableOnCodeScanned(false);
//       }
//     },
//   });

//   const handleCameraPermission = async () => {
//     const granted = await requestCameraPermission();
//     if (!granted) {
//       Alert.alert(
//         'Camera permission is required to use the camera. Please grant permission in your device settings.',
//         '',
//         [
//           {
//             text: 'OK',
//             onPress: () => Linking.openSettings(), // Open settings if permission is not granted
//           },
//         ],
//         { cancelable: false }
//       );
//     }
//   };

//   if (device == null) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <Text style={{ margin: 10 }}>Camera Not Found</Text>
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <Camera
//         codeScanner={codeScanner}
//         style={StyleSheet.absoluteFill}
//         device={device}
//         isActive={true}
//         onTouchEnd={() => setEnableOnCodeScanned(true)} // Enable scanning again when touching the screen
//       />
//     </SafeAreaView>
//   );
// }



import React, { useContext } from 'react';
import { Alert, Linking, StyleSheet } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { useNavigation } from '@react-navigation/native';
import { HealthContext } from '../../logic/context/health';
import { useDispatch } from 'react-redux';
import { setScanAddress } from '../../logic/redux/scanner/scanAddressSlice';

export function ScannerScreen() {
  const navigation = useNavigation();
  // const { setScanAddress } = useContext(HealthContext);
  const dispatch = useDispatch();
  const onSuccess = async e => {
    try {
      // alert('done');
      console.log(e);
      // await Linking.openURL(e.data);
//       setScanAddress(e.data);
      // setScanAddress
      dispatch(setScanAddress(e.data))
      setTimeout(() => {
        if (navigation.canGoBack()) {
          navigation.pop(); // Navigating back to the previous screen if possible
        }
      }, 100);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <QRCodeScanner
      onRead={e => onSuccess(e)}
      showMarker={true}
      cameraStyle={styles.cameraContainer}
      containerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraContainer: {
    width: '100%',
    height: '100%',
  },
});


export default ScannerScreen;
