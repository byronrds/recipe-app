import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { useNavigate, Navigate } from "react-router-dom";

export const ProtectedRoute = ({ element }) => {
	// const { user } = useContext(AuthContext);
	const user = localStorage.getItem("user");
	const userJson = JSON.parse(user);
	const email = userJson.email;
	const navigate = useNavigate();

	if (!email) {
		return <Navigate to="/login" replace />;
	}
	return element;
};
