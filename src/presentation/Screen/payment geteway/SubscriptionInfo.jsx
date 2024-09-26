import React, { useEffect, useState } from 'react';
import { Card, Text, Surface, Button, useTheme } from 'react-native-paper';
import { StyleSheet, View, ScrollView, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addSubscription, cancelSubscription, getSubscriptionStatus } from '../../../logic/redux/subscription/subscription';
import { useNavigation } from '@react-navigation/native';

function SubscriptionInfo() {
    const dispatch = useDispatch();
    const { subscriptionStatus } = useSelector((state) => state.subscription);
    const theme = useTheme();
    const navigation = useNavigation();
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = () => {
        setRefreshing(true);
        dispatch(getSubscriptionStatus());
        setRefreshing(false);
      };
      console.log(subscriptionStatus?.data)
    useEffect(() => {
        dispatch(getSubscriptionStatus());
    }, [dispatch]);
    const gotoPayment = () => {
        navigation.navigate('Payment');
    }
    // Helper function to convert timestamp to days

    return (
        <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <Surface style={styles.surface}>
                <Text style={styles.title}>Subscription Information</Text>

                <Card style={styles.card}>
                    <Card.Content>
                        <Text style={styles.label}>Subscription Status:</Text>
                        <Text style={styles.value}>{subscriptionStatus?.data?.[0] || 'N/A'}</Text>
                    </Card.Content>
                </Card>

                <Card style={styles.card}>
                    <Card.Content>
                        <Text style={styles.label}>Subscription Total Years:</Text>
                        <Text style={styles.value}>
                            {subscriptionStatus?.data?.[1] ? subscriptionStatus.data[1] + ' Years' : 'N/A'}
                        </Text>
                    </Card.Content>
                </Card>

                <Card style={styles.card}>
                    <Card.Content>
                        <Text style={styles.label}>Subscription Left Days:</Text>
                        <Text style={styles.value}>{subscriptionStatus?.data?.[2] + ' days' || 'N/A'}</Text>
                    </Card.Content>
                </Card>

                <Button
                    mode="contained"
                    onPress={() => {
                        gotoPayment()
                    }}
                    style={styles.button}
                    labelStyle={styles.buttonLabel}
                >
                    Add subscription
                </Button>
                <Button
                    mode="contained"
                    onPress={() => {
                        gotoPayment()
                    }}
                    style={styles.button}
                    labelStyle={styles.buttonLabel}
                >
                    Renew subscription
                </Button>
                <Button
                    mode="contained"
                    onPress={() => {
                        dispatch(cancelSubscription())
                    }}
                    style={styles.button}
                    labelStyle={styles.buttonLabel}
                >
                    Cancel subscription
                </Button>
            </Surface>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    surface: {
        padding: 20,
        elevation: 4,
        borderRadius: 10,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    card: {
        marginVertical: 10,
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#f0f0f0',
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#6200EE',
    },
    value: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    button: {
        marginTop: 20,
        paddingVertical: 8,
        borderRadius: 25,
    },
    buttonLabel: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default SubscriptionInfo;
