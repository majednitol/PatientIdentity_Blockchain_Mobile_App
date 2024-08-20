import { ActivityIndicator } from 'react-native';
import React, { useEffect, useContext } from 'react';

import { MD2Colors, Card, Text } from 'react-native-paper';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { HealthContext } from '../../../../../logic/context/health';
import { ethers } from 'ethers';


const PersonalHealthData = ({ personalData }) => {
  if (typeof personalData === 'string') {
    personalData = personalData.split(',').map(item => item.trim());
}
  const {

    getPatientAllData,
    PatientPersonalHealthData,
    isLoading, reducerValue, patientData,smartAccount
  } = useContext(HealthContext);
  console.log(personalData,personalData)
  useEffect(() => {
    // getPatientAllData();
    patientData
  }, [reducerValue])

  return (
    <Animated.View style={{ marginVertical: 50 }} entering={FadeInDown.springify()}
      exiting={FadeInUp.springify()}>
      {isLoading ? (
        <ActivityIndicator animating={true} color='white' />
      ) : (
        <Card >
          <Card.Content>
            <Text style={styles.title}>Personal Health Data</Text>
            <CustomText
              label="Height"
              value={ethers.utils.parseBytes32String(personalData?.[0])}
            />
            <CustomText
              label="Blood Group "
              value={ethers.utils.parseBytes32String(personalData?.[1])}
            />
            <CustomText
              label="Previous Diseases"
              value={ethers.utils.parseBytes32String(personalData?.[2])}
            />
            <CustomText
              label="Medicine/Drugs"
              value={ethers.utils.parseBytes32String(personalData?.[3])}
            />
            <CustomText
              label="Bad Habits"
              value={ethers.utils.parseBytes32String(personalData?.[4])}
            />
            <CustomText
              label="Chronic Diseases"
              value={ethers?.utils?.parseBytes32String(personalData?.[5])}
            />
            <CustomText
              label="Health Allergies"
              value={ethers.utils.parseBytes32String(personalData?.[6])}
            />
            <CustomText
              label="Birth Defects"
                value={ethers
                  .utils.parseBytes32String(personalData?.[7])}
            />
          </Card.Content>
        </Card>
      )}

    </Animated.View>
  );
};

const CustomText = ({ label, value }) => (
  <Text style={styles.text}>
    <Text style={styles.label}>{label}:</Text>{' '}
    <Text style={styles.boldValue}>{value}</Text>
  </Text>
);

const styles = {
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    marginBottom: 10,
  },
  // label: {
  //   fontWeight: "bold",
  // },
  boldValue: {
    fontWeight: 'bold',
  },
};
export default PersonalHealthData;