import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import BookingModal from './BookingModal';
import Service from './Service';

const AvailableAppointments = ({ date }) => {
    
    const [services, setServices] = useState([]);
    const [treatment, setTreatment] = useState(null);

    useEffect( () => {
        fetch('https://doctors-portal-server9.herokuapp.com/services')
        .then(res => res.json())
        .then(data => setServices(data));
    }, [])

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
                />
            }
        </section>
    );
};

export default AvailableAppointments;