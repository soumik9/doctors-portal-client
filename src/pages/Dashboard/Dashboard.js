import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import useAdmin from '../../hooks/useAdmin';
import auth from '../../firebase.init';

const Dashboard = () => {

    const [user] = useAuthState(auth);
    const [admin] = useAdmin(user);

    return (
        <div className="drawer drawer-mobile">
            <input id="dashboardSidebar" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <h2 className='text-3xl font-bold text-purple-500'>Welcome to your Dashboard</h2>
                <Outlet />
            </div>
            <div className="drawer-side">
                <label htmlFor="dashboardSidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 overflow-y-auto w-48 bg-base-100 text-base-content">
                    {/* <!-- Sidebar content here --> */}
                    <li><Link to='/dashboard'>Dashboard</Link></li>
                    <li><Link to='/dashboard/review'>Review</Link></li>
                    <li><Link to='/dashboard/history'>History</Link></li>
                    {admin &&  <>
                        <li><Link to='/dashboard/users'>Users</Link></li>
                        <li><Link to='/dashboard/add-doctor'>Add Doctor</Link></li>
                    </>}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;