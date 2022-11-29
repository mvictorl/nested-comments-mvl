import {
	Button,
	Paper,
	TextField,
	Stack,
	Grid,
	Link,
	Typography,
	useTheme,
} from '@mui/material'
import { observer } from 'mobx-react-lite'
import { FormEvent, useState, useContext, useEffect } from 'react'
import { Context } from '../index'
import { useNavigate, Link as rrdLink } from 'react-router-dom'

const RegistrationForm = () => {
	const [name, setName] = useState<string>('')
	const [nameError, setNameError] = useState<string>(' ')

	const [email, setEmail] = useState<string>('')
	const [emailError, setEmailError] = useState<string>(' ')

	const [password, setPassword] = useState<string>('')
	const [passwordError, setPasswordError] = useState<string>(' ')

	const { store } = useContext(Context)
	const theme = useTheme()
	const navigate = useNavigate()

	useEffect(() => {
		if (store.isAuth) navigate('/home')
		// eslint-disable-next-line
	}, [store.isAuth])

	useEffect(() => {
		if (store.validationErrors != null) {
			store.validationErrors.map(e => {
				switch (e.param) {
					case 'name':
						return setNameError(e.msg)
					case 'email':
						return setEmailError(e.msg)
					case 'password':
						return setPasswordError(e.msg)
					default:
						return null
				}
			})
		} else {
			setNameError(' ')
			setEmailError(' ')
			setPasswordError(' ')
			if (store.isAuth) navigate('/home')
		}
		// eslint-disable-next-line
	}, [store])

	const handlerLogin = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		await store.registration(name, email, password)
	}

	if (store.isLoading) {
		return <h1 style={{ marginTop: 24 }}>Loading...</h1>
	} else {
		return (
			<Grid container>
				<Grid item xs={0} md={3} lg={4} />
				<Grid item xs={12} md={6} lg={4}>
					<Paper
						sx={{
							padding: 1,
						}}
					>
						<Stack
							component="form"
							onSubmit={handlerLogin}
							direction="column"
							sx={{
								marginTop: 2,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
							}}
						>
							<Typography
								variant="h4"
								sx={{
									// textShadow: '2px 2px 2px rgba(0, 0, 255, 0.3)',
									fontWeight: 700,
									color: theme.palette.primary.main,
								}}
							>
								Create account
							</Typography>
							<TextField
								onChange={e => setName(e.target.value)}
								value={name}
								margin="normal"
								fullWidth
								label="User name"
								name="name"
								type="text"
								placeholder="User name"
								error={nameError !== ' '}
								helperText={nameError}
							/>

							<TextField
								onChange={e => setEmail(e.target.value)}
								value={email}
								margin="normal"
								fullWidth
								label="Email Address"
								name="email"
								type="email"
								placeholder="Email Address"
								error={emailError !== ' '}
								helperText={emailError}
							/>

							<TextField
								onChange={e => setPassword(e.target.value)}
								value={password}
								margin="normal"
								fullWidth
								label="Password"
								name="password"
								type="password"
								placeholder="Password"
								error={passwordError !== ' '}
								helperText={passwordError}
							/>

							<Button
								type="submit"
								variant="contained"
								sx={{ mt: 1, mb: 1, width: '50%' }}
							>
								Registration
							</Button>
						</Stack>
						<Link
							component={rrdLink}
							to="../login"
							underline="hover"
							marginTop={2}
							sx={{ float: 'right' }}
						>
							Sign in
						</Link>
					</Paper>
				</Grid>
				<Grid item xs={0} md={3} lg={4} />
			</Grid>
		)
	}
}

export default observer(RegistrationForm)
