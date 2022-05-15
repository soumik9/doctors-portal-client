import React from 'react';
import toast from 'react-hot-toast';

const UserRow = ({ user, index, refetch }) => {

    const { email, role } = user;

    const handleAdmin = () => {
        fetch(`https://doctors-portal-server9.herokuapp.com/user/admin/${email}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res => {
            if(res.status === 403){
                toast.error('You have not the access');
            }
            return res.json()
        })
        .then(data => {
            if(data.modifiedCount > 0){
                refetch();
                toast.success('Successfully made an Admin!', { duration: 2000, position: 'top-right' });
            }
        })
    }

    return (
        <tr>
            <th>{index + 1}</th>
            <td>{user.email}</td>
            <td>{ role !== 'admin' ? <button class="btn btn-xs" onClick={handleAdmin}>Make Admin</button> :  <button class="btn btn-xs" disabled>Admin</button>}</td>
            <td><button class="btn btn-xs">Remove User</button></td>
        </tr>
    );
};

export default UserRow;