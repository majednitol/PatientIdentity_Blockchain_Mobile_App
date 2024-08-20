import { View } from 'react-native';
import React from 'react';
import ConnectWallet from '../../service/wallet connect/ConnectWallet';
const HomeScreen = () => {
 
  return (
    <View
      style={{
        flex: 1,
      }}>
      <ConnectWallet/>
      
    </View>
  );
};

export default HomeScreen;
