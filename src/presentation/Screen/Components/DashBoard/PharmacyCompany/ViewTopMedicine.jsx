import React, { useContext, useEffect, useState } from 'react';
import {  RefreshControl } from 'react-native';

import { ActivityIndicator, Card, Text } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { HealthContext } from '../../../../../logic/context/health';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPharmacyCompanyData } from '../../../../../logic/redux/pharmacy company/pharmacyCompanySlice';

const ViewTopMedicine = () => {
  const { getPharmacyCompanyAllData,reducerValue } = useContext(HealthContext);
  const [refreshing, setRefreshing] = useState(false);
  const [TopMedichine, setTopMedichine] = useState([]);
  const dispatch = useDispatch();
  const { pharmacyCompanyData,loading, error } = useSelector((state) => state.pharmacyCompany);
  const onRefresh = () => {
    setRefreshing(true);
    getPharmacyCompanyAllData()
    fetchTopMedicine()
    setRefreshing(false);
  };
  const fetchTopMedicine = () => {
    if (loading) {
      return <ActivityIndicator/>
    } else {
      let medichine;
      if (typeof pharmacyCompanyData?.[8] === 'string') {
        medichine = pharmacyCompanyData?.[8].split(',').map(item => item.trim());
    }
      setTopMedichine(medichine)
      // console.log(medichine)
    }
  }
  useEffect(() => {
    dispatch(fetchPharmacyCompanyData()).then(() => {
      fetchTopMedicine()
    })
  }, []);
  // useEffect(() => {
  //   getPharmacyCompanyAllData();
  //   TopMedichine
  // }, [reducerValue])
  return (
    <ScrollView style={{ marginHorizontal: 15, marginBottom: 50 }} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      
      <ScrollView>
        {TopMedichine.slice().reverse().map((el, i) => (
          <Card style={{ marginTop: 20 }} key={i}> 
            <Card.Content>
              <Text style={styles.title}>
                {i + 1}. {el}
              </Text>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </ScrollView>
  );
};

const styles = {
  title: {
    fontSize: 15,
    fontWeight: 'bold',
  },
};

export default ViewTopMedicine;
