import { Route, Routes } from 'react-router-dom';
import './App.css';
import About from './pages/About/About';
import Appointment from './pages/Appointment/Appointment';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Login/Register';
import Footer from './pages/Shared/Footer';
import Navbar from './pages/Shared/Navbar';

function App() {
  return (
    <div className="max-w-7xl mx-auto">

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      <Footer />

    </div>
  );
}

export default App;
