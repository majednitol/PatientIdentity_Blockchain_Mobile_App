// import React, { useEffect } from 'react';
// import { Card, Text, Surface, Button, useTheme } from 'react-native-paper';
// import { StyleSheet, View, ScrollView } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { addSubscription, cancelSubscription, getSubscriptionStatus } from '../../../logic/redux/subscription/subscription';
// import { useNavigation } from '@react-navigation/native';

// function GiveConfirmationTx() {
//     const dispatch = useDispatch();
//     const {provideConfirmation, pendingUserAllAddess,isConfirmed } = useSelector((state) => state.transactionConfirmation);
//     const theme = useTheme();
//     const navigation = useNavigation();
//     useEffect(() => {
//         dispatch(getSubscriptionStatus());
//     }, [dispatch]);
//     const gotoPayment = () => {
//         navigation.navigate('Payment');
//     }
//     // Helper function to convert timestamp to days

//     return (
//         <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
//             <Surface style={styles.surface}>
//                 <Text style={styles.title}>Subscription Information</Text>

//                 <Card style={styles.card}>
//                     <Card.Content>
//                         <Text style={styles.label}>Subscription Status:</Text>
//                         <Text style={styles.value}>{subscriptionStatus?.data?.[0] || 'N/A'}</Text>
//                     </Card.Content>
//                 </Card>

//                 <Card style={styles.card}>
//                     <Card.Content>
//                         <Text style={styles.label}>Subscription Total Days:</Text>
//                         <Text style={styles.value}>
//                             {subscriptionStatus?.data?.[1] ? subscriptionStatus.data[1] + ' Years' : 'N/A'}
//                         </Text>
//                     </Card.Content>
//                 </Card>

//                 <Card style={styles.card}>
//                     <Card.Content>
//                         <Text style={styles.label}>Subscription Left Days:</Text>
//                         <Text style={styles.value}>{subscriptionStatus?.data?.[2] + ' days' || 'N/A'}</Text>
//                     </Card.Content>
//                 </Card>

//                 <Button
//                     mode="contained"
//                     onPress={() => {
//                         gotoPayment()
//                     }}
//                     style={styles.button}
//                     labelStyle={styles.buttonLabel}
//                 >
//                     Add subscription
//                 </Button>
//                 <Button
//                     mode="contained"
//                     onPress={() => {
//                         gotoPayment()
//                     }}
//                     style={styles.button}
//                     labelStyle={styles.buttonLabel}
//                 >
//                     Renew subscription
//                 </Button>
//                 <Button
//                     mode="contained"
//                     onPress={() => {
//                         dispatch(cancelSubscription())
//                     }}
//                     style={styles.button}
//                     labelStyle={styles.buttonLabel}
//                 >
//                     Cancel subscription
//                 </Button>
//             </Surface>
//         </ScrollView>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//     },
//     surface: {
//         padding: 20,
//         elevation: 4,
//         borderRadius: 10,
//         backgroundColor: '#fff',
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
//         textAlign: 'center',
//     },
//     card: {
//         marginVertical: 10,
//         padding: 15,
//         borderRadius: 10,
//         backgroundColor: '#f0f0f0',
//     },
//     label: {
//         fontSize: 16,
//         fontWeight: '600',
//         color: '#6200EE',
//     },
//     value: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: '#000',
//     },
//     button: {
//         marginTop: 20,
//         paddingVertical: 8,
//         borderRadius: 25,
//     },
//     buttonLabel: {
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
// });

// export default GiveConfirmationTx;

import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, RefreshControl, Alert } from 'react-native';
import { ActivityIndicator, Button, Card, Text, useTheme } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { HealthContext } from '../../../../../logic/context/health';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminData, getsharedAllUsersAddress } from '../../../../../logic/redux/admin/AdminSlice';
import SmartAccount from '../../../../../service/wallet connect/SmartAccount';
import { ethers } from 'ethers';
import { getPendingUserAddess, giveConfirmation, isConfirmedbyAdmin } from '../../../../../logic/redux/transaction confirmation/transactionConfirmationSlice';

const GiveConfirmationTx = () => {
    const theme = useTheme();
    const [pendingUserAddress, setPendingUserAddress] = useState([]);
    const { pendingUserAllAddess, provideConfirmation } = useSelector((state) => state.transactionConfirmation);
    const [refreshing, setRefreshing] = useState(false);
    const dispatch = useDispatch();
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const onRefresh = () => {
        setRefreshing(true);
        dispatch(getPendingUserAddess())
        setIsDataLoaded(false);


        setRefreshing(false);
    };
    useEffect(() => {
        dispatch(getPendingUserAddess())

    }, [dispatch])
    if (provideConfirmation.success) {
        return Alert.alert('User Confirmed Successfully');

    }
    useEffect(() => {
        if (!pendingUserAllAddess.loading && Array.isArray(pendingUserAllAddess?.data)) {
            const alluserAddress = pendingUserAllAddess.data;
            setPendingUserAddress(alluserAddress || []);
            setIsDataLoaded(true);
        }
    }, [pendingUserAllAddess?.data, pendingUserAllAddess.loading]);
    console.log('pendingUserAllAddess', pendingUserAllAddess.data)
    return (
        <View style={styles.container}>
            <ScrollView
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            >
                <Animated.View entering={FadeInDown.springify()} exiting={FadeInUp.springify()}>
                    {pendingUserAllAddess.loading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size={40} animating={true} color={theme.colors.primary} />
                        </View>
                    ) : (
                        <>
                            {isDataLoaded && pendingUserAddress.length === 0 ? (
                                <Card style={{ marginTop: 20 }}>
                                    <Card.Content>
                                        <Text style={styles.title}>No Pending User Found</Text>
                                    </Card.Content>
                                </Card>
                            ) : (
                                pendingUserAddress.slice().reverse().map((userAddress, index) => (
                                    <AllUserCard key={index} userAddress={userAddress} index={index} data={pendingUserAddress} />
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
    const { isLoading, getAlluserData } = useContext(HealthContext);
    const [userData, setUserData] = useState(null);
    const { pendingUserAllAddess, provideConfirmation, isConfirmed } = useSelector((state) => state.transactionConfirmation);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(isConfirmedbyAdmin({ userAddress }))
        console.log(" Confirmed")
    }, [userAddress,dispatch,pendingUserAllAddess])

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
console.log("isConfirmed.data",isConfirmed.data)
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
                        {
                            isConfirmed.data === true ? <Button onPress={() => {
                                const userAddress = userData.userAddress
                                dispatch(giveConfirmation({ userAddress })).then(() => {
                                    Alert.alert('User Confirmed Successfully');
                                })
                            }} mode='contained' style={styles.button} disabled={true}>
                                Already Confirmed
                            </Button> : <Button onPress={() => {
                                const userAddress = userData.userAddress
                                dispatch(giveConfirmation({ userAddress })).then(() => {
                                    Alert.alert('User Confirmed Successfully');
                                })
                            }} mode='contained' style={styles.button} >
                                Confirm
                            </Button>
                        }

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
        backgroundColor: 'green'
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

export default GiveConfirmationTx;