const express = require('express');
const Stripe = require('stripe');
const app = express();
const stripe = Stripe(
  'sk_test_51PsUlqAiNNIfYSMSiKBuUJs05EDFXTI4kHu0flOe4ZFAte5VCQ8nL4ENvsGcRfpZ6uMY8kupT5iTQSdeqPBq8slD00jxNokE7c',
)

app.use(express.json());

app.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body;
  console.log("getting payment intent")

  // Validate the amount
  if (!amount || typeof amount !== 'number' || amount <= 0) {
    return res.status(400).send({
      error: 'Invalid amount. Amount must be a positive number.',
    });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card'], // Specify other methods if needed
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).send({
      error: 'Failed to create payment intent. Please try again later.',
    });
  }
});
const test=(req,res,next) => {
  res.status(200).send({"hello world":"hhhhhhhhh"})
}
app.get('/test',test)

app.listen(3000, () => console.log('Server listening on port 3000'));
