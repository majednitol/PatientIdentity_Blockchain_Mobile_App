
import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, RefreshControl, TouchableOpacity } from 'react-native';
import { ActivityIndicator, Card, Text, useTheme } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { HealthContext } from '../../../../../logic/context/health';
import { useNavigation } from '@react-navigation/native';

const PatientAlPrescription = () => {
  const theme = useTheme();
  const {isLoading,getPharmacyCompanyAllData,PharmacyCompany,patientToParmacyCompany,
      reducerValue,getPatientToPharmacy,setIsDbVisiable} = useContext(HealthContext);
      const [prescriptionSenderPatientsList, setPrescriptionSenderPatientsList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    getPharmacyCompanyAllData();
    getPatientToPharmacy()
    setRefreshing(false);
  };
  useEffect(() => {
    getPharmacyCompanyAllData();
    getPatientToPharmacy()
    PharmacyCompany
    setIsDbVisiable(false)
  }, [])
  useEffect(() => {
    if (!isLoading && Array.isArray(patientToParmacyCompany)) {
      const senderPatients = patientToParmacyCompany;
      setPrescriptionSenderPatientsList(senderPatients || []);
    }
  }, [PharmacyCompany, isLoading]);

  return (
    <View style={styles.container}>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <Animated.View entering={FadeInDown.springify()} exiting={FadeInUp.springify()}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size={40} animating={true} color={theme.colors.blueA400} />
            </View>
          ) : (
            <>
              {prescriptionSenderPatientsList.length > 0 ? (
                prescriptionSenderPatientsList.slice().reverse().map((patient, index) => (
                  <PatientCard key={index} patient={patient} />
                ))
              ) : (
                <Card style={{ marginTop: 20 }}>
                  <Card.Content>
                    <Text style={styles.title}>You don't have treatment from anyone</Text>
                  </Card.Content>
                </Card>
              )}
            </>
          )}
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const PatientCard = ({ patient }) => {
  const { isLoading ,getPatientAllData } = useContext(HealthContext);
  const [patientData, setPatientData] = useState(null);
 
  const navigation = useNavigation();
  useEffect(() => {
    const fetchData = async () => {
      if (!isLoading) {
        try {
          const data = await getPatientAllData(patient);
          setPatientData(data);
          
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchData();
  }, [patient, isLoading]);

  return (
    <TouchableOpacity onPress={() => {
      navigation.navigate('DisplayFile', { imageUrls: patientData.imgUrl });
  }}>
    <Card style={styles.card}>
      <Card.Content>
        {patientData ? (
          <>
          <CustomText label="Account" value={patientData[0]} />
              <CustomText label="PatientId" value={String(patientData[1])} />
              <CustomText label="Patient Name" value={patientData[2]} />
              <CustomText label="Patient Gender" value={patientData[3]} />
          </>
        ) : (
          <ActivityIndicator />
        )}
      </Card.Content>
      </Card>
      </TouchableOpacity>
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

export default PatientAlPrescription;
