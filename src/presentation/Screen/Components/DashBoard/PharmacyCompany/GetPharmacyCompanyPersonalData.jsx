import {View} from 'react-native';
import React, { useContext, useEffect } from 'react';

import {ActivityIndicator, Card, MD2Colors, Text, useTheme} from 'react-native-paper';
import Animated, {FadeInDown, FadeInUp} from 'react-native-reanimated';
import { HealthContext } from '../../../../../logic/context/health';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPharmacyCompanyData } from '../../../../../logic/redux/pharmacy company/pharmacyCompanySlice';

const GetPharmacyCompanyPersonalData = () => {
  const theme = useTheme();
  const {
   isLoading,
    getPharmacyCompanyAllData,
    PharmacyCompanyData,emailAddress
  } = useContext(HealthContext);
  const dispatch = useDispatch();
  const { pharmacyCompanyData,loading, error } = useSelector((state) => state.pharmacyCompany);
  useEffect(() => {
    // getPharmacyCompanyAllData();
    dispatch(fetchPharmacyCompanyData())
    console.log("pharmacyCompanyData",pharmacyCompanyData)

  }, []);

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
              <CustomText label="Account " value={pharmacyCompanyData?.[0]} />
              {/* <CustomText label="EmailAddress" value={emailAddress} /> */}
            <CustomText label="companyID " value={String(pharmacyCompanyData?.[1])} />
            <CustomText label="Company Name" value={pharmacyCompanyData?.[2]} />
            <CustomText label="licenseID" value={String(pharmacyCompanyData?.[3])} />
            <CustomText
              label="product Information"
              value={pharmacyCompanyData?.[4]}
            />
            <CustomText
              label="pharmacyRating"
              value={String(pharmacyCompanyData?.[5])}
            />
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
  // label: {
  //   fontWeight: "bold",
  // },
  boldValue: {
    fontWeight: 'bold',
  },
};
