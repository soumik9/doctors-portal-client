import React from 'react';
import { format } from 'date-fns';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import toast from 'react-hot-toast';

const BookingModal = ({ treatment, setTreatment, date }) => {

    const { _id, name, slots } = treatment;
    const [user] = useAuthState(auth);

    const formattedDate = format(date, 'PP');

    const handleBooking = event => {
        event.preventDefault();
        
        const slot = event.target.slot.value;

        const booking = {
            treatmentId: _id,
            treatment: name,
            date: formattedDate,
            slot,
            patient: user.displayName,
            patientEmail: user.email,
            mobile: event.target.mobile.value
        }

        fetch('https://doctors-portal-server9.herokuapp.com/booking', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
        .then(res => res.json())
        .then(data => {

            if(data.success){
                toast.success('Successfully booked!', { duration: 2000, position: 'top-right' });
            }else{
                toast.error(`Already have an appointment! ${data.booking?.date}`, { duration: 2000, position: 'top-right' });
            }
        })

        setTreatment(null);
    }

    return (
        <div>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg text-secondary text-center">Booking for: {name}</h3>

                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 justify-items-center mt-5'>
                        <input type="text" disabled value={format(date, 'PP')} className="input input-bordered w-full max-w-xs" name='date' />

                        <select name='slot' className="select select-bordered w-full max-w-xs">
                            {
                                slots.map((slot, index) => <option key={index} value={slot}>{ slot }</option>)
                            }
                        </select>

                        <input type="text" disabled placeholder="Your Name" name='name' className="input input-bordered w-full max-w-xs" value={user?.displayName} />

                        <input type="email" disabled placeholder="Your Email" name='email' className="input input-bordered w-full max-w-xs" value={user?.email} />

                        <input type="text" placeholder="Your Mobile Number"  name='mobile' className="input input-bordered w-full max-w-xs" />

                        <input type="submit" value='submit' className="btn btn-secondary text-white w-full max-w-xs" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;