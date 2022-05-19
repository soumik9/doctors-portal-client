import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Loading from '../Shared/Loading';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51L0j9AGllMoN5o7HOO5UP7g2ynWBYo6G7mQ0UkCow6eFHW2Cc9PGLwcUhdVlft1rD3CWf5SjOQCniUm4YWw50fJQ00aFDtxuHb');

const Payment = () => {

    const { appointmentId } = useParams();

    const url = `https://doctors-portal-server9.herokuapp.com/booking/${appointmentId}`;

    const { data: appointment, isLoading } = useQuery(['booking', appointmentId], () => fetch(url, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
    .then(res => res.json()));

    if (isLoading) return <Loading />

    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">

                    <div className="card flex-shrink-0 w-50 max-w-md shadow-2xl bg-base-100">
                        <div className="card-body">
                            <h2 className="text-success font-bold">Hello, {appointment.patient}</h2>
                            <h2 className="card-title">Pay for {appointment.treatment}</h2>
                            <p>Your appointment <span className='text-orange-700'>{appointment.date} at {appointment.slot}</span> </p>
                            <p>Please pay: <span className='text-orange-700'>{appointment.price} BDT</span> </p>
                        </div>
                    </div>

                    <div className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100">
                        <div className="card-body">

                            <Elements stripe={stripePromise}>
                                <CheckoutForm
                                    appointment={appointment}
                                />
                            </Elements>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;