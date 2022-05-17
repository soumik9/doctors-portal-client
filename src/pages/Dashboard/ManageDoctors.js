import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import DoctorRow from './DoctorRow';

const ManageDoctors = () => {
    
    const { data: doctors, isLoading } = useQuery('doctors', () => fetch('https://doctors-portal-server9.herokuapp.com/doctor', {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));

    if (isLoading) return <Loading />


    return (
        <div>
        {
            doctors.length ? <>
                <h2 className='text-2xl'>Manage Doctors: {doctors.length}</h2>
                <div className="overflow-x-auto mt-10">
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Serial</th>
                                <th>Avatar</th>
                                <th>Name</th>
                                <th>Speciality</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                doctors.map((doctor, index) => <DoctorRow 
                                    key={doctor._id}
                                    index={index}
                                    doctor={doctor}
                                />)
                            }

                        </tbody>
                    </table>
                </div>

            </> : <h2 className='text-2xl'>No doctor is there</h2>
        }

    </div>
    );
};

export default ManageDoctors;