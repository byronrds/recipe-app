export function getRecipeIDFromURI(uri) {
	const parts = uri.split('#')[1].split('_');
	return parts[1];
}

export function filterRecipeFields(recipes) {
	const filteredRecipes = recipes.map((item) => {
		console.log('uri: ', item.recipe.uri);
		const id = item.recipe.uri.split('#recipe_')[1];
		console.log('id: ', id);

		return {
			calories: Math.round(item.recipe.calories),
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
