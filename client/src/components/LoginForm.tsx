import { Button, Paper, TextField, Stack, Grid, Link } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { FormEvent, useState, useContext, useEffect } from 'react'
import { Context } from '../index'
import { useNavigate, Link as rrdLink } from 'react-router-dom'

const LoginForm = () => {
	const [email, setEmail] = useState<string>('')
	const [emailError, setEmailError] = useState<string>(' ')

	const [password, setPassword] = useState<string>('')
	const [passwordError, setPasswordError] = useState<string>(' ')

	const { store } = useContext(Context)
	const navigate = useNavigate()

	useEffect(() => {
		if (store.isAuth) navigate('/home')
		// eslint-disable-next-line
	}, [store.isAuth])

	useEffect(() => {
		if (store.validationErrors != null) {
			store.validationErrors.map(e => {
				switch (e.param) {
					case 'email':
						return setEmailError(e.msg)
					case 'password':
						return setPasswordError(e.msg)
					default:
						return null
				}
			})
		} else {
			setEmailError(' ')
			setPasswordError(' ')
			if (store.isAuth) navigate('/home')
		}
		// eslint-disable-next-line
	}, [store])

	const handlerLogin = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		await store.login(email, password)
		// if (!store.validationErrors) {
		// 	console.log('No validation errors')

		// 	navigate('/home')
		// }
		// console.log('Validation errors')
		// // navigate('/home')
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
								// maxWidth: 'xl',
								marginTop: 2,
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
							}}
						>
							{/* <Box sx={{ mt: 1 }}> */}
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
							{/* </Box> */}

							<Button
								type="submit"
								variant="contained"
								sx={{ mt: 1, mb: 1, width: '50%' }}
							>
								Login
							</Button>
						</Stack>
						<Link
							component={rrdLink}
							to="../registration"
							underline="hover"
							marginTop={2}
							sx={{ float: 'right' }}
						>
							Create an account
						</Link>
					</Paper>
				</Grid>
				<Grid item xs={0} md={3} lg={4} />
			</Grid>
		)
	}
}

export default observer(LoginForm)
