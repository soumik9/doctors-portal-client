import React from 'react';
import Service from './Service';
import fluorideImg from '../../assets/images/fluoride.png'
import cavityImg from '../../assets/images/cavity.png'
import whiteningImg from '../../assets/images/whitening.png'

const Services = () => {

    const services = [
        {
            _id: 1,
            name: 'Fluoride Treatment',
            description: '',
            img: fluorideImg
        },
        {
            _id: 2,
            name: 'Cavity Filling',
            description: '',
            img: cavityImg
        },
        {
            _id: 3,
            name: 'Teeth whitening',
            description: '',
            img: whiteningImg
        },
    ]

    return (
        <div className='my-20'>
            <div className="text-center">
                <h3 className='text-primary text-xl font-bold uppercase'>Our Services</h3>
                <h2 className='text-4xl'>Services We Provide</h2>
            </div>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-10'>
                {
                    services.map(service => <Service
                        key={service._id}
                        service={service}
                    />)
                }
            </div>
        </div>
    );
};

export default Services;