import { format } from 'date-fns';
import React, { useState } from 'react';
import { useQuery } from 'react-query'
import BookingModal from './BookingModal';
import Service from './Service';
import Loading from '../Shared/Loading'

const AvailableAppointments = ({ date }) => {
    
    const [treatment, setTreatment] = useState(null);
    const formattedDate = format(date, 'PP');

    const { data: services, isLoading, refetch } = useQuery(['available', formattedDate], () => 
        fetch(`https://doctors-portal-server9.herokuapp.com/available?date=${formattedDate}`)
        .then(res => res.json())
    )

    if(isLoading) return <Loading />

    return (
        <section className='my-20'>
            <h4 className='text-xl text-center text-secondary'>Available Appointment On { format(date, 'PP') }</h4>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    services.map(service => <Service
                            key={service._id}
                            service={service}
                            setTreatment={setTreatment}
                        />)
                }
            </div>

            {
                treatment && <BookingModal 
                    treatment={treatment} 
                    setTreatment={setTreatment} 
                    date={date} 
                    refetch={refetch} 
                />
            }
        </section>
    );
};

export default AvailableAppointments;