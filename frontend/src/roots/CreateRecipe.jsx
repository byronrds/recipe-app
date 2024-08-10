import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { AriaNavbar } from '../components/AriaNavbar';
import '../styles/App.css';
import { Flex, Text, Avatar, Card, Box } from '@radix-ui/themes';
export const CreateRecipe = () => {
	// const [allRecipes, setAllRecipes] = useState([]);

	// const fetchUserGeneratedRecipes = async () => {
	// 	const response = await getDocs(collection(db, "recipes"));
	// 	console.log(response);
	// 	let emptyArr = [];
	// 	response.forEach((doc) => emptyArr.push(doc.data().ingredientLines));
	// 	console.log(emptyArr);
	// 	setAllRecipes(emptyArr);
	// };

	// useEffect(() => {
	// 	fetchUserGeneratedRecipes();
	// }, []);

	const [label, setLabel] = useState('');
	const [calories, setCalories] = useState('');
	const [source, setSource] = useState('');
	const [ingredients, setIngredients] = useState(['']);

	const handleIngredientChange = (index, event) => {
		const newIngredients = [...ingredients];
		newIngredients[index] = event.target.value;
		setIngredients(newIngredients);
	};

	const addIngredientField = () => {
		setIngredients([...ingredients, '']);
	};

	const removeIngredientField = () => {
		const lastItem = ingredients.pop();
		setIngredients([...ingredients]);
	};

	return (
		<div>
			<AriaNavbar />
			<div className='gimme-space'>
				{/* <Navbar /> */}
				<h1>Add Recipe</h1>
				<p>
					Let's see you creativity. Use this to store some of your favorite recipes, and also post to the
					public if you want others to be able to view it.
				</p>

				<div className='gimme-space'>
					<Box maxWidth='400px'>
						<Card>
							<Flex gap='3' align='center'>
								<Box>
									<form>
										<div className='flex-container-to-block-tags'>
											<label htmlFor='label'>Label: </label>
											<input
												id='label'
												placeholder='Byron Hamburger'
												value={label}
												onChange={(e) => setLabel(e.target.value)}
											/>
											<label htmlFor='ingredients'>Ingredients: </label>
											{ingredients.map((ingredient, index) => (
												<div key={index}>
													<input
														type='text'
														value={ingredient}
														onChange={(e) => handleIngredientChange(index, e)}
														placeholder={`Ingredient ${index + 1}`}
													/>
												</div>
											))}
											<button type='button' onClick={removeIngredientField}>
												Remove Ingredient
											</button>
											<br></br>
											<button type='button' onClick={addIngredientField}>
												Add Ingredient
											</button>
											<br></br>
											<label htmlFor='calories'>Calories: </label>
											<input
												id='calories'
												placeholder='e.g. 1200'
												value={calories}
												onChange={(e) => setCalories(e.target.value)}
											/>
											<label htmlFor='source'>Source: </label>
											<input
												id='source'
												placeholder='[Your Name]'
												value={source}
												onChange={(e) => setSource(e.target.value)}
											/>
										</div>
									</form>
									{/* <Text as="div" size="2" weight="bold">
											{index}
										</Text>
										<Text as="div" size="2" color="gray">
											<ul>
												{item.map((i, index) => (
													<li key={index}>{i}</li>
												))}
											</ul>
										</Text> */}
								</Box>
							</Flex>
						</Card>
					</Box>
				</div>
			</div>
		</div>
	);
};
