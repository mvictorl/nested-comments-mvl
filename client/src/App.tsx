import { useContext, useEffect } from 'react'
import { Context } from './index'
import { observer } from 'mobx-react-lite'
import { Outlet } from 'react-router-dom'

import './App.css'
import {
	CircularProgress,
	Container,
	createTheme,
	CssBaseline,
	Stack,
	ThemeProvider,
} from '@mui/material'
import TopBar from './components/TopBar'

const App = () => {
	// const [] = useState<IUser[]>([])
	const { store } = useContext(Context)

	useEffect(() => {
		store.checkAuth()
		// eslint-disable-next-line
	}, [])

	const theme = createTheme({
		typography: {
			fontFamily: 'Roboto, sans-serif',
		},
	})

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<TopBar />
			<Container component="main" maxWidth="xl" sx={{ mt: '1rem' }}>
				{store.isLoading ? (
					<Stack
						direction="column"
						sx={{ height: '100vh' }}
						justifyContent="center"
						alignItems="center"
					>
						<CircularProgress size="5rem" />
					</Stack>
				) : (
					<Outlet />
				)}
			</Container>
		</ThemeProvider>
	)
}

export default observer(App)
