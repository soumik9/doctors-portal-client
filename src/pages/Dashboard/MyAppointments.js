import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const MyAppointments = () => {

    const [appointments, setAppointments] = useState([]);
    const [user] = useAuthState(auth);
    console.log(user.email)
    useEffect(() => {
        if (user) {
            fetch(`https://doctors-portal-server9.herokuapp.com/booking?patientEmail=${user.email}`)
                .then(res => res.json())
                .then(data => setAppointments(data));
        }
    }, [user])

    return (
        <div>
            <h2>My Appointments: {appointments.length}</h2>

            <div class="overflow-x-auto">
                <table class="table w-full">
                    <thead>
                        <tr>
                            <th>Serial</th>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Treatment</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            appointments.map((appointment, index) =>  <tr>
                                <th>{ index + 1 }</th>
                                <td>{ appointment.patient }</td>
                                <td>{ appointment.date }</td>
                                <td>{ appointment.slot }</td>
                                <td>{ appointment.treatment }</td>
                            </tr>)
                        }
                       
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAppointments;