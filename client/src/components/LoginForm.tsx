import { Box, Button, Paper, TextField } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { FormEvent, useState, useContext } from 'react'
import { Context } from '../index'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const { store } = useContext(Context)
	const navigate = useNavigate()

	const handlerLogin = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		await store.login(email, password)
		navigate('/home')
	}

	if (store.isLoading) {
		return <h1 style={{ marginTop: 24 }}>Loading...</h1>
	} else {
		return (
			<div>
				<Box
					component="form"
					onSubmit={handlerLogin}
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Paper
						sx={{
							padding: 8,
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
						}}
					>
						<Box sx={{ mt: 1 }}>
							<TextField
								onChange={e => setEmail(e.target.value)}
								value={email}
								margin="normal"
								fullWidth
								label="Email Address"
								name="email"
								type="email"
								placeholder="Email Address"
								helperText=" "
							/>

							<TextField
								error
								onChange={e => setPassword(e.target.value)}
								value={password}
								margin="normal"
								fullWidth
								label="Password"
								name="password"
								type="password"
								placeholder="Password"
								helperText="Error"
							/>
						</Box>

						<Button
							type="submit"
							variant="contained"
							sx={{ mt: 3, mb: 2, width: '50%' }}
						>
							Login
						</Button>
					</Paper>
				</Box>
			</div>
		)
	}
}

export default observer(LoginForm)
