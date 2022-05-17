import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import About from './pages/About/About';
import Appointment from './pages/Appointment/Appointment';
import AddDoctor from './pages/Dashboard/AddDoctor';
import Dashboard from './pages/Dashboard/Dashboard';
import MyAppointments from './pages/Dashboard/MyAppointments';
import MyHistory from './pages/Dashboard/MyHistory';
import MyReview from './pages/Dashboard/MyReview';
import Users from './pages/Dashboard/Users';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Login/Register';
import ResetPassword from './pages/Login/ResetPassword';
import Footer from './pages/Shared/Footer';
import Navbar from './pages/Shared/Navbar';
import RequiredAdmin from './pages/Shared/RequireAdmin';
import RequiredAuth from './pages/Shared/RequiredAuth';

function App() {
  return (
    <div className="max-w-7xl mx-auto">

      <Navbar />
      <Toaster />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/appointment" element={
            <RequiredAuth> <Appointment /> </RequiredAuth>
        } />

        {/* dashboard routes */}
        <Route path="/dashboard" element={
          <RequiredAuth> <Dashboard /> </RequiredAuth>
         }>  

          <Route index element={<MyAppointments />}></Route>
          <Route path='review' element={<MyReview />}></Route>
          <Route path='history' element={<MyHistory />}></Route>
          
          <Route path='users' element={<RequiredAdmin>
            <Users />
          </RequiredAdmin>}></Route>

          <Route path='add-doctor' element={<RequiredAdmin>
            <AddDoctor />
          </RequiredAdmin>}></Route>

        </Route>
        {/* dashboard routes */}
        
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<ResetPassword />} />
      </Routes>

      <Footer />

    </div>
  );
}

export default App;
