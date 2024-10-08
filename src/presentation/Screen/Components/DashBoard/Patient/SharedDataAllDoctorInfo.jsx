
import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, RefreshControl } from 'react-native';
import { ActivityIndicator, Button, Card, Text, useTheme } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { HealthContext } from '../../../../../logic/context/health';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPatientData, getsharedAllDoctorAddress } from '../../../../../logic/redux/patient/PatientSlice';
import SmartAccount from '../../../../../service/wallet connect/SmartAccount';
import ProfilePicture from '../../File/ProfilePicture';
import { ethers } from 'ethers';
import { fetchDoctorData } from '../../../../../logic/redux/doctor/DoctorSlice';

const SharedDataAllDoctorsInfo = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { isLoading, reducerValue } = useContext(HealthContext);
    const [SharedDataAllDoctorAddress, setSharedDataAllDoctorAddress] = useState([]);
    const { patientData, sharedAllDoctorAddress } = useSelector((state) => state.patient);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const fetchData = async () => {
        const [smartWallet, saAddress] = await SmartAccount.connectedSmartAccount();
        console.log('saAddress7777', saAddress);
        dispatch(fetchPatientData(saAddress));
    };
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        fetchData();
        dispatch(getsharedAllDoctorAddress())
        setIsDataLoaded(false)
        setRefreshing(false);
    };
    useEffect(() => {
        fetchData();
        dispatch(getsharedAllDoctorAddress())
        patientData
    }, [dispatch])
    useEffect(() => {
        if (!isLoading && Array.isArray(patientData)) {
            const allDoctorsAddress = sharedAllDoctorAddress.data;
            setSharedDataAllDoctorAddress(allDoctorsAddress || []);
            setIsDataLoaded(true)


        }
    }, [patientData, isLoading]);

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
                            {isDataLoaded && SharedDataAllDoctorAddress.length === 0 ? (
                                <Card style={{ marginTop: 20 }}>
                                    <Card.Content>
                                        <Text style={styles.title}>You did't share your prescription anyone yet</Text>
                                    </Card.Content>
                                </Card>
                            ) : (
                                SharedDataAllDoctorAddress.slice().reverse().map((userAddress, index) => (
                                    <AllUserCard key={index} userAddress={userAddress} index={index} />
                                ))
                            )}
                        </>
                    )}
                </Animated.View>
            </ScrollView>
        </View>
    );
};

const AllUserCard = ({ userAddress }) => {
    const { isLoading, getAlluserData, revokeAccess } = useContext(HealthContext);
    const [userData, setUserData] = useState(null);
    const dispatch = useDispatch();
    const { doctorData, loading, error } = useSelector((state) => state.doctor);
    const fetchData = async () => {


        dispatch(fetchDoctorData(userAddress));

    }

    useEffect(() => {
        fetchData()
    }, [userAddress])


    useEffect(() => {
        const fetchData = async () => {
            if (!isLoading) {
                try {
                    const data = await getAlluserData(userAddress);
                    setUserData(data);
                } catch (error) {
                    console.error(error);
                }
            }
        };
        fetchData();
    }, [userAddress, isLoading]);

    return (
        <Card style={styles.card}>
            <Card.Content>
                {userData ? (
                    <>
                        <View style={{
                            flexDirection: 'row',         // Aligns buttons in a row
                            justifyContent: 'space-between',     // Centers buttons horizontally
                            alignItems: 'center',         // Centers buttons vertically

                        }}>
                            <ProfilePicture userData={doctorData?.[8]} height={130} width={100} borderRadius={20} />
                            <View style={{marginLeft: 10}}>
                                <CustomText label="Account " value={userData.userAddress} />
                                <CustomText label="DoctorId " value={String(userData[2])} />
                                <CustomText label="Doctor Name" value={ethers.utils.parseBytes32String(userData[3])} />
                                <CustomText label=" Doctor Email Address" value={ethers.utils.parseBytes32String(userData.emailAddress)} />

                            </View>
                        </View>
                        <Button onPress={() => { revokeAccess(userData.userAddress) }} mode='contained' style={styles.button} >
                            Revoke Access
                        </Button>
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
    }, button: {
        marginTop: 10,
        backgroundColor: 'red'
    },
    card: {
        marginBottom: 10,
        elevation: 20,
    },
    title: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        marginBottom: 5,
    },
    label: {
        fontWeight: 'bold',
    },
    boldValue: {
        fontWeight: 'bold',
    },
});

export default SharedDataAllDoctorsInfo;