import React, { useEffect, useState, useContext } from "react";
import { v4 as uuidv4 } from "uuid"; // Import uuidv4
import { FavoriteCard } from "../components/FavoriteCard";
import { RecipesContext } from "../components/RecipesContext.jsx";
import axios from "axios";
import { AriaNav} from "../components/AriaNav.jsx";
import { Flex, Text, Avatar, Card, Box, Button } from "@radix-ui/themes";

export const EdamamRecipes = () => {
	const { edamamRecipes, updateEdamamRecipes } = useContext(RecipesContext);
	const getLunchRecipes = async () => {
		try {
			const response = await axios.get("http://localhost:5001/recipes/lunch")
			console.log("Lunch recipes: ", response.data);

			const recipesArray = response.data.hits.map((recipe, index) => ({
				...recipe,
					isEdamam: true
			}))
			updateEdamamRecipes(recipesArray)
		}
		catch (error) {
			console.error("Error calling /recipes/lunch Express route: ", error)
		}
	};

	useEffect(() => {
		if (edamamRecipes.length < 1) {
			getLunchRecipes();
		}
	}, []);

	return (
		<div>
			<AriaNav/>
				<h1>Official Recipes</h1>
				<button onClick={() => getLunchRecipes()}>See More</button>


			<div>
				<h1>Donut</h1>
				{edamamRecipes.map((recipe, index) => (
					<FavoriteCard
						key={index}
						calories={recipe.recipe.calories}
						id="1"
						image={recipe.recipe.image}
						ingredientLines={recipe.recipe.ingredientLines}
						source={recipe.recipe.source}
						label={recipe.recipe.label}
						uri={recipe.recipe.uri}
						fromEdamam={recipe.fromEdamam}
					/>
				))}
			</div>
		</div>
	);
};
