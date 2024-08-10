import React, { useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import { AriaNav } from "../components/AriaNav";
import { FavoriteCard } from "../components/FavoriteCard";

import { useNavigate } from "react-router-dom";
import { Box, Text } from "@radix-ui/themes";

export const Recipes = () => {
	const navigate = useNavigate();

	const handleOfficialRecipesClick = () => {
		navigate("/official-recipes");
	};

	const handleUserGeneratedRecipesClick = () => {
		navigate("/user-recipes");
	};

	return (
		<div>
			<AriaNav />
			<div className="gimme-space">
				<h1>Recipes</h1>

				<div style={styles.container}>
					<Box style={{ ...styles.circle }} onClick={handleOfficialRecipesClick}>
						<Text style={styles.text}>Official Recipes</Text>
					</Box>
					<Box style={{ ...styles.circle }} onClick={handleUserGeneratedRecipesClick}>
						<Text style={styles.text}>User-Generated Recipes</Text>
					</Box>
				</div>
			</div>
		</div>
	);
};

const styles = {
	container: {
		display: "flex",
		justifyContent: "flex-start",
		height: "100vh",
		gap: "50px",
	},
	circle: {
		width: "300px",
		height: "300px",
		borderRadius: "50%",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		cursor: "pointer",
		border: "5px solid black",
		transition: "transform 0.3s, background-color 0.3s",
	},
	text: {
		color: "black",
		fontSize: "24px",
		textAlign: "center",
	},
};
