import React from 'react';

import { CardField, useStripe } from '@stripe/stripe-react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { StyleSheet, Button, View } from 'react-native';
import { Alert } from 'react-native';
import { addSubscription } from '../../../logic/redux/subscription/subscription';
import { useDispatch, useSelector } from 'react-redux';

const API_URL = 'http://192.168.174.59:3000';

function PaymentScreen() {
  const { confirmPayment } = useStripe();
  const [loading, setLoading] = React.useState(false);
  const [cardDetailsComplete, setCardDetailsComplete] = React.useState(false);
  const dispatch = useDispatch();
  const { addsubscription } = useSelector((state) => state.subscription);

  // Check if subscription has error
  // if (addsubscription?.error) {
  //   console.log('Subscription error:', addsubscription.error);
  // }

  const fetchPaymentIntentClientSecret = async () => {
    try {
      console.log("Fetching payment intent...");
      const response = await fetch(`${API_URL}/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: 1000 }), // Amount in cents, e.g., $10.00
      });
      const data = await response.json();
      console.log("Payment Intent Response:", data);

      // Check if clientSecret is present
      if (!data.clientSecret) {
        console.log('Error: clientSecret missing from response');
        return null;
      }
      console.log(data.clientSecret)
      return data.clientSecret;
    } catch (error) {
      console.error('Error fetching clientSecret:', error);
      return null;
    }
  };

  const handlePayPress = async () => {
    if (!cardDetailsComplete) {
      Alert.alert('Invalid Card', 'Please complete the card details.');
      return;
    }

    setLoading(true);
    const clientSecret = await fetchPaymentIntentClientSecret();

    if (!clientSecret) {
      setLoading(false);
      Alert.alert('Error', 'Failed to fetch payment client secret.');
      return;
    }

    try {
      console.log("Client Secret Received:", clientSecret);

      const { error, paymentIntent } = await confirmPayment(clientSecret, {
        paymentMethodType: 'Card',
      });

      setLoading(false);

      if (paymentIntent) {
        console.log('Payment succeeded:', paymentIntent);
        Alert.alert('Payment succeeded', 'Your payment was successful.');
        const transaction = paymentIntent.id
        dispatch(addSubscription({ transaction }));
      } else if (error) {
        console.log('Payment failed:', error.message);
        Alert.alert('Payment failed', error.message);
      }
    } catch (error) {
      setLoading(false);
      console.log('Unexpected error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <CardField
        postalCodeEnabled={true}
        placeholder={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={styles.cardStyle}
        style={styles.cardField}
        onCardChange={(cardDetails) => {
          console.log('Card Details:', cardDetails);
          if (cardDetails) {
            setCardDetailsComplete(cardDetails.complete);
          }
        }}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Pay with Card"
          onPress={handlePayPress}
          color="#6200EE"
          disabled={!cardDetailsComplete || loading || addsubscription.loading}
        />
      </View>
      {loading || addsubscription.loading && <ActivityIndicator size="large" color="#6200EE" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#6200EE',
  },
  cardStyle: {
    backgroundColor: '#FFFFFF',
    textColor: '#000000',
  },
  cardField: {
    width: '100%',
    height: 50,
    marginVertical: 30,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
  },
  buttonContainer: {
    marginVertical: 10,
  },
});

export default PaymentScreen;
