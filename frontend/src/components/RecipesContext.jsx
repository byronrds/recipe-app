import { createContext, useState } from "react";

const RecipesContext = createContext();

const RecipesProvider = ({ children }) => {
	const [edamamRecipes, setEdamamRecipes] = useState([]);
	const [userSubmittedRecipes, setUserSubmittedRecipes] = useState([])

	const updateEdamamRecipes = (newRecipes) => {
		setEdamamRecipes(newRecipes);
	};
	const updateUserSubmittedRecipes = (newRecipes) => {
		setUserSubmittedRecipes(newRecipes);
	}

	return (
		<RecipesContext.Provider value={{ edamamRecipes, updateEdamamRecipes, userSubmittedRecipes, updateUserSubmittedRecipes }}>
		{children}
	</RecipesContext.Provider>
	);
};

export { RecipesContext, RecipesProvider };
