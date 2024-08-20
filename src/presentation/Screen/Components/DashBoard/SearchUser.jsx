import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet, RefreshControl } from 'react-native';
import { ActivityIndicator, Card, TextInput, Text, useTheme } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { HealthContext } from '../../../../logic/context/health';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';

const SearchUser = () => {
    const theme = useTheme();
    const { isLoading, getAllusersData } = useContext(HealthContext);
    const [allUserData, setAllUserData] = useState([]);
    const [searchedUser, setSearchedUser] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [searchInfo, setSearchInfo] = useState('');
    const [errors, setErrors] = useState({ searchInfo: false });

    const onRefresh = async () => {
        setRefreshing(true);

        setRefreshing(false);
    };

    useEffect(() => {
        const fetchAllUserData = async () => {
            try {
                const res = await getAllusersData();
                setAllUserData(res);
                console.log(res);
            } catch (error) {
                console.error("Error fetching user addresses:", error);
            }
        };
        fetchAllUserData();
    }, []);

    const handleInputChange = (value) => {
        setSearchInfo(value);
        setErrors({ searchInfo: false });

        if (value.trim() === '') {
            setSearchedUser([]);
        } else {
            const filteredUsers = allUserData.map((user) => {

                if (
                    user.userType.toLowerCase().includes(value.toLowerCase()) ||
                    user.userAddress.includes(value.toLowerCase()) ||
                    user.userID.toString().includes(value.toLowerCase()) ||
                    user.username.toLowerCase().includes(value.toLowerCase())
                ) {
                    return user;
                }
                return null;
            }).filter(user => user !== null);
            setSearchedUser(filteredUsers);
        }
    };

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
                            <View style={{ marginHorizontal: 16 }}>
                                <TextInput
                                    style={{ marginVertical: 10 }}
                                    mode="outlined"
                                    keyboardType="default"
                                    value={searchInfo}
                                    error={errors.searchInfo}
                                    onChangeText={handleInputChange}
                                    label="Enter Search User"
                                />
                                {errors.searchInfo && (
                                    <Text style={{ color: 'red' }}>Field required</Text>
                                )}
                            </View>

                            <View style={{ marginTop: 20 }}>
                                {searchedUser.length > 0 ? (
                                    searchedUser.map((user, index) => (
                                        <AllUserCard key={index} user={user} />
                                    ))
                                ) : (
                                    <Text>No matching users found</Text>
                                )}
                            </View>
                        </>
                    )}
                </Animated.View>
            </ScrollView>
        </View>
    );
};

const AllUserCard = ({ user }) => {
    const navigation = useNavigation();
    const { setScanAddress, connectedAccount, ConnectedAccountUser } = useContext(HealthContext);

    const fetchUserType = async (address) => {
        const userType = await connectedAccount(address)
        if (String(ConnectedAccountUser) == '1') {
            if (String(userType) == '5' || String(userType) == '2') {
                navigation.navigate('Sent Prescription');
            }
        } else if (String(ConnectedAccountUser) == '5') {
            if (String(userType) == '1' || String(userType) == '3' || String(userType) == '4') {
                navigation.navigate('Share Prescription');
            }
        } else if (String(ConnectedAccountUser) == '2') {
            if (String(userType) == '1') {
                navigation.navigate('Sent Test Report');
            }
        }
    }
    return (
        <TouchableOpacity onPress={() => {

            setScanAddress(user.userAddress)
            fetchUserType(user.userAddress)

        }}>
            <Card style={styles.card}>
                <Card.Content>
                    {user ? (
                        <>
                            <CustomText label="UserType" value={user.userType} />
                            <CustomText label="Account" value={user.userAddress} />
                            <CustomText label="UserId" value={String(user.userID)} />
                            <CustomText label="User Name" value={user.username} />
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

export default SearchUser;
