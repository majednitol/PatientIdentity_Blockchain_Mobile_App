import React, {useContext, useEffect, useState} from 'react';
import {RefreshControl, View} from 'react-native';

import DisplayFile from '../../File/DisplayFile';
import { HealthContext } from '../../../../../logic/context/health';
import { ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMedicalResearchLabData } from '../../../../../logic/redux/medical research lab/medicalResearchLabSlice';


const ViewPrescriptionOrLabReport = () => {
  const {
    MedicalResearchLab,getMedicalResearchLabAData,reducerValue
  } = useContext(HealthContext);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const { medicalResearchLabData, loading, error } = useSelector((state) => state.medicalResearchLab);
  useEffect(() => {

    dispatch(fetchMedicalResearchLabData())
    console.log("medicalResearchLabData", medicalResearchLabData)
  }, []);
  const onRefresh = () => {
    setRefreshing(true);
    getMedicalResearchLabAData()
    setRefreshing(false);
  };
  useEffect(() => {
    getMedicalResearchLabAData();
    MedicalResearchLab
  }, [reducerValue])
  return (
    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}  >
      <DisplayFile userData={medicalResearchLabData?.[7]} />
    </ScrollView>
  );
};

export default ViewPrescriptionOrLabReport;
