// src/components/Login.jsx
import React, { useState, useContext } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(null);
	const [isErrorLoggingIn, setErrorLoggingIn] = useState(false);
	const navigate = useNavigate();

	const { user, loginUser, logoutUser } = useContext(AuthContext);

	const handleLogin = async (e) => {
		e.preventDefault();
		const auth = getAuth();
		try {
			const response = await signInWithEmailAndPassword(auth, email, password);
			console.log(response);
			loginUser({ email: response.user.email });
			// Redirect to a protected route
			navigate("/");
		} catch (error) {
			setErrorLoggingIn(true);
			console.log("the error: ", error);
			console.dir("again: ", error);
			console.log("just message: ", error.message);
			setError(error.message);
		}
	};

	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={handleLogin}>
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
				<button type="submit">Login</button>
			</form>
			{/* {error && <p>{error}</p>} */}
			{isErrorLoggingIn && <p>Unlucky, try again</p>}
		</div>
	);
};
