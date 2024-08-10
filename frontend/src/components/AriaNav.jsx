import React, { useContext } from 'react';
import { TabNav, Flex } from '@radix-ui/themes';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
export const AriaNav = () => {
	const location = useLocation();
	const { pathname } = location;
	const { logoutUser } = useContext(AuthContext);
	// const emailName = user.email;
	const user = localStorage.getItem('user');
	if (user === null) {
		return <Navigate to='/login' replace />;
	}
	const jsonUser = JSON.parse(user);
	const email = jsonUser.email;

	return (
		<div>
			<Flex direction='column' gap='4' pb='2'>
				<TabNav.Root color='gray'>
					<TabNav.Link asChild active={pathname === '/'}>
						<Link to='/'>Home</Link>
					</TabNav.Link>
					<TabNav.Link asChild active={pathname === '/recipes'}>
						<Link to='/recipes'>Recipes</Link>
					</TabNav.Link>
					<TabNav.Link asChild active={pathname === '/create-recipe'}>
						<Link to='/create-recipe'>Create Recipe</Link>
					</TabNav.Link>
					<TabNav.Link asChild active={pathname === '/account'}>
						<Link to='/account'>Account</Link>
					</TabNav.Link>
					{email && email === 'bs2@gmail.com' && (
						<TabNav.Link asChild active={pathname === '/admin'}>
							<Link to='/admin'>Admin</Link>
						</TabNav.Link>
					)}
					{!email && (
						<TabNav.Link asChild active={pathname === '/login'}>
							<Link to='/login'>Login</Link>
						</TabNav.Link>
					)}
				</TabNav.Root>
			</Flex>
		</div>
	);
};
