import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import LoginForm from './components/LoginForm'
import ErrorPage from './pages/error-page'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: 'login',
				element: <LoginForm isLogin={true} />,
			},
			{
				path: 'registration',
				element: <LoginForm isLogin={false} />,
			},
		],
	},
])
