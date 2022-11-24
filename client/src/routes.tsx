import { createBrowserRouter } from 'react-router-dom'
import App from './App'

import { Home, Posts, ErrorPage } from './pages'
import LoginForm from './components/LoginForm'
import RegistrationForm from './components/RegistrationForm'

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
				path: 'registration',
				element: <RegistrationForm />,
			},
			{
				path: 'login',
				element: <LoginForm />,
			},
			{
				path: 'posts',
				element: <Posts />,
			},
			{
				path: 'home',
				element: <Home />,
			},
		],
	},
])
