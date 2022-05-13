import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import About from './pages/About/About';
import Appointment from './pages/Appointment/Appointment';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Login/Register';
import ResetPassword from './pages/Login/ResetPassword';
import Footer from './pages/Shared/Footer';
import Navbar from './pages/Shared/Navbar';
import RequiredAuth from './pages/Shared/RequiredAuth';

function App() {
  return (
    <div className="max-w-7xl mx-auto">

      <Navbar />
      <Toaster />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/appointment" element={
            <RequiredAuth>
              <Appointment />
            </RequiredAuth>
        } />
        
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
