import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { HealthContext } from '../../../../../logic/context/health';
import { useNavigation } from '@react-navigation/native';
import { createAdminAccount } from '../../../../../logic/redux/admin/AdminSlice';
import { ActivityIndicator, TextInput } from 'react-native-paper';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
const SetAdmin = () => {
    const {
        generateUniqueId, btnclick, emailAddress } = useContext(HealthContext);

    const dispatch = useDispatch();
    const { loading, error, connectedUserType } = useSelector((state) => state.connectedUser);
    const { accountCreation } = useSelector((state) => state.admin);
    const adminID = generateUniqueId();
    console.log("uniqueId", adminID);
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');

    const [errors, setErrors] = useState({});
    const [call, setCall] = useState(false);
    const getUser = useMemo(() => async () => {
        async function fetchUser() {
            if (!loading) {

                dispatch(fetchConnectedUser()).then(() => {
                    if (connectedUserType === '6') {
                        navigation.navigate('Dashboard');
                        console.log("connectedUserType2", connectedUserType);
                    }
                });
            }
        }
        fetchUser();
    }, [loading, connectedUserType, dispatch, navigation]);

    useEffect(() => {
        if (btnclick === true) {
            navigation.setOptions({
                headerLeft: null
            });
        }
    }, [btnclick, navigation]);

    useEffect(() => {
        if (call === true) {
            getUser();
        }


    }, [getUser, call]);

    const handleInputChange = (name, value) => {
        if (name === 'name') {
            setName(value);
        } else if (name === 'gender') {
            setGender(value);
        } else if (name === 'age') {
            setAge(value);
        } else if (name === 'location') {
            setLocation(value);
        }
    };

    const handleSubmit = async () => {
        if (
            name.trim() !== '' &&
            gender.trim() !== ''
        ) {
            console.log('Form submitted');


            dispatch(
                createAdminAccount({
                    adminID,
                    name,
                    gender
                })
            ).then(() => {
                Alert.alert('SuccessFully created Account')
                setCall(true)
            }).catch(() => {
                console.log(accountCreation.error)
            })



        } else {
            console.log('Please fill up all fields');
            setErrors({
                name: name.trim() === '',
                gender: gender.trim() === ''
            });
        }
    };
    return (
        <ScrollView>
            <ScrollView View style={{ marginHorizontal: 16 }}>
                <TextInput
                    style={{ marginVertical: 10 }}
                    mode="outlined"
                    keyboardType="default"
                    value={name}
                    error={errors.name}
                    onChangeText={value => handleInputChange('name', value)}
                    label="Enter your name"
                />
                {errors.name && <Text style={{ color: 'red' }}>Field required</Text>}

                <TextInput
                    style={{ marginVertical: 10 }}
                    mode="outlined"
                    keyboardType="default"
                    value={gender}
                    error={errors.gender}
                    onChangeText={value => handleInputChange('gender', value)}
                    label="Enter your gender"
                />
                {errors.gender && <Text style={{ color: 'red' }}>Field required</Text>}
                <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                    {accountCreation.loading ? <ActivityIndicator color="white" /> : <Text style={{ color: 'white', fontWeight: 'bold' }}>Submit</Text>}
                </TouchableOpacity>
                {/* {accountCreationLoader === true ? (
          <ActivityIndicator color="white" style={{ position: 'relative', top: height * (-0.077) }} />
        ) : null} */}
            </ScrollView>
        </ScrollView>
    );
};

export default SetAdmin;

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'rgb(108, 99, 255)',
        height: height * 0.05,
        width: width * 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: width * (0.05),
        borderRadius: 10,
        marginVertical: 30,
    },
});
