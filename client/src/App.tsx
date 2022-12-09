import { useEffect, useState } from 'react'
// import { Context } from './index'
// import { observer } from 'mobx-react-lite'
import { useAuth } from './hooks/useAuth'
import { Outlet } from 'react-router-dom'

import './App.css'
import {
	CircularProgress,
	Container,
	createTheme,
	CssBaseline,
	Stack,
	ThemeProvider,
	responsiveFontSizes,
} from '@mui/material'
import TopBar from './components/TopBar'

const App = () => {
	// const [] = useState<IUser[]>([])
	// const { store } = useContext(Context)
	const { isLoading } = useAuth()

	let theme = createTheme({
		typography: {
			fontFamily: 'Roboto, sans-serif',
		},
	})
	theme = responsiveFontSizes(theme)

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<TopBar />
			<Container component="main" maxWidth="xl" sx={{ mt: '1rem' }}>
				{/* {isLoading ? (
					<Stack
						direction="column"
						sx={{ height: '100vh' }}
						justifyContent="center"
						alignItems="center"
					>
						<CircularProgress size="5rem" />
					</Stack>
				) : ( */}
				<Outlet />
				{/* )} */}
			</Container>
		</ThemeProvider>
	)
}

export default App
