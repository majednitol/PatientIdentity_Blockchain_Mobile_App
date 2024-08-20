

import {
  useContract,
  useContractRead,
} from '@thirdweb-dev/react-native';
import React from 'react';
import {ActivityIndicator} from 'react-native-paper';
import Animated from 'react-native-reanimated';
import {contractAddress} from '../../../../constant';
import DisplayFile from '../../File/DisplayFile';



const PatientToPharmacyCompanySharedData = ({PharmaData}) => {
  


  
  
  const patientAddress = PharmaData[7];
  console.log(PharmaData)
  // const {data: patientData, isLoading} = useContractRead(
  //   contract,
  //   'getPatient',
  //   [patientAddress[0]],
  // );
  return (
    <Animated.View>
      {isLoading ? (
        <ActivityIndicator
          size={45}
          animating={true}
          color="rgb(108, 99, 255)"
          style={{
            marginTop:100,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      ) : patientData ? (
        <DisplayFile userData={patientData} />
      ) : null}
    </Animated.View>
  );
};


export default PatientToPharmacyCompanySharedData;