import { useState, useEffect } from 'react';
import { AriaNavbar } from '../components/AriaNavbar';
import axios from 'axios';
import styles from '../styles/styles.module.css';
import { Flex, Text, Avatar, Card, Box, Button } from '@radix-ui/themes';
import { random20 } from './data';

export const Home = () => {
	// const [randomRecipes, setRandomRecipes] = useState([]);

	// useEffect(() => {
	// 	const fetchRandomRecipes = async () => {
	// 		try {
	// 			const response = await axios.get('http://localhost:5001/recipes/random');
	// 			const recipes = response.data.hits.map((recipe) => ({
	// 				...recipe,
	// 				isEdamam: true,
	// 			}));
	// 			console.log(recipes);
	// 			setRandomRecipes(recipes);
	// 		} catch (error) {
	// 			console.error('Error fetching random recipes: ', error);
	// 		}
	// 	};

	// 	fetchRandomRecipes();
	// }, []);

	return (
		<div>
			<AriaNavbar />
			<h1>Another online cookbook...but better?</h1>
			<p>Thank you Edamam for your public database of recipes!</p>
			<p>Here are some random recipes fetched from their database. </p>
			<br></br>
			<div className={styles.flexbox}>
				{random20.map((item, index) => (
					<Box key={index} className={styles.clickbox} width='300px'>
						<Card>
							<Flex gap='4' direction='column'>
								<Text as='div' size='4' weight='bold'>
									{item.recipe.label}
								</Text>

								<Avatar size='8' src={item.recipe.image} alt='Food pic' />

								<Text as='div' size='2' weight='bold'>
									{item.recipe.source}
								</Text>
							</Flex>
						</Card>
					</Box>
				))}
			</div>
		</div>
	);
};
