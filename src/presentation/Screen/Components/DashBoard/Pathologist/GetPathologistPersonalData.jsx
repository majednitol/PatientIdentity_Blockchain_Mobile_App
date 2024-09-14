import { View } from 'react-native';
import React, { useEffect } from 'react';
import { ActivityIndicator, Card, MD2Colors, Text, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPathologistData } from '../../../../../logic/redux/pathologist/pathologistSlice1';
import SmartAccount from '../../../../../service/wallet connect/SmartAccount';
import { ethers } from 'ethers'


const GetPathologistPersonalData = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { pathologistData, loading, error } = useSelector((state) => state.pathologist);
  const fetchAddress = async () => {
    const [smartWallet, saAddress] = await SmartAccount.connectedSmartAccount();
    dispatch(fetchPathologistData(saAddress));
  }
  useEffect(() => {

    console.log("pathoData", pathologistData)
  }, [dispatch]);

  return (
    <View style={{ marginHorizontal: 12, marginVertical: 50 }}>
      {loading ? (

        <ActivityIndicator animating={true} color={theme.colors.primary} />
      ) : (
        <Card>
          <Card.Content>
            <Text style={styles.title}>Pathologist Personal Information</Text>
            <CustomText label="Account " value={pathologistData?.[0]} />
            <CustomText label="EmailAddress" value={ethers.utils.parseBytes32String(pathologistData?.[12])} />
            <CustomText label="PathologistID" value={String(pathologistData?.[1])} />
            <CustomText label="Pathologist Name" value={ethers.utils.parseBytes32String(pathologistData?.[2])} />
            <CustomText label="Pathologist BirthDay" value={ethers.utils.parseBytes32String(pathologistData?.[10])} />
            <CustomText label="licenseNumber" value={String(pathologistData?.[3])} />
            <CustomText label="Specialization Area" value={ethers.utils.parseBytes32String(pathologistData?.[4])} />
            <CustomText
              label="totalExperience"
              value={String(pathologistData?.[5])}
            />
          </Card.Content>
        </Card>
      )}
    </View>
  );
};

export default GetPathologistPersonalData;

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
    marginBottom: 5,
  },
  boldValue: {
    fontWeight: 'bold',
  },
};
