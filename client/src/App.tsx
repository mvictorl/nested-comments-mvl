// import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'

import './App.css'
import {
	Container,
	createTheme,
	CssBaseline,
	ThemeProvider,
} from '@mui/material'
import TopBar from './components/TopBar'

const App = () => {
	// const [] = useState<IUser[]>([])

	const theme = createTheme({
		typography: {
			fontFamily: 'Roboto, sans-serif',
		},
	})

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<TopBar />
			<Container component="main" maxWidth="xl" sx={{ marginTop: 4 }}>
				<Outlet />
			</Container>
		</ThemeProvider>
	)
}

export default App
