import React from 'react';
import { useQuery } from 'react-query';
import Loading from '../Shared/Loading';
import UserRow from './UserRow';

const Users = () => {

    const { data: users, isLoading, refetch } = useQuery('users', () => fetch('https://doctors-portal-server9.herokuapp.com/users', {
        method: 'GET',
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));

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
                                    <th>Action</th>
                                    <th>Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    users.map((user, index) => <UserRow
                                        key={index}
                                        index={index}
                                        user={user}
                                        refetch={refetch}
                                    />)
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