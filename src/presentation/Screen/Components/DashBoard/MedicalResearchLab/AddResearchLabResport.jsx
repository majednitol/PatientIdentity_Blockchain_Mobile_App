import React, { useContext, useEffect, useState } from 'react';
import FileUpload from '../../File/FileUpload';


import {View} from 'react-native';

import { HealthContext } from '../../../../../logic/context/health';
import SmartAccount from '../../../../../service/wallet connect/SmartAccount';

const AddResearchLabReport = () => {
  const [saAddress, setSaAddress] = useState('')
  const fetchAddress = async() => {
    const [smartWallet, saAddress] = await SmartAccount.connectedSmartAccount();
    // console.log(saAddress)
    setSaAddress(saAddress);
}
useEffect(() => {
    fetchAddress()
   
}, [saAddress]);
  
  return (
    <View style={{flex: 1}}>
      <FileUpload userAddress={saAddress} />
    </View>
  );
};

export default AddResearchLabReport;
