import React, { useState, useEffect, useContext } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { HealthContext } from '../../../../logic/context/health';
import { useColorScheme } from 'react-native';
import SmartAccount from '../../../../service/wallet connect/SmartAccount';

const OwnQRCode = () => {
    const [qrValue, setQRValue] = useState('');
    const [saAddress, setSaAddress] = useState('')

    const theme = useColorScheme()
    const fetchAddress = async() => {
        const [smartWallet, saAddress] = await SmartAccount.connectedSmartAccount();
        // console.log(saAddress)
        setSaAddress(saAddress);
    }
    useEffect(() => {
        fetchAddress().then(() => {
            generateQRCodeValue(); 
        })
       
    }, [saAddress]);

    const generateQRCodeValue = () => {
        // Example object
        if (saAddress !== null) {
            setQRValue(saAddress)
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.container2}>
            {qrValue ? (
                <QRCode value={qrValue} size={230} color='red' />
            ) : (
                <View>
                    <Text>Loading QR Code...</Text>
                </View>
            )}
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
       
    },

    container2: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius:10
    },
});
export default OwnQRCode

