export function getRecipeIDFromURI(uri) {
	const parts = uri.split('#')[1].split('_');
	return parts[1];
}
