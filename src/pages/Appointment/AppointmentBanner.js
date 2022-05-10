import React from 'react';
import appointmentBannerImg from '../../assets/images/chair.png'
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const AppointmentBanner = ({ date, setDate }) => {

  

    return (
        <div class="hero min-h-screen">
            <div class="hero-content flex-col lg:flex-row-reverse gap-5">
                <img src={appointmentBannerImg} alt='' class="max-w-lg rounded-lg shadow-2xl" />
                <div>
                    <DayPicker
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                     />
                </div>
            </div>
            {/* <p>Selected date: {format(date, 'PP')}</p> */}
        </div>
    );
};

export default AppointmentBanner;