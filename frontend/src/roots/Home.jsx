import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { AriaNav } from '../components/AriaNav';
import { fetchAllRecipes } from '../functions/FetchAllRecipes';
import { FavoriteCard } from '../components/FavoriteCard';
import { Outlet } from 'react-router-dom';

export const Home = () => {
	return (
		<div>
			<AriaNav />
			<div className='gimme-space'>
				<h1>A Better Recipe Webiste...Hopefully</h1>
				<p>Recipe websites are shit. Let me try and do a better job. </p>
				<p>Thanks to Edamam for their public recipe database API!</p>
			</div>
		</div>
	);
};
