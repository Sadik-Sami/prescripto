import React, { useContext, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import About from './pages/About';
import Contact from './pages/Contact';
import MyProfile from './pages/MyProfile';
import MyAppointments from './pages/MyAppointments';
import Appointment from './pages/Appointment';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContext } from './context/AppContext';

const App = () => {
	const { token } = useContext(AppContext);

	// Changing the path to '/' if the user is already logged in
	const navigate = useNavigate();
	const location = useLocation();
	const path = location.pathname;
	useEffect(() => {
		if (token && path === '/login') {
			navigate('/');
		}
	}, [token, path, navigate]);

	return (
		<div className='mx-4 sm:mx-[10%]'>
			<ToastContainer />
			<Navbar />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/doctors' element={<Doctors />} />
				<Route path='/doctors/:speciality' element={<Doctors />} />
				<Route path='/about' element={<About />} />
				<Route path='/contact' element={<Contact />} />
				<Route path='/my-profile' element={<MyProfile />} />
				<Route path='/my-appointments' element={<MyAppointments />} />
				<Route path='/appointment/:docId' element={<Appointment />} />
				<Route path='/login' element={token ? <Home /> : <Login />} />
			</Routes>
			<Footer />
		</div>
	);
};

export default App;
