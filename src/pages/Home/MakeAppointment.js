import React from 'react';
import doctorImg from '../../assets/images/doctor.png'
import appointment from '../../assets/images/appointment.png'
import PrimaryButton from '../Shared/PrimaryButton';

const MakeAppointment = () => {
    return (
        <section className='flex justify-center items-center my-40' style={{ 
            background: `url(${appointment})`
         }}>
            <div className='flex-1 hidden lg:block'>
                <img className='mt-[-150px]' src={ doctorImg } alt="" />
            </div>
            <div className='flex-1 p-8'>
                <h3 className='text-xl text-primary font-bold'>Appointment</h3>
                <h2 className='text-3xl text-white py-5'>Make an Appointment Today</h2>
                <p className='text-white pb-5'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Reprehenderit vitae illo sint nulla necessitatibus accusamus aperiam eveniet commodi ipsa nam nemo reiciendis doloribus aliquid quis, consequatur eius id atque assumenda!</p>
                <PrimaryButton name='Get Started' />
            </div>
        </section>
    );
};

export default MakeAppointment;