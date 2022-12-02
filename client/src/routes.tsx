import { createBrowserRouter } from 'react-router-dom'
import App from './App'

import { Home, Posts, ErrorPage } from './pages'
import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'
import Profile from './components/Profile'
import Account from './components/Account'
import Products from './pages/products'
import Pricing from './pages/pricing'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '',
				element: <Home />,
			},
			{
				path: 'home',
				element: <Home />,
			},
			{
				path: 'products',
				element: <Products />,
			},
			{
				path: 'pricing',
				element: <Pricing />,
			},
			{
				path: 'registration',
				element: <RegistrationForm />,
			},
			{
				path: 'login',
				element: <LoginForm />,
			},
			{
				path: 'profile',
				element: <Profile />,
			},
			{
				path: 'account',
				element: <Account />,
			},
			{
				path: 'posts',
				element: <Posts />,
			},
		],
	},
])
