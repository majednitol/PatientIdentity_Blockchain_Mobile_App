import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Card, Text } from 'react-native-paper';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { ScrollView } from 'react-native-gesture-handler';

import { HealthContext } from '../../../logic/context/health';

export default function Notification() {
  const {
    doctorData,
    patientData,
    PharmacyCompanyData,
    MedicalResearchLab,
    PathologistData,
    ConnectedAccountUser,
    isLoading
  } = useContext(HealthContext);

  const [allNotification, setAllNotification] = useState([]);


  useEffect(() => {
    if (doctorData !== null ||
      patientData !== null ||
      PharmacyCompanyData !== null ||
      MedicalResearchLab !== null ||
      PathologistData !== null ||
      ConnectedAccountUser !== null) {
      let notifications = [];
      switch (String(ConnectedAccountUser)) {
        case '1':
          notifications =   [];
          break;
        case '2':
          notifications =  [];
          break;
        case '3':
          notifications =  [];
          break;
        case '4':
          notifications = [];
          break;
        case '5':
          notifications = [];
          break;
        default:
          notifications = [];
      }
      setAllNotification(notifications);
    }
  }, [ConnectedAccountUser, patientData, doctorData, MedicalResearchLab, PathologistData, PharmacyCompanyData]);

  return (
    <ScrollView style={{ marginHorizontal: 10, marginVertical: 10 }}>
      <Animated.View entering={FadeInDown.duration(800)}
        exiting={FadeInUp.springify()}>
        {isLoading && allNotification.length === null ? <ActivityIndicator
          size={45}
          animating={true}
          color="rgb(108, 99, 255)"
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        /> : allNotification.length > 0 ? (
          <Card>
            {allNotification.map((el, index) => (
              <View key={index} style={{ marginVertical: 10 }}>
                <Card.Content>
                  <Text >
                    {index + 1}. {el}
                  </Text>
                </Card.Content>
              </View>
            ))}
          </Card>
        ) : (
          <Card style={{ marginTop: 20, marginHorizontal: 10 }}>
            <Card.Content>
              <Text style={styles.title}>You don't have any notification</Text>
            </Card.Content>
          </Card>
        )}
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});



