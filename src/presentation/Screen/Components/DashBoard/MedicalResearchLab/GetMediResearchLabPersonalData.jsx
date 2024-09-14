import { View } from 'react-native';
import React, { useContext, useEffect } from 'react';
// import { useAddress, useContract, useContractRead } from '@thirdweb-dev/react-native';
// import { contractAddress } from '../../../../constant';
import { ActivityIndicator, Card, MD2Colors, Text, useTheme } from 'react-native-paper';
import { HealthContext } from '../../../../../logic/context/health';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMedicalResearchLabData } from '../../../../../logic/redux/medical research lab/medicalResearchLabSlice';
import { ethers } from 'ethers';


const GetMediResearchLabPersonalData = () => {

  const theme = useTheme();
  const dispatch = useDispatch();
  const { medicalResearchLabData, loading, error } = useSelector((state) => state.medicalResearchLab);
  useEffect(() => {

    dispatch(fetchMedicalResearchLabData())
    console.log("medicalResearchLabData", medicalResearchLabData)
  }, []);

  if (error) {
    console.log('object loading')
  }

  return (


    <View style={{ marginHorizontal: 12, marginVertical: 50 }}>
      {loading ? (
        <ActivityIndicator animating={true} color={theme.colors.primary} />
      ) : (

        <Card>
          <Card.Content>
            <Text style={styles.title}>Medical Reserch Lab Information</Text>
            <CustomText label="Account " value={medicalResearchLabData?.[0]} />
            {/* <CustomText label="EmailAddress" value={emailAddress} /> */}
            <CustomText label="Lab Name " value={ethers.utils.parseBytes32String(medicalResearchLabData?.[2])} />
            <CustomText label="LicenseID" value={String(medicalResearchLabData?.[3])} />
            <CustomText label="LabID" value={String(medicalResearchLabData?.[1])} />
            <CustomText label="Research Area" value={ethers.utils.parseBytes32String(medicalResearchLabData?.[4])} />
            <CustomText
              label="Lab Rating"
              value={String(medicalResearchLabData?.[5])}
            />

          </Card.Content>
        </Card>
      )}
    </View>
  );
};

export default GetMediResearchLabPersonalData;


const CustomText = ({ label, value }) => (
  <Text style={styles.text}>
    <Text style={styles.label}>{label}:</Text>{' '}
    <Text style={styles.boldValue} selectable={true}>{value}</Text>
  </Text>
);

const styles = {
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    marginBottom: 5,
  },
  // label: {
  //   fontWeight: "bold",
  // },
  boldValue: {
    fontWeight: 'bold',
  },
};
