import React from 'react';
import { format } from 'date-fns';

const BookingModal = ({ treatment, date }) => {

    const { name, slots } = treatment;

    const handleBooking = event => {
        event.preventDefault();
    }

    return (
        <div>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-lg text-secondary text-center">Booking for: {name}</h3>

                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 justify-items-center mt-5'>
                        <input type="text" disabled value={format(date, 'PP')} className="input input-bordered w-full max-w-xs" name='date' />

                        <select name='slot' className="select select-bordered w-full max-w-xs">
                            {
                                slots.map((slot, index) => <option key={index} value={slot}>{ slot }</option>)
                            }
                        </select>

                        <input type="text" placeholder="Your Name" name='name' className="input input-bordered w-full max-w-xs" />

                        <input type="email" placeholder="Your Email" name='email' className="input input-bordered w-full max-w-xs" />

                        <input type="text" placeholder="Your Mobile Number"  name='mobile' className="input input-bordered w-full max-w-xs" />

                        <input type="submit" value='submit' className="btn btn-secondary text-white w-full max-w-xs" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;