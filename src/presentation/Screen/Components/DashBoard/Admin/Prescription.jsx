import React, { useContext, useEffect, useState } from 'react';
import DisplayFile from '../../File/DisplayFile';

import Animated from 'react-native-reanimated';
import { HealthContext } from '../../../../../logic/context/health';
import { RefreshControl, ScrollView } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import SmartAccount from '../../../../../service/wallet connect/SmartAccount';
import { fetchAdminData } from '../../../../../logic/redux/admin/AdminSlice';


const AdminPrescription = () => {
  const theme = useTheme();
  const {
    reducerValue, setIsDbVisiable  } = useContext(HealthContext);
  const dispatch = useDispatch();
  const { adminData } = useSelector((state) => state.admin);
  const [refreshing, setRefreshing] = useState(false);
  const [saAddress, setSaAddress] = useState('');
  const fetchData = async () => {
    const [smartWallet, saAddress] = await SmartAccount.connectedSmartAccount();
    console.log('saAddress7777', saAddress);
    dispatch(fetchAdminData(saAddress));
    setSaAddress(saAddress);
  };
  const onRefresh = () => {
    setRefreshing(true);
    // getPatientAllData();
    fetchData()
    adminData.data
    setRefreshing(false);

  };

  useEffect(() => {

    fetchData()
    adminData.data
    console.log(adminData?.data?.[5])
    setIsDbVisiable(true)


  }, [])



  if (adminData.loading) {
    return <ActivityIndicator animating={true} color={theme.colors.primary} />;
  }

  if (adminData.error) {
    console.log('patienterror', error);
  }
  return (

    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }><Animated.View>
        <DisplayFile userData={adminData?.data?.[5]} />
      </Animated.View>
    </ScrollView>

  );
};

export default AdminPrescription;
