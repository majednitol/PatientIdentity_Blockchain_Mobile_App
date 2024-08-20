import {View, Image} from 'react-native';
import React from 'react';

const NotConnected = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
      }}>
      <Image
        source={require('../../../assets/nwa2-removebg.png')}
        style={{
          height: 520,
          width: 400,
          resizeMode: 'cover',
        }}
      />
      
    </View>
  );
};

export default NotConnected;
