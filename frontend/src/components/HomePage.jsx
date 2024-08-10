import React from 'react';
import { Button } from 'react-aria-components';
import { useListBox } from '@react-aria/listbox';
import { useMenu } from '@react-aria/menu';
import { useOverlay } from '@react-aria/overlays';
import { useSelect } from '@react-aria/select';
import { VisuallyHidden } from '@react-aria/visually-hidden';

const HomePage = () => {
	const recipes = [
		{ name: 'Chicken Curry', description: 'A spicy chicken curry with rice.' },
		{ name: 'Pasta', description: 'Italian pasta with tomato sauce.' },
		{ name: 'Tacos', description: 'Mexican tacos with salsa.' },
	];

	return (
		<div>
			<header>
				<h1>Welcome to My Recipe Website</h1>
				<nav>
					<ul>
						<li>
							<Button>Home</Button>
						</li>
						<li>
							<Button>Recipes</Button>
						</li>
						<li>
							<Button>About</Button>
						</li>
					</ul>
				</nav>
			</header>
			<main>
				<h2>Featured Recipes</h2>
				<ul>
					{recipes.map((recipe, index) => (
						<li key={index}>
							<h3>{recipe.name}</h3>
							<p>{recipe.description}</p>
						</li>
					))}
				</ul>
			</main>
			<footer>
				<p>&copy; 2024 My Recipe Website</p>
			</footer>
		</div>
	);
};

export default HomePage;
