import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

export const fetchAllRecipes = async () => {
	const response = await getDocs(collection(db, "all-recipes"));
	console.log(response);
	// let emptyArr = [];
	// response.forEach((doc) => emptyArr.push(doc.data().ingredientLines));
	// console.log(emptyArr);
	// setAllRecipes(emptyArr);
	return response;
};
