import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fetchAdminData } from '../../../../../logic/redux/admin/AdminSlice';
import SmartAccount from '../../../../../service/wallet connect/SmartAccount';
import { useDispatch, useSelector } from 'react-redux';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { ScrollView } from 'react-native';
import { RefreshControl } from 'react-native';
import { ActivityIndicator, Card, useTheme } from 'react-native-paper';
import { ethers } from 'ethers';
const PersonalInfo = () => {
  const theme = useTheme();

  const { adminData } = useSelector((state) => state.admin);

  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const fetchData = async () => {
    const [smartWallet, saAddress] = await SmartAccount.connectedSmartAccount();
    console.log('saAddress7777', saAddress);
    dispatch(fetchAdminData(saAddress));
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (adminData.error) {
    console.log('patienterror', adminData.error);
  }
  return (
    <Animated.View
      style={{ marginHorizontal: 12, marginVertical: 50 }}
      entering={FadeInDown.springify()}
      exiting={FadeInUp.springify()}>
      <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <View>
          {adminData.data === null ? (
            <ActivityIndicator color={theme.colors.primary} />
          ) : (
            <View>
              <Card style={{ elevation: 7 }}>
                <Card.Content>
                  <Text style={styles.title}>Admin Basic Information</Text>
                  <CustomText label="Account" value={adminData?.data?.[0]} />

                  <CustomText label="AdminId" value={String(adminData?.data?.[1])} />
                  <CustomText label="Admin Name" value={ethers.utils.parseBytes32String(adminData?.data?.[2])} />
                  <CustomText label="Admin Gender" value={ethers
                    .utils.parseBytes32String(adminData?.data?.[3])} />
                  <CustomText label="Birthday" value={ethers
                    .utils.parseBytes32String(adminData?.data?.[8])} />
                  <CustomText label="EmailAddress" value={ethers
                    .utils.parseBytes32String(adminData?.data?.[9])} />
                  <CustomText label="Age" value={String(adminData?.data?.[10])} />
                  <CustomText label="Location" value={ethers
                    .utils.parseBytes32String(adminData?.data?.[11])} />

                </Card.Content>
              </Card>

            </View>
          )}
        </View>
      </ScrollView>
    </Animated.View>
  );
};

const CustomText = ({ label, value }) => (
  <Text style={styles.text}>
    <Text style={styles.label}>{label}:</Text> <Text style={styles.boldValue}>{value}</Text>
  </Text>
);

const styles = {
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
};


export default PersonalInfo

