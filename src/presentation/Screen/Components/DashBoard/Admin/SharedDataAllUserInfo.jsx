
import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, RefreshControl } from 'react-native';
import { ActivityIndicator, Button, Card, Text, useTheme } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { HealthContext } from '../../../../../logic/context/health';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdminData } from '../../../../../logic/redux/admin/AdminSlice';

const SharedDataAllUserInfo = () => {
    const theme = useTheme();
    const { isLoading, reducerValue, sharedAllUsersAddress, getsharedAllUsersAddress } = useContext(HealthContext);
    const { adminData } = useSelector((state) => state.admin);
    const [SharedDataAllUserAddress, setSharedDataAllUserAddress] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const dispatch = useDispatch();
    const fetchData = async () => {
      const [smartWallet, saAddress] = await SmartAccount.connectedSmartAccount();
      console.log('saAddress7777', saAddress);
      dispatch(fetchAdminData(saAddress))
    };
    const onRefresh = () => {
        setRefreshing(true);
        fetchData();
        getsharedAllUsersAddress()

        setRefreshing(false);
    };
    useEffect(() => {
        fetchData();
        getsharedAllUsersAddress()
        adminData?.data
    }, [reducerValue])
    useEffect(() => {
        if (!isLoading && Array.isArray(adminData?.data)) {
            const alluserAddress = sharedAllUsersAddress;
            setSharedDataAllUserAddress(alluserAddress || []);
            

        }
    }, [adminData?.data, isLoading]);

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
                            {SharedDataAllUserAddress.length > 0 ? (
                                SharedDataAllUserAddress.slice().reverse().map((userAddress, index) => (
                                    <AllUserCard key={index} userAddress={userAddress} index={index} data={SharedDataAllUserAddress} />
                                ))
                            ) : (
                                <Card style={{ marginTop: 20 }}>
                                    <Card.Content>
                                        <Text style={styles.title}>You did't share your prescription anyone yet</Text>
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

const AllUserCard = ({ userAddress }) => {
    const { isLoading, getAlluserData, revokeAccess } = useContext(HealthContext);
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

                        <CustomText label="UserType " value={userData[0]} />
                        <CustomText label="Account " value={userData.userAddress} />
                        <CustomText label="UserId " value={String(userData[2])} />
                        <CustomText label="User Name" value={userData[3]} />
                        <CustomText label="Email Address" value={userData.emailAddress} />
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

export default SharedDataAllUserInfo;