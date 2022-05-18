import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';

const MyAppointments = () => {

    const [appointments, setAppointments] = useState([]);
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
  
    useEffect(() => {
        if (user) {
            fetch(`https://doctors-portal-server9.herokuapp.com/bookings?patientEmail=${user.email}`, {
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            .then(res => {
                if(res.status === 401 || res.status === 403){
                    signOut(auth);
                    localStorage.removeItem('accessToken');
                    navigate('/');
                    toast.success('Forbidden !', { duration: 2000, position: 'top-right' });
                }
                return res.json();
            })
            .then(data => {
                console.log(data);
                setAppointments(data)
            });
        }
    }, [user, navigate])

    return (
        <div>
           { appointments.length > 0 ? <> 
                <h2>My Appointments: {appointments.length}</h2>

                <div className="overflow-x-auto mt-10">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Serial</th>
                                <th>Name</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Treatment</th>
                                <th>Payment</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                appointments.map((appointment, index) =>  <tr key={appointment._id}>
                                    <th>{ index + 1 }</th>
                                    <td>{ appointment.patient }</td>
                                    <td>{ appointment.date }</td>
                                    <td>{ appointment.slot }</td>
                                    <td>{ appointment.treatment }</td>
                                    <td>{ 
                                    (appointment.price && !appointment.paid) &&  <Link to={`/dashboard/payment/${appointment._id}`}><button className='btn btn-xs btn-success text-white'>Payment</button></Link>}
                                    {(appointment.price && appointment.paid) &&  <span className='btn btn-xs btn-success text-white'>Paid</span>}
                                    </td>
                                </tr>)
                            }
                           
                        </tbody>
                    </table>
                </div>
                </> :  <h2>You have no appointments</h2>   
           }
        </div>
    );
};

export default MyAppointments;