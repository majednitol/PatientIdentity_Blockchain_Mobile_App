
import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, RefreshControl, TouchableOpacity } from 'react-native';
import { ActivityIndicator, Card, Text, useTheme } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { HealthContext } from '../../../../../logic/context/health';
import { useNavigation } from '@react-navigation/native';
import { fetchPharmacyCompanyData, getAdminToPharmacyData } from '../../../../../logic/redux/pharmacy company/pharmacyCompanySlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminData } from '../../../../../logic/redux/admin/AdminSlice';
import { ethers } from 'ethers';
import ProfilePicture from '../../File/ProfilePicture';

const PatientAllPrescription = () => {
  const theme = useTheme();
  const {
    reducerValue } = useContext(HealthContext);
  const dispatch = useDispatch();
  const { pharmacyCompanyData, AdminToPharmacy, loading, error } = useSelector((state) => state.pharmacyCompany);
  const [prescriptionSenderAdmin, setPrescriptionSenderAdmin] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);

    dispatch(getAdminToPharmacyData())
    isDataLoaded(false)
    setRefreshing(false);
  };
  useEffect(() => {

    dispatch(getAdminToPharmacyData())


  }, [dispatch])

  useEffect(() => {
    if (!AdminToPharmacy.loading && Array.isArray(AdminToPharmacy.data)) {
      setPrescriptionSenderAdmin(AdminToPharmacy.data || []);
      setIsDataLoaded(true)
    }
  }, [AdminToPharmacy, AdminToPharmacy.loading]);
  console.log('prescriptionSenderAdmin', prescriptionSenderAdmin)
  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <Animated.View entering={FadeInDown.springify()} exiting={FadeInUp.springify()}>
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size={40} animating={true} color={theme.colors.blueA400} />
            </View>
          ) : (
            <>
              {isDataLoaded && prescriptionSenderAdmin.length === 0 ? (
                <Card style={{ marginTop: 20 }}>
                  <Card.Content>
                    <Text style={styles.title}>Admin didnot send any prescription yet.</Text>
                  </Card.Content>
                </Card>
              ) :(
                prescriptionSenderAdmin.slice().reverse().map((admin, index) => (
                  <AdminCard key={index} admin={admin} />
                ))
              ) }
            </>
          )}
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const AdminCard = ({ admin }) => {
  console.log("r", admin)

  const [patientData, setPatientData] = useState(null);
  const { adminData } = useSelector((state) => state.admin);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const saAddress = admin

      dispatch(fetchAdminData(saAddress));
    };
    fetchData()

  }, [admin]);
  console.log("adminData", adminData.data[5])
  return (
    <View >
      <Card style={styles.card} onPress={() => {
        navigation.navigate('DisplayFile', { imageUrls: adminData?.data?.[5] });
      }}>
        <Card.Content>
          {adminData.data ? (
            <>
              <View style={{
                flexDirection: 'row',         // Aligns buttons in a row
                justifyContent: 'space-between',     // Centers buttons horizontally
                alignItems: 'center',         // Centers buttons vertically

              }}>
                <ProfilePicture userData={adminData.data?.[4]} height={150} width={119} borderRadius={20} />
                <View>
                  <CustomText label="Account" value={adminData?.data?.[0]} />
                  <CustomText label="AdminId" value={String(adminData?.data?.[1])} />
                  <CustomText label="Admin Name" value={ethers.utils.parseBytes32String(adminData?.data?.[2])} />
                  <CustomText label="Admin Gender" value={ethers
                    .utils.parseBytes32String(adminData?.data?.[3])} />
                </View>
              </View>
            </>
          ) : (
            <ActivityIndicator />
          )}
        </Card.Content>
      </Card>
    </View>
  );
};

const CustomText = ({ label, value }) => (
  <Text style={styles.text}>
    <Text style={styles.label}>{label}:</Text>{' '}
    <Text style={styles.boldValue} selectable={true}>{value}</Text>
  </Text>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 50,
    marginHorizontal: 20,
    marginTop: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    marginBottom: 10,
    elevation: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
  },
  boldValue: {
    fontWeight: 'bold',
  },
});

export default PatientAllPrescription;
