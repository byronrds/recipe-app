import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	const loginUser = (userInfo) => {
		setUser(userInfo);
		localStorage.setItem("user", JSON.stringify(userInfo));
		console.log("stringified ", JSON.stringify(userInfo));
		console.log(localStorage.getItem("user"));
	};

	const logoutUser = () => {
		setUser(null);
		localStorage.removeItem("user");
		// console.log(localStorage);
	};

	return <AuthContext.Provider value={{ user, loginUser, logoutUser }}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
