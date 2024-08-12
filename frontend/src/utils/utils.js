export function getRecipeIDFromURI(uri) {
	const parts = uri.split('#')[1].split('_');
	return parts[1];
}

export function filterRecipeFields(recipes) {
	const filteredRecipes = recipes.map((item) => {
		const id = item.recipe.uri.split('#recipe_')[1];

		return {
			calories: item.recipe.calories,
			id: id,
			image: item.recipe.image,
			ingredientLines: item.recipe.ingredientLines,
			source: item.recipe.source,
			label: item.recipe.label,
			uri: item.recipe.uri,
			isEdamam: true,
		};
	});
	return filteredRecipes;
}
