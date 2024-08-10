import React, { useState, useEffect, useContext } from 'react';
import { fetchAllRecipes } from '../functions/FetchAllRecipes';
import { FavoriteCard } from '../components/FavoriteCard';
import { AriaNavbar } from '../components/AriaNavbar';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase.js';
import { RecipesContext } from '../components/RecipesContext.jsx';
import axios from 'axios';
import { Recipes } from './Recipes.jsx';

export const UserSubmittedRecipes = () => {
	const { userSubmittedRecipes, updateUserSubmittedRecipes } = useContext(RecipesContext);
	console.log(userSubmittedRecipes);
	const getUserSubmittedRecipes = async () => {
		const response = await axios.get('http://localhost:5001/recipes/user-submitted');
		console.log('response: ', response.data);
		let recipesArray = response.data;
		updateUserSubmittedRecipes(recipesArray);
	};

	useEffect(() => {
		if (userSubmittedRecipes.length < 1) {
			getUserSubmittedRecipes();
		}
	}, []);

	return (
		<div>
			<AriaNavbar />
			<div className='gimme-space'>
				<h1>User Submitted Recipes</h1>
				{userSubmittedRecipes.length > 0 &&
					userSubmittedRecipes.map((item, index) => (
						<FavoriteCard
							key={index}
							calories={item.calories}
							id={item.id}
							image={item.image}
							ingredientLines={item.ingredientLines}
							source={item.source}
							label={item.label}
							uri='not-applicable'
							isEdamam={item.isEdamam}
						/>
					))}
			</div>
		</div>
	);
};
