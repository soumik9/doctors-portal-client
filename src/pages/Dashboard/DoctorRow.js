import React from 'react';
import toast from 'react-hot-toast';

const DoctorRow = ({ doctor, index, refetch }) => {

    const {img, email, name, speciality} = doctor;

    const handleDoctorDelete = (email) => {
        fetch(`https://doctors-portal-server9.herokuapp.com/doctor/${email}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res =>  res.json())
        .then(data => {
            if(data.deletedCount){
                toast.success(`${name} doctor deleted!`, { duration: 2000, position: 'top-right' });
                refetch();
            }
        })
     
    }

    return (
        <tr>
            <th>{index + 1}</th>
            <td><img className='rounded' src={img} width='50' alt={name} /></td>
            <td>{name}</td>
            <td>{speciality}</td>
            <td><button class="btn btn-error btn-xs text-white" onClick={() => handleDoctorDelete(email)}>Delete</button></td>
        </tr>
    );
};

export default DoctorRow;