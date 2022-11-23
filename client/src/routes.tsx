import { createBrowserRouter } from 'react-router-dom'
import App from './App'

import { Home, Posts, ErrorPage } from './pages'
import LoginForm from './components/LoginForm'

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
				element: <LoginForm isLogin={false} />,
			},
			{
				path: 'login',
				element: <LoginForm isLogin={true} />,
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
