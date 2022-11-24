import { Box, Button, TextField } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../index'

const RegistrationForm = () => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const { store } = useContext(Context)
	const navigate = useNavigate()

	const handlerLogin = async () => {
		await store.login(email, password)
		navigate('/home')
	}

	return (
		<>
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Box component="form" noValidate sx={{ mt: 1 }}>
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
				{/* <ButtonGroup
					variant="outlined"
					fullWidth
					aria-label="outlined button group"
				> */}
				<Button
					type="submit"
					onSubmit={() => store.registration(email, password)}
					// onClick={() => store.registration(email, password)}
					variant="outlined"
					sx={{ mt: 3, mb: 2 }}
				>
					Registration
				</Button>
			</Box>
		</>
	)
}

export default observer(RegistrationForm)
