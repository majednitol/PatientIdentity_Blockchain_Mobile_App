import * as React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Avatar, Text, Button, IconButton, Card } from 'react-native-paper';

export default function PatientDashboard() {
  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Avatar.Image size={80} source={{ uri: 'https://via.placeholder.com/150' }} />
        <View style={styles.headerText}>
          <Text style={styles.patientName}>Patient Name</Text>
          <Text style={styles.patientId}>Id: 25641848626262</Text>
        </View>
        <IconButton icon="bell" size={30} onPress={() => {}} />
      </View>

      {/* Icons Section */}
      <View style={styles.iconRow}>
        <Button icon="doctor" mode="outlined" style={styles.iconButton}>
          Your Doctor
        </Button>
        <Button icon="file-document" mode="outlined" style={styles.iconButton}>
          Prescriptions
        </Button>
        <Button icon="file" mode="outlined" style={styles.iconButton}>
          Documents
        </Button>
      </View>

      <View style={styles.iconRow}>
        <Button icon="qrcode" mode="outlined" style={styles.iconButton}>
          Your Qr
        </Button>
        <Button icon="account-multiple" mode="outlined" style={styles.iconButton}>
          Shared
        </Button>
        <Button icon="folder" mode="outlined" style={styles.iconButton}>
          Files
        </Button>
      </View>

      {/* Health Data Section */}
      <Card style={styles.card}>
        <Card.Content>
          <View style={styles.healthDataHeader}>
            <Text style={styles.healthDataTitle}>Health Data</Text>
            <Text>Last Update: 12 June</Text>
          </View>
          <View style={styles.healthData}>
            <Text>Height: </Text>
            <Text>Blood Group: </Text>
            <Text>Previous Diseases: </Text>
            <Text>Medicine/Drugs: </Text>
            <Text>Bad Habits: </Text>
            <Text>Chronic Diseases: </Text>
            <Text>Health Allergies: </Text>
            <Text>Birth Defects: </Text>
          </View>
        </Card.Content>
      </Card>

      {/* Bottom Section */}
      <View style={styles.bottomRow}>
        <Button icon="upload" mode="contained" style={styles.bottomButton}>
          Upload
        </Button>
        <Button icon="image-search" mode="contained" style={styles.bottomButton}>
          Scan Image
        </Button>
        <Button icon="share" mode="contained" style={styles.bottomButton}>
          Share
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    flex: 1,
    marginLeft: 10,
  },
  patientName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  patientId: {
    fontSize: 16,
    color: 'white',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  iconButton: {
    flex: 1,
    marginHorizontal: 5,
  },
  card: {
    marginVertical: 20,
  },
  healthDataHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  healthDataTitle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  healthData: {
    marginTop: 10,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  bottomButton: {
    flex: 1,
    marginHorizontal: 5,
  },
});
