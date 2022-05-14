import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';

const Users = () => {

    const { data: users, isLoading } = useQuery('users', () => fetch('https://doctors-portal-server9.herokuapp.com/users').then(res => res.json()));

    if (isLoading) return <Loading />

    return (
        <div>
            {
                users.length ? <>
                    <h2 className='text-2xl'>Users {users.length}</h2>
                    <div className="overflow-x-auto mt-10">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>Serial</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((user, index) => <tr key={user._id}>
                                        <th>{index + 1}</th>
                                        <td>{user.email}</td>
                                    </tr>)
                                }

                            </tbody>
                        </table>
                    </div>

                </> : <h2 className='text-2xl'>No user is there</h2>
            }

        </div>
    );
};

export default Users;