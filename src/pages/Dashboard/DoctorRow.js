import React from 'react';

const DoctorRow = ({ doctor, index }) => {

    const {img, name, speciality} = doctor;

    return (
        <tr>
            <th>{index + 1}</th>
            <td><img src={img} width='50' alt="" /></td>
            <td>{name}</td>
            <td>{speciality}</td>
            <td><button class="btn btn-error btn-xs text-white">Delete</button></td>
        </tr>
    );
};

export default DoctorRow;