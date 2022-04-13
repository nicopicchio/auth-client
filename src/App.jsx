import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';

const initialBodyState = {
	username: '',
	password: '',
};

export default function App() {
	const [body, setBody] = useState(initialBodyState);
	const [newUser, setNewUser] = useState();
	const [isLogin, setIsLogin] = useState(false);

	const onInputChange = (e) => {
		setBody({ ...body, [e.target.name]: e.target.value });
	};

	const loadLoginForm = () => {
		setIsLogin(!isLogin);
	};

	const registerFetch = () => {
		fetch('http://localhost:4000/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		})
			.then((res) => res.json())
			.then((jsonResponse) =>
				setNewUser(`Welcome onboard, ${jsonResponse.registeredUser.username}`)
			)
			.then(setBody(initialBodyState))
			.catch((err) => {
				setNewUser('Something went wrong!');
			});
	};

	const loginFetch = () => {
		fetch('http://localhost:4000/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		})
			.then((res) => res.json())
			.then((jsonResponse) => {
				if (jsonResponse === 'Access denied!') {
					setNewUser('Invalid username or password!')
				} else
				setNewUser(`User token is: ${jsonResponse.token}`)
			})
			.then(setBody(initialBodyState))
			.catch((err) => {
				setNewUser('Something went wrong!');
			});
	}

	const onFormSubmit = (e) => {
		e.preventDefault();
		if (!isLogin) {
			registerFetch()
		} else
		loginFetch()
	};

	return (
		<>
			<div id='container'>
				<h1>
					{!isLogin && 'Register'}
					{isLogin && 'Login'}
				</h1>
				<form onSubmit={onFormSubmit}>
					<input
						type='text'
						id='username'
						name='username'
						placeholder='Username'
						value={body.username}
						onChange={onInputChange}
						required
					/>
					<br />
					<input
						type='password'
						id='password'
						name='password'
						placeholder='Password'
						value={body.password}
						onChange={onInputChange}
						required
					/>
					<br />
					<input type='submit' />
				</form>
				<p>Already registered?</p>
				<p className='login-link' onClick={loadLoginForm}>
					Login
				</p>
			</div>
			<div>{newUser && <p className='registration-message'>{newUser}</p>}</div>
		</>
	);
}
