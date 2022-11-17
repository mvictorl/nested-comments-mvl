import { Box, Button, ButtonGroup, TextField } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { FC, useState, useContext } from 'react'
import { Context } from '../index'

const LoginForm: FC = () => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const { store } = useContext(Context)

	return (
		<div>
			<Box
				sx={{
					marginY: 16,
					// marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Box component="form" noValidate sx={{ mt: 1 }}>
					<TextField
						onChange={e => setEmail(e.target.value)}
						margin="normal"
						fullWidth
						label="Email Address"
						name="email"
						value={email}
						type="email"
						placeholder="Email Address"
						helperText=" "
					/>

					<TextField
						onChange={e => setPassword(e.target.value)}
						margin="normal"
						fullWidth
						label="Password"
						name="password"
						value={password}
						type="password"
						placeholder="Password"
						helperText="Error"
					/>
				</Box>
				<ButtonGroup
					variant="outlined"
					fullWidth
					aria-label="outlined button group"
				>
					<Button
						onClick={() => store.login(email, password)}
						variant="outlined"
						sx={{ mt: 3, mb: 2 }}
					>
						Login
					</Button>
					<Button
						onClick={() => store.registration(email, password)}
						variant="outlined"
						sx={{ mt: 3, mb: 2 }}
					>
						Registration
					</Button>
				</ButtonGroup>
			</Box>
			<br />

			<button onClick={() => store.logout()}>Logout</button>
		</div>
	)
}

export default observer(LoginForm)
