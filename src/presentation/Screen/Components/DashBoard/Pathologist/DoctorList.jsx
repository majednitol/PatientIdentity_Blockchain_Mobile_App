


import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, RefreshControl } from 'react-native';
import { ActivityIndicator, Card, Text, useTheme } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { HealthContext } from '../../../../../logic/context/health';

const DoctorList = () => {
  const theme = useTheme();
  const {isLoading,
    getPathologistAllData,emailAddress,
    PathologistData,reducerValue} = useContext(HealthContext);
      const [PathoPersonalDoctorsList, setPathoPersonalDoctorList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    getPathologistAllData();
    setRefreshing(false);
  };
  useEffect(() => {
    getPathologistAllData();
    PathologistData
  }, [reducerValue])
  useEffect(() => {
    if (!isLoading && Array.isArray(PathologistData)) {
      const personalDoctors = PathologistData[13];
      setPathoPersonalDoctorList(personalDoctors || []);
    }
  }, [PathologistData, isLoading]);

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
              {PathoPersonalDoctorsList.length > 0 ? (
                PathoPersonalDoctorsList.slice().reverse().map((doctor, index) => (
                  <DoctorCard key={index} doctor={doctor} />
                ))
              ) : (
                <Card style={{ marginTop: 20 }}>
                  <Card.Content>
                    <Text style={styles.title}>You did't sent any report</Text>
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

const DoctorCard = ({ doctor }) => {
  const { isLoading ,getDoctorAllData,emailAddress } = useContext(HealthContext);
  const [doctorData, setDoctorData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!isLoading) {
        try {
          const data = await getDoctorAllData(doctor);
          setDoctorData(data);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchData();
  }, [doctor, isLoading]);

  return (
    <Card style={styles.card}>
      <Card.Content>
        {doctorData ? (
          <>
          <CustomText label="Account " value={doctorData[0]} />
          <CustomText label="EmailAddress" value={emailAddress} />
            <CustomText label="DoctorId " value={String(doctorData[1])} />
            <CustomText label="Doctor Name" value={doctorData[2]} />
          </>
        ) : (
          <ActivityIndicator />
        )}
      </Card.Content>
    </Card>
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

export default DoctorList;
