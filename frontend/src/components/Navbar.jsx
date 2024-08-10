import { Link } from "react-router-dom";
import "../styles/App.css";

export const Navbar = () => {
	return (
		<div className="navbar">
			<Link to={"/"}>Home</Link>
			<Link to={"/recipes"}>Recipes</Link>
			<Link to={"/user-recipes"}>User Recipes</Link>
			<Link to={"/myrecipes"}>My Recipes</Link>
			<Link to={"/message"}>Message</Link>
			<Link to={"/account"}>Account</Link>
		</div>
	);
};
