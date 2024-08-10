import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { Chatbot } from "./Chatbot";
import { useLocation } from "react-router-dom";

export const RecipeDetail = () => {
	const { recipeID } = useParams();
	// const [recipe, setRecipe] = useState(null);
	const [loading, setLoading] = useState(true);
	console.log("hit");

	const location = useLocation();
	const recipe = location.state?.recipe;
	console.log("should be here", recipe);

	if (!recipe) {
		return <p>No recipe found</p>;
	}

	// useEffect(() => {
	// 	const fetchRecipe = async () => {
	// 		try {
	// 			const docRef = doc(db, "all-recipes", recipeID);
	// 			const docSnap = await getDoc(docRef);

	// 			if (docSnap.exists()) {
	// 				setRecipe({ id: docSnap.id, ...docSnap.data() });
	// 			} else {
	// 				console.log("No such document!");
	// 			}
	// 		} catch (error) {
	// 			console.error("Error fetching recipe: ", error);
	// 		} finally {
	// 			setLoading(false);
	// 		}
	// 	};

	// 	fetchRecipe();
	// }, [recipeID]);

	// if (loading) {
	// 	return <p>Loading recipe...</p>;
	// }

	// if (!recipe) {
	// 	return <p>No recipe found</p>;
	// }

	const user = localStorage.getItem("user");
	const jsonUser = JSON.parse(user);
	const email = jsonUser.email;

	const userObjForFirestore = {
		calories: recipe.calories,
		ingredientLines: recipe.ingredientLines,
		source: recipe.source,
		label: recipe.label,
		fromEdamam: recipe.fromEdamam,
	};

	const edamamObjForFirestore = {
		edamamURI: recipe.uri,
		fromEdamam: recipe.fromEdamam,
	};

	const addUserRecipe = async () => {
		try {
			console.log("Da Object: ", userObjForFirestore);
			const docRef = await addDoc(collection(db, `${email}-recipes`), userObjForFirestore);
			console.log("Document written with ID: ", docRef.id);
		} catch (e) {
			console.error("Error adding document: ", e);
		}
	};

	const addEdamamRecipe = async () => {
		try {
			console.log("Da Object: ", edamamObjForFirestore);
			const docRef = await addDoc(collection(db, `${email}-recipes`), edamamObjForFirestore);
			console.log("Document written with ID: ", docRef.id);
		} catch (e) {
			console.error("Error adding document: ", e);
		}
	};

	const saveRecipe = () => {
		if (recipe.fromEdamam === true) {
			addEdamamRecipe();
		} else {
			addUserRecipe();
		}
	};

	return (
		<div>
			<div style={{ margin: "20px" }}>
				<div>
					<h1>{recipe.label}</h1>
					<h3>Ingredients:</h3>
					<ul>
						{recipe.ingredientLines.map((ingredient, index) => (
							<li key={index}>{ingredient}</li>
						))}
					</ul>
					<img src={recipe.image} alt={recipe.label} />
					<p>Calories: {recipe.calories}</p>
					<p>Source: {recipe.source}</p>
				</div>
				<div>
					<button onClick={() => saveRecipe()}>Save</button>
				</div>
				<div>
					<Chatbot ingredientLines={recipe.ingredientLines} />
				</div>
			</div>
		</div>
	);
};
