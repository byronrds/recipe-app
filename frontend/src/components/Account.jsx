import React, { useContext, useState, useEffect } from 'react';
import { AriaNavbar } from './AriaNavbar';
import { AuthContext } from './AuthContext';
import { Navigate } from 'react-router-dom';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import { FavoriteCard } from './FavoriteCard';

export const Account = () => {
	const user = localStorage.getItem('user');
	if (user === null) {
		return <Navigate to='/login' replace />;
	}
	const userJson = JSON.parse(user);
	const email = userJson.email;

	const { logoutUser } = useContext(AuthContext);

	const [savedUserRecipes, setSavedUserRecipes] = useState([]);
	const [savedEdamamRecipes, setSavedEdamamRecipes] = useState([]);
	const [edamamAllFields, setEdamamAllFields] = useState([]);

	// const fetchRandomRecipes = async () => {
	// 	const app_id = "b24f5f1f"; // Replace with your app_id
	// 	const app_key = "3c26a1c7d5ecaec7afac077c2fc3e348"; // Replace with your app_key
	// 	const query = "chicken"; // Optional, you can change or remove it

	// 	const url = `https://api.edamam.com/api/recipes/v2?type=public&random=true&q=${query}&app_id=${app_id}&app_key=${app_key}`;

	// 	try {
	// 		const response = await fetch(url);
	// 		const data = await response.json();
	// 		console.log(data);
	// 		// Add a unique ID to each recipe
	// 		const recipesWithId = data.hits.map((recipe) => ({
	// 			...recipe,
	// 			id: uuidv4(),
	// 			fromEdamam: true,
	// 		}));

	// 		console.log("recipes with id", recipesWithId);

	// 		updateEdamamRecipes(recipesWithId); // Adjust according to the API response structure
	// 	} catch (error) {
	// 		console.error("Error fetching the recipes:", error);
	// 	}
	// };
	const app_id = 'b24f5f1f'; // Replace with your app_id
	const app_key = '3c26a1c7d5ecaec7afac077c2fc3e348'; // Replace with your app_key

	const extractRecipeId = (uri) => {
		// Split the string by '#recipe_' and take the last part
		const parts = uri.split('#recipe_');
		return parts.pop(); // This will return the part after '#recipe_'
	};

	const callEdamamAPIUsingID = async (arrOfURIs) => {
		const arrWithAllEdamamSaved = [];

		for (const obj of arrOfURIs) {
			const uri = obj.edamamURI;
			const recipeId = extractRecipeId(uri);
			const url = `https://api.edamam.com/api/recipes/v2/${recipeId}?type=public&app_id=${app_id}&app_key=${app_key}`;
			try {
				console.log(`Fetching recipe with ID: ${recipeId} from URL: ${url}`);
				const response = await fetch(url);
				const data = await response.json();
				console.log('Fetched data -> ', data);
				if (data.recipe) {
					arrWithAllEdamamSaved.push(data.recipe);
				} else {
					console.warn(`No recipe found for ID: ${recipeId}`);
				}
			} catch (error) {
				console.error('Error fetching the recipes:', error);
			}
		}
		console.log('The Array being set: ', arrWithAllEdamamSaved);
		setEdamamAllFields(arrWithAllEdamamSaved);
	};

	const fetchAllSavedRecipes = async () => {
		const response = await getDocs(collection(db, `${email}-recipes`));
		console.log(response);

		let emptyArr = [];
		let edamamArr = [];
		let userArr = [];
		response.forEach((doc) => emptyArr.push({ ...doc.data() }));
		console.log(emptyArr);
		emptyArr.forEach((obj) => {
			if (obj.fromEdamam === true) {
				edamamArr.push(obj);
			} else {
				userArr.push(obj);
			}
		});

		if (edamamArr.length > 0) {
			callEdamamAPIUsingID(edamamArr);
		}

		console.log('edamamArr: ', edamamArr);
		console.log('userArr: ', userArr);
		setSavedEdamamRecipes(edamamArr);
		setSavedUserRecipes(userArr);
	};

	useEffect(() => {
		fetchAllSavedRecipes();
	}, []);

	return (
		<div>
			<AriaNavbar />
			<h1>Account</h1>
			<p>Here is your information: </p>
			<p>Email: {email}</p>
			<div>
				<button onClick={() => logoutUser()}>Logout</button>
			</div>
			<div className='saved-recipes-container'>
				<div className='single-container'>
					<h1>Saved Recipes (From Edamam)</h1>

					{edamamAllFields.length > 0 ? (
						edamamAllFields.map((item, index) => (
							<div key={index}>
								<FavoriteCard
									calories={item.calories}
									id={item.uri}
									image={item.image}
									ingredientLines={item.ingredientLines}
									source={item.source}
									label={item.label}
									uri='not-applicable'
									fromEdamam={true}
								/>
							</div>
						))
					) : (
						<p>No saved Edamam recipes.</p>
					)}
				</div>

				<div className='single-container'>
					<h1>Saved Recipes (From Users)</h1>
					{savedUserRecipes.length > 0 ? (
						savedUserRecipes.map((item, index) => (
							<div key={index}>
								<FavoriteCard
									calories={item.calories}
									id={item.uri}
									image={item.image}
									ingredientLines={item.ingredientLines}
									source={item.source}
									label={item.label}
									uri='not-applicable'
									fromEdamam={true}
								/>
							</div>
						))
					) : (
						<p>No saved Edamam recipes.</p>
					)}
				</div>
			</div>
		</div>
	);
};
