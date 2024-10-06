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
import { retrieveFromStorage, saveToStorage } from '../../../../../../LocalStorage'; // Adjust the path as necessary

const STORAGE_KEY = 'AdminToPharmacyData';

const PatientAllPrescription = () => {
  const theme = useTheme();
  const { reducerValue } = useContext(HealthContext);
  const dispatch = useDispatch();
  const { pharmacyCompanyData, AdminToPharmacy, loading, error } = useSelector((state) => state.pharmacyCompany);
  const [prescriptionSenderAdmin, setPrescriptionSenderAdmin] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  // Function to load data from local storage and fetch from API
  const loadData = async () => {
    try {
      // Retrieve data from local storage
      const storedData = retrieveFromStorage(STORAGE_KEY);
      if (storedData) {
        setPrescriptionSenderAdmin(storedData);
        setIsDataLoaded(true);
        console.log('Retrieved from storage', storedData);
      } else {
         dispatch(getAdminToPharmacyData());
      }
     
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  useEffect(() => {
    loadData();
  }, [dispatch]);

  useEffect(() => {
    if (!AdminToPharmacy.loading && Array.isArray(AdminToPharmacy.data)) {
      // Save fetched data to local storage
      saveToStorage(STORAGE_KEY, AdminToPharmacy.data);
      console.log('Data saved to storage', AdminToPharmacy.data);
      setPrescriptionSenderAdmin(AdminToPharmacy.data);
      setIsDataLoaded(true);
    }
  }, [AdminToPharmacy]);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      dispatch(getAdminToPharmacyData());
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <Animated.View entering={FadeInDown.springify()} exiting={FadeInUp.springify()}>
          {AdminToPharmacy.loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size={40} animating={true} color={theme.colors.primary} />
            </View>
          ) : (
            <>
              {isDataLoaded && prescriptionSenderAdmin.length === 0 ? (
                <Card style={{ marginTop: 20 }}>
                  <Card.Content>
                    <Text style={styles.title}>Admin did not send any prescription yet.</Text>
                  </Card.Content>
                </Card>
              ) : (
                prescriptionSenderAdmin.slice().reverse().map((admin, index) => (
                  <AdminCard key={index} admin={admin} />
                ))
              )}
            </>
          )}
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const AdminCard = ({ admin }) => {
  const [userData, setUserData] = useState(null);
  const { adminData } = useSelector((state) => state.admin);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = retrieveFromStorage("adminData");
        if (storedData) {
          setUserData(storedData) 
          console.log('load from stored data', storedData)
        } else {
          const saAddress = admin;
          dispatch(fetchAdminData(saAddress))
        }

      } catch (error) {
        console.error('Error fetching admin data:', error);
      }
    };
    fetchData();
  }, [admin, dispatch]);

  useEffect(() => {
    if (!adminData.loading && Array.isArray(adminData?.data)) {
      setUserData(adminData.data);
      saveToStorage("adminData", adminData.data);
      console.log(`Saved admin data for ${admin} to storage:`, adminData.data);
     
    }
  }, [adminData.data]);
  return (
    <View>
      <Card
        style={styles.card}
        onPress={() => {
          navigation.navigate('DisplayFile', { imageUrls: userData?.[5] });
        }}
      >
        <Card.Content>
          {userData ? (
            <>
              <View style={styles.adminInfoContainer}>
                <ProfilePicture userData={userData?.[4]} height={130} width={100} borderRadius={20} />
                <View style={styles.adminTextContainer}>
                  <CustomText label="Account" value={userData?.[0]} />
                  <CustomText label="Admin ID" value={String(userData?.[1])} />
                  <CustomText label="Admin Name" value={ethers.utils.parseBytes32String(userData?.[2])} />
                  <CustomText label="Admin Gender" value={ethers.utils.parseBytes32String(userData?.[3])} />
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
    <Text style={styles.label}>{label}:</Text> <Text style={styles.boldValue} selectable={true}>{value}</Text>
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
  adminInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  adminTextContainer: {
    marginLeft: 20,
    flex: 1,
  },
});

export default PatientAllPrescription;
