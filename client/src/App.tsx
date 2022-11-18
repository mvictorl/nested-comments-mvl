import React, { FC, useContext, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Context } from './index'
import { IUser } from './models/IUser'

import './App.css'
import LoginForm from './components/LoginForm'
import {
	Container,
	createTheme,
	CssBaseline,
	ThemeProvider,
} from '@mui/material'
import { TopBar } from './components/TopBar'

const App: FC = () => {
	const { store } = useContext(Context)
	const [] = useState<IUser[]>([])

	const theme = createTheme()
	// if (store.isLoading) {
	//   return <div>Loading...</div>
	// }

	// if (!store.isAuth) {
	//   return (
	//     <div>
	//       <LoginForm />
	//     </div>
	//   )
	// }

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<TopBar />
			<Container component="main" maxWidth="xs">
				<Outlet />
				{/* <h1>
				{store.isAuth
					? `User with e-mail ${store.user.email} is authorized`
					: 'Authorization are needed'}
			</h1>

			<h1>
				{store.user.isActivated
					? 'Account with e-mail ${store.user.email} is activated'
					: 'Account activation are needed'}
			</h1> */}
			</Container>
		</ThemeProvider>
	)
}

export default App
