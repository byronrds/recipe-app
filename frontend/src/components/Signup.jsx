// src/components/Signup.jsx
import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const handleSignup = async (e) => {
		e.preventDefault();
		const auth = getAuth();
		try {
			const response = await createUserWithEmailAndPassword(auth, email, password);
			console.log(response);
			// Redirect to a protected route
			navigate("/");
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<div>
			<h2>Sign Up</h2>
			<form onSubmit={handleSignup}>
				<input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<button type="submit">Sign Up</button>
			</form>
			{error && <p>{error}</p>}
		</div>
	);
};
