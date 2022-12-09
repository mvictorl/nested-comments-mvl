import {
	Paper,
	TextField,
	Stack,
	Grid,
	Link,
	Typography,
	InputAdornment,
	IconButton,
	useTheme,
} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { FormEvent, useState, useEffect } from 'react'
import { useNavigate, Link as rrdLink } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const RegistrationForm = () => {
	const { isAuth, errors, isLoading, signup, clearErrors } = useAuth()

	const [name, setName] = useState<string>('')
	const [nameError, setNameError] = useState<string>(' ')

	const [email, setEmail] = useState<string>('')
	const [emailError, setEmailError] = useState<string>(' ')

	const [password, setPassword] = useState<string>('')
	const [passwordShow, setPasswordShow] = useState<boolean>(false)
	const [passwordError, setPasswordError] = useState<string>(' ')

	const [passwordConfirm, setPasswordConfirm] = useState<string>('')
	const [passwordConfirmShow, setPasswordConfirmShow] = useState<boolean>(false)
	const [passwordConfirmError, setPasswordConfirmError] = useState<string>(' ')

	const theme = useTheme()
	const navigate = useNavigate()

	const togglePasswordShow = () => {
		setPasswordShow(prev => !prev)
	}

	const togglePasswordConfirmShow = () => {
		setPasswordConfirmShow(prev => !prev)
	}

	useEffect(() => {
		if (isAuth) navigate('/home')
		// eslint-disable-next-line
	}, [isAuth])

	useEffect(() => {
		if (errors.length > 0) {
			errors.forEach(e => {
				switch (e.param) {
					case 'name':
						setNameError(e.msg)
						setName(e.value)
						break
					case 'email':
						setEmailError(e.msg)
						setEmail(e.value)
						break
					case 'password':
						setPasswordError(e.msg)
						setPassword(e.value)
						break
					case 'passwordConfirm':
						setPasswordConfirmError(e.msg)
						setPasswordConfirm(e.value)
						break
				}
			})
		} else {
			if (isAuth) navigate('/')
		}
		clearErrors()
		// eslint-disable-next-line
	}, [errors])

	const handlerLogin = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		await signup(name, email, password, passwordConfirm)
	}

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
						onSubmit={e => handlerLogin(e)}
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
								fontWeight: 700,
								color: theme.palette.primary.main,
							}}
						>
							Sign up
						</Typography>
						<TextField
							onChange={e => setName(e.target.value)}
							onFocus={() => setNameError(' ')}
							value={name}
							margin="normal"
							fullWidth
							label="User Name"
							name="name"
							type="text"
							placeholder="User Name"
							error={nameError !== ' '}
							helperText={nameError}
						/>

						<TextField
							onChange={e => setEmail(e.target.value)}
							onFocus={() => setEmailError(' ')}
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
							onFocus={() => setPasswordError(' ')}
							value={password}
							margin="normal"
							fullWidth
							label="Password"
							name="password"
							type={passwordShow ? 'text' : 'password'}
							placeholder="Password"
							error={passwordError !== ' '}
							helperText={passwordError}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={togglePasswordShow}
											edge="end"
										>
											{passwordShow ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>

						<TextField
							onChange={e => setPasswordConfirm(e.target.value)}
							onFocus={() => setPasswordConfirmError(' ')}
							value={passwordConfirm}
							margin="normal"
							fullWidth
							label="Password Confirmation"
							name="passwordConfirm"
							type={passwordConfirmShow ? 'text' : 'password'}
							placeholder="Password Confirmation"
							error={passwordConfirmError !== ' '}
							helperText={passwordConfirmError}
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={togglePasswordConfirmShow}
											edge="end"
										>
											{passwordShow ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>

						<LoadingButton
							type="submit"
							variant="contained"
							sx={{ mt: 1, mb: 1, width: '50%' }}
							loading={isLoading}
							disabled={isLoading}
							loadingPosition="center"
						>
							Register
						</LoadingButton>
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

export default RegistrationForm
