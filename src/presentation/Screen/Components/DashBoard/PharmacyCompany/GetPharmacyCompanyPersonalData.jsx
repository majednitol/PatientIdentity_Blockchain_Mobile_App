import {View} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';

import {ActivityIndicator, Card, MD2Colors, Text, useTheme} from 'react-native-paper';
import Animated, {FadeInDown, FadeInUp} from 'react-native-reanimated';
import { HealthContext } from '../../../../../logic/context/health';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPharmacyCompanyData } from '../../../../../logic/redux/pharmacy company/pharmacyCompanySlice';
import { ethers } from 'ethers';
import { retrieveFromStorage, saveToStorage } from '../../../../../../LocalStorage';

const GetPharmacyCompanyPersonalData = () => {
  const theme = useTheme();
  const { isLoading } = useContext(HealthContext);
  const dispatch = useDispatch();
  const { pharmacyCompanyData } = useSelector((state) => state.pharmacyCompany);
  
  const [userData, setUserData] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      const storedData = retrieveFromStorage('pharmacyCompanyData');
      if (storedData) {
        setUserData(storedData);
        console.log("Retrieved from storage", storedData);
      }
      else if (pharmacyCompanyData?.length) {
     
        saveToStorage('pharmacyCompanyData', pharmacyCompanyData);
        console.log("Data saved to storage", pharmacyCompanyData);
        setUserData(pharmacyCompanyData); 
      }

    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchPharmacyCompanyData());
  }, [dispatch]);
  return (
    <Animated.View 
      style={{marginHorizontal: 12, marginVertical: 50}}
      entering={FadeInDown.springify()}
      exiting={FadeInUp.springify()}>
      {isLoading ? (
        <ActivityIndicator color={theme.colors.primary}/> 
      ) : (
          <Card>
          <Card.Content>
            <Text style={styles.title}>Pharmacy Company Information</Text>
            {userData ? (
              <>
                <CustomText label="Account " value={userData?.[0]} />
                <CustomText label="companyID " value={userData?.[1]} />
                <CustomText label="Company Name" value={ethers.utils.parseBytes32String(userData?.[2])} />
                <CustomText label="licenseID" value={String(userData?.[3])} />
                <CustomText label="product Information" value={ethers.utils.parseBytes32String(userData?.[4])} />
                <CustomText label="pharmacyRating" value={userData?.[5]} />
              </>
            ) : (
              <Text>No data available</Text>
            )}
          </Card.Content>
        </Card>
      )}
    </Animated.View>
  );
};

export default GetPharmacyCompanyPersonalData;

const CustomText = ({label, value}) => (
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
