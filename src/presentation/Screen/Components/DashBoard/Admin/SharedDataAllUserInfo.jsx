
import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, RefreshControl, Dimensions, TouchableOpacity } from 'react-native';
import { ActivityIndicator, Button, Card, Text, useTheme } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { HealthContext } from '../../../../../logic/context/health';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminData, getsharedAllUsersAddress } from '../../../../../logic/redux/admin/AdminSlice';
import SmartAccount from '../../../../../service/wallet connect/SmartAccount';
import { ethers } from 'ethers';
const { width, height } = Dimensions.get('window');
const SharedDataAllUserInfo = () => {
    const theme = useTheme();
    const { isLoading, reducerValue, sharedAllUsersAddress } = useContext(HealthContext);
    const { adminData,sharedAllUsers } = useSelector((state) => state.admin);
    const [SharedDataAllUserAddress, setSharedDataAllUserAddress] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const dispatch = useDispatch();
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const fetchData = async () => {
        const [smartWallet, saAddress] = await SmartAccount.connectedSmartAccount();
        console.log('saAddress7777', saAddress);
        dispatch(getsharedAllUsersAddress())
    };
    const onRefresh = () => {
        setRefreshing(true);
        fetchData();
        setIsDataLoaded(false);


        setRefreshing(false);
    };
    useEffect(() => {
        fetchData()
        
    }, [dispatch])
    useEffect(() => {
        if (!sharedAllUsers.loading && Array.isArray(sharedAllUsers?.data)) {
            const alluserAddress = sharedAllUsers.data;
            setSharedDataAllUserAddress(alluserAddress || []);
            setIsDataLoaded(true);


        }
    }, [sharedAllUsers?.data, sharedAllUsers.loading]);
console.log('SharedDataAllUserAddress',sharedAllUsers.data)
    return (
        <View style={styles.container}>
            <ScrollView
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <Animated.View entering={FadeInDown.springify()} exiting={FadeInUp.springify()}>
                    {sharedAllUsers.loading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size={40} animating={true} color={theme.colors.primary} />
                        </View>
                    ) : (
                        <>
                            {isDataLoaded && SharedDataAllUserAddress.length === 0 ? (
                                <Card style={{ marginTop: 20 }}>
                                    <Card.Content>
                                        <Text style={styles.title}>You did't share your prescription anyone yet</Text>
                                    </Card.Content>
                                </Card>
                            ) :(
                                SharedDataAllUserAddress.slice().reverse().map((userAddress, index) => (
                                    <AllUserCard key={index} userAddress={userAddress} index={index} data={SharedDataAllUserAddress} />
                                ))
                            ) }
                        </>
                    )}
                </Animated.View>
            </ScrollView>
        </View>
    );
};

const AllUserCard = ({ userAddress }) => {
    const { isLoading, getAlluserData, revokeAccess,revokeLoader } = useContext(HealthContext);
    const [userData, setUserData] = useState(null);

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

                        <CustomText label="UserType " value={ethers.utils.parseBytes32String(userData[0])} />
                        <CustomText label="Account " value={userData.userAddress} />
                        <CustomText label="UserId " value={String(userData[2])} />
                        <CustomText label="User Name" value={ethers.utils.parseBytes32String(userData[3])} />
                        <CustomText label="Email Address" value={ethers.utils.parseBytes32String(userData.emailAddress)} />
         
                        <TouchableOpacity onPress={() => { revokeAccess(userData.userAddress) }} style={styles.button}>
                      <Text style={{ color: 'white', fontWeight: 'bold' }}>Revoke Access</Text>
                </TouchableOpacity>
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
    button: {
        backgroundColor: 'red',
        height: height * 0.05,
        width: width * 0.8,
        justifyContent: 'center',
        alignItems: 'center',

        borderRadius: 10,
   
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

export default SharedDataAllUserInfo;