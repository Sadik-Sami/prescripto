import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
const Login = () => {
	const { token, setToken, backendUrl } = useContext(AppContext);
	const [state, setState] = useState('Sign Up');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [name, setName] = useState('');
	const onSubmitHandler = async (event) => {
		event.preventDefault();
		try {
			if (state === 'Sign Up') {
				const { data } = await axios.post(`${backendUrl}/api/user/register`, {
					name,
					email,
					password,
				});
				if (data.success) {
					localStorage.setItem('token', data.token);
					setToken(data.token);
					toast.success('Account created successfully');
				} else {
					toast.error(data.message);
				}
			} else {
				const { data } = await axios.post(`${backendUrl}/api/user/login`, {
					name,
					email,
					password,
				});
				if (data.success) {
					localStorage.setItem('token', data.token);
					setToken(data.token);
					toast.success('Login successful');
				} else {
					toast.error(data.message);
				}
			}
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	};

	return (
		<form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
			<div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
				<p className='text-2xl font-semibold'>
					{state === 'Sign Up' ? 'Create Account' : 'Login'}
				</p>
				<p>
					Please {state === 'Sign Up' ? 'sign up' : 'Login'} to book
					appointments
				</p>
				{state === 'Sign Up' && (
					<div className='w-full'>
						<p>Full Name</p>
						<input
							className='border border-zinc-300 rounded p-2 mt-1 w-full'
							type='text'
							onChange={(e) => setName(e.target.value)}
							value={name}
							required
						/>
					</div>
				)}

				<div className='w-full'>
					<p>Email</p>
					<input
						className='border border-zinc-300 rounded p-2 mt-1 w-full'
						type='email'
						onChange={(e) => setEmail(e.target.value)}
						value={email}
						required
					/>
				</div>
				<div className='w-full'>
					<p>Password</p>
					<input
						className='border border-zinc-300 rounded p-2 mt-1 w-full'
						type='password'
						onChange={(e) => setPassword(e.target.value)}
						value={password}
						required
					/>
				</div>
				<button
					type='submit'
					className='w-full bg-primary text-white rounded-md py-2 text-base'>
					{state === 'Sign Up' ? 'Create Account' : 'Login'}
				</button>
				{state === 'Sign Up' ? (
					<p>
						Already have an account?{' '}
						<span
							onClick={() => setState('Login')}
							className='text-primary underline cursor-pointer'>
							Login here
						</span>
					</p>
				) : (
					<p>
						Create a new account?{' '}
						<span
							onClick={() => setState('Sign Up')}
							className='text-primary underline cursor-pointer'>
							click here
						</span>
					</p>
				)}
			</div>
		</form>
	);
};

export default Login;
