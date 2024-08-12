import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Home } from './roots/Home.jsx';
import { Recipes } from './roots/Recipes.jsx';
import { CreateRecipe } from './roots/CreateRecipe.jsx';
import { Message } from './roots/Message.jsx';

import HomePage from './components/HomePage.jsx';
import { RecipeDetail } from './components/RecipeDetail.jsx';
import { UserSubmittedRecipes } from './roots/UserSubmittedRecipes.jsx';
import { EdamamRecipes } from './roots/EdamamRecipes.jsx';

import { RecipesProvider } from './components/RecipesContext.jsx';
import { Login } from './components/Login.jsx';
import { Signup } from './components/Signup.jsx';
import { AuthProvider } from './components/AuthContext.jsx';
import { Account } from './components/Account.jsx';
import { Admin } from './components/Admin.jsx';
import { AuthContext } from './components/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { SingleRecipe } from './roots/SingleRecipe.jsx';

import { ProtectedRoute } from './components/ProtectedRoute.jsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/login',
		element: <Login />,
	},
	{
		path: '/signup',
		element: <Signup />,
	},
	{
		path: '/recipes',
		element: <Recipes />,
	},
	{
		path: '/create-recipe',
		element: <CreateRecipe />,
	},
	{
		path: '/message',
		element: <Message />,
	},
	{
		path: '/home',
		element: <HomePage />,
	},
	{
		path: '/recipe/:recipeID',
		element: <SingleRecipe />,
	},
	{
		path: '/official-recipes',
		element: <ProtectedRoute element={<EdamamRecipes />} />,
	},
	{
		path: '/user-recipes',
		element: <ProtectedRoute element={<UserSubmittedRecipes />} />,
	},
	{
		path: '/account',
		element: <ProtectedRoute element={<Account />} />,
	},
	{
		path: '/admin',
		element: <ProtectedRoute element={<Admin />} />,
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<AuthProvider>
			<RecipesProvider>
				<Theme>
					<RouterProvider router={router} />
				</Theme>
			</RecipesProvider>
		</AuthProvider>
	</React.StrictMode>
);
