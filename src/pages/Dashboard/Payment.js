import React from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Loading from '../Shared/Loading';

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

    console.log(appointment);

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

                    <div className="card flex-shrink-0 w-50 max-w-md shadow-2xl bg-base-100">
                        <div className="card-body">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;