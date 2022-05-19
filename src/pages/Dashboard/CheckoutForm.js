import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const CheckoutForm = ({appointment}) => {

    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [success, setSuccess] = useState('');
    const [transactionId, setTransactionId] = useState('');

    const [clientSecret, setClientSecret] = useState('');

    const {price, patient, patientEmail} = appointment

    useEffect( () => {
        fetch('https://doctors-portal-server9.herokuapp.com/create-payment-intent',{
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({price})
        })
        .then(res => res.json())
        .then(data => {
            if(data?.clientSecret){
                setClientSecret(data.clientSecret);
            }
        })
    }, [price])


    const handlePaymentSubmit = async (event) => {
        event.preventDefault();

        if(!stripe || !elements){ return; }

        const card = elements.getElement(CardElement);
        if (card == null) { return; }

        const {error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        setCardError(error?.message || '');
        setSuccess('');

        // confirm payment
        const {paymentIntent, error: intentError} = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                  name: patient,
                  email: patientEmail,
                },
              },
            },
          );

          if(intentError){
              setSuccess('');
              setCardError(intentError?.message)
          }else{
              console.log(paymentIntent);
              setTransactionId(paymentIntent.id);
              setSuccess('Payment Completed!');
              toast.success('Payment Completed!', { duration: 2000, position: 'top-right' });
          }
    }

    return (
       <>
        <form onSubmit={handlePaymentSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button type="submit" className='btn btn-succes mt-5' disabled={!stripe || !clientSecret}>
                Pay
            </button>
        </form>

        {
            cardError && <p className='text-red-500'>{cardError}</p>
        }
        {
            success && <div className='text-green-500'>
                    <p>{success} </p> 
                    <p>Your transaction id: {transactionId} </p> 
                </div>
        }
       </>
    );
};

export default CheckoutForm;