import './App.css';

export default function App() {
	return (
		<div id='container'>
			<h1>User login</h1>
			<form>
				<input
					type='text'
					id='username'
					name='username'
					placeholder='Username'
				/>
				<br />
				<input
					type='password'
					id='username'
					name='username'
					placeholder='Password'
				/>
				<br />
				<input type='submit' value='Login' />
			</form>
		</div>
	);
}
