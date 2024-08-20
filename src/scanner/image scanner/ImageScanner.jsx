import {View, Text, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import React, { useRef } from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

export default function ImageScanner() {
  const scannerRef = useRef(null);

  const onSuccess = async e => {
    try {
      console.log(e);
      await Linking.openURL(e.data);
      
      // After a successful scan, restart scanning
      scannerRef.current.reactivate();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <QRCodeScanner
      ref={scannerRef}
      onRead={e => onSuccess(e)}
      reactivate={true}
      reactivateTimeout={2000} 
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
