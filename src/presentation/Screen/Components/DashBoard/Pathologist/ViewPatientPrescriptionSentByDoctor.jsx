import React, {useContext, useEffect, useState} from 'react';

import {RefreshControl, ScrollView} from 'react-native';
import DisplayFile from '../../File/DisplayFile';
import {Text} from 'react-native-paper';
import { HealthContext } from '../../../../../logic/context/health';

const ViewPatientPrescriptionSentByDoctor = () => {
  const {
    getPathologistAllData,
    PathologistData,isLoading
  } = useContext(HealthContext);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    getPathologistAllData()
    setRefreshing(false);
  };
  useEffect(() => {
    getPathologistAllData();
  }, []);
  return (
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      {isLoading ? (
        <Text>Loading</Text>
      ) : (
        <DisplayFile userData={PathologistData} />
      )}
    </ScrollView>
  );
};

export default ViewPatientPrescriptionSentByDoctor;
