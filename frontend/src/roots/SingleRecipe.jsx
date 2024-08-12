import { useParams, useLocation } from 'react-router-dom';

// import '../styles/App.css';
import { Chatbot } from '../components/Chatbot';
export const SingleRecipe = () => {
	const { state } = useLocation();

	const recipe = state?.recipe;

	if (!recipe) {
		return <div>Recipe not found!</div>;
	}

	// const addUserRecipe = async () => {
	// 	try {
	// 		console.log('Da Object: ', userObjForFirestore);
	// 		const docRef = await addDoc(collection(db, `${email}-recipes`), userObjForFirestore);
	// 		console.log('Document written with ID: ', docRef.id);
	// 	} catch (e) {
	// 		console.error('Error adding document: ', e);
	// 	}
	// };

	// const addEdamamRecipe = async () => {
	// 	try {
	// 		console.log('Da Object: ', edamamObjForFirestore);
	// 		const docRef = await addDoc(collection(db, `${email}-recipes`), edamamObjForFirestore);
	// 		console.log('Document written with ID: ', docRef.id);
	// 	} catch (e) {
	// 		console.error('Error adding document: ', e);
	// 	}
	// };

	const saveRecipe = () => {
		console.log('Yo');
		// if (recipe.fromEdamam === true) {
		// 	addEdamamRecipe();
		// } else {
		// 	addUserRecipe();
		// }
	};

	return (
		<div>
			<div style={{ margin: '20px' }}>
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
