import React from 'react';
import InfoCard from './InfoCard';
import clockImg from '../../assets/icons/clock.svg'
import markerImg from '../../assets/icons/marker.svg'
import phoneImg from '../../assets/icons/phone.svg'

const Info = () => {
    return (
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-5'>
            <InfoCard title='Opening Hours' bgClass=' bg-gradient-to-r from-secondary to-primary' img={clockImg} />
            <InfoCard title='Our Locations' bgClass='bg-accent' img={markerImg} />
            <InfoCard title='Contact Us' bgClass=' bg-gradient-to-r from-secondary to-primary' img={phoneImg} />
        </div>
    );
};

export default Info;