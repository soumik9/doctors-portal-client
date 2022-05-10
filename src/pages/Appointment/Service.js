import React from 'react';

const Service = ({ service, setTreatment }) => {

    const { name, slots } = service;

    return (
        <div className="card lg:max-w-lg bg-base-100 shadow-xl">
            <div className="card-body text-center">
                <h2 className="text-secondary text-3xl">{name}</h2>
                <p>
                    {slots.length ?
                        <span></span>
                        : <span className='text-red-500'>No Slot Available</span>
                    }
                </p>
                <p>{slots.length} {slots.length > 1 ? 'spaces' : 'space'} available</p>
                <div className="card-actions justify-center">
                    <label 
                        htmlFor="booking-modal" 
                        className="btn btn-secondary text-white uppercase"
                        disabled={slots.length === 0}
                        onClick={() => setTreatment(service)}
                    >open modal</label>
                </div>
            </div>
        </div>
    );
};

export default Service;