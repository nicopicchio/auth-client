import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';

export default function App() {
	console.log('rendering app')
	const [body, setBody] = useState({
		username: '',
		password: '',
	});

	const onInputChange = (e) => {
		setBody({ ...body, [e.target.name]: e.target.value });
	};

	const onFormSubmit = (e) => {
		e.preventDefault();
		fetch('http://localhost:4000/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		})
			.then((res) => res.json())
			.then((jsonResponse) => console.log(jsonResponse));
	};

	return (
		<div id='container'>
			<h1>Register</h1>
			<form onSubmit={onFormSubmit}>
				<input
					type='text'
					id='username'
					name='username'
					placeholder='Username'
					value={body.username}
					onChange={onInputChange}
				/>
				<br />
				<input
					type='password'
					id='password'
					name='password'
					placeholder='Password'
					value={body.password}
					onChange={onInputChange}
				/>
				<br />
				<input type='submit' value='Sign up!' />
			</form>
			<p>Already registered?</p>
			<p className='login-link'>Login</p>
		</div>
	);
}
