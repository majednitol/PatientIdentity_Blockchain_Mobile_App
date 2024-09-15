import React from 'react';

import { CardField, useStripe } from '@stripe/stripe-react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { StyleSheet,Button, View } from 'react-native';
import { Alert } from 'react-native';

const API_URL = 'http://192.168.0.101:3000';

function PaymentScreen() {
  const { confirmPayment } = useStripe();
  const [loading, setLoading] = React.useState(false);
  const [cardDetailsComplete, setCardDetailsComplete] = React.useState(false);

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`${API_URL}/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: 1000 }), // Amount in cents, e.g., $10.00
    });
    const { clientSecret } = await response.json();
    return clientSecret;
  };

  const handlePayPress = async () => {
    if (!cardDetailsComplete) {
      Alert.alert('Invalid Card', 'Please complete the card details.');
      return;
    }

    setLoading(true);
    const clientSecret = await fetchPaymentIntentClientSecret();
    const { error, paymentIntent } = await confirmPayment(clientSecret, {
      paymentMethodType: 'Card',
    });

    setLoading(false);

    if (paymentIntent) {
      Alert.alert('Payment succeeded', 'Your payment was successful.');
      console.log(paymentIntent)
    } else if (error) {
      setLoading(false);
      console.log('Payment failed', error.message);
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
          setCardDetailsComplete(cardDetails.complete);
        }}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Pay with Card"
          onPress={handlePayPress}
          color="#6200EE"
          disabled={!cardDetailsComplete || loading} // Disable button if card details are incomplete or loading
        />
      </View>
      {loading && <ActivityIndicator size="large" color="#6200EE" />}
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
