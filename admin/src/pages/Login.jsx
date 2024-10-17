import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
	const [state, setState] = useState('Admin');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { setAToken, backendUrl } = useContext(AdminContext);
	const onSubmitHandler = async (event) => {
		event.preventDefault();
		try {
			if (state === 'Admin') {
				const { data } = await axios.post(backendUrl + '/api/admin/login', {
					email,
					password,
				});
				if (data.success) {
					localStorage.setItem('aToken', data.token);
					setAToken(data.token);
				} else {
					toast.error(data.message);
				}
			} else {
			}
		} catch (error) {}
	};
	return (
		<form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
			<div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
				<p className='text-2xl font-semibold m-auto'>
					<span className='text-primary'>{state}</span> Login
				</p>
				<div className='w-full'>
					<p>Email</p>
					<input
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className='border border-[#DADADA] rounded w-full p-2 mt-1'
						type='email'
						required
					/>
				</div>
				<div className='w-full'>
					<p>Password</p>
					<input
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className='border border-[#DADADA] rounded w-full p-2 mt-1'
						type='password'
						required
					/>
				</div>
				<button className='bg-primary w-full text-white py-2 rounded-md text-base'>
					Login
				</button>
				{state === 'Admin' ? (
					<p>
						Doctor Login{' '}
						<span
							className='text-primary underline cursor-pointer'
							onClick={() => setState('Doctor')}>
							Click Here
						</span>
					</p>
				) : (
					<p>
						Admin Login{' '}
						<span
							className='text-primary underline cursor-pointer'
							onClick={() => setState('Admin')}>
							Click Here
						</span>
					</p>
				)}
			</div>
		</form>
	);
};

export default Login;
