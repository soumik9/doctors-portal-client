import React from 'react';

const Service = ({ service }) => {

    const { name, slots } = service;

    return (
        <div class="card lg:max-w-lg bg-base-100 shadow-xl">
            <div class="card-body text-center">
                <h2 class="text-secondary text-3xl">{ name }</h2>
                <p>
                    {slots.length ? 
                        <span></span>
                        : <span className='text-red-500'>No Slot Available</span>
                    }
                 </p>
                <p>{ slots.length } {slots.length > 1 ? 'spaces' : 'space' } available</p>
                <div class="card-actions justify-center">
                    <button class="btn btn-secondary text-white uppercase" disabled={ slots.length === 0 }>Book Appointment</button>
                </div>
            </div>
        </div>
    );
};

export default Service;