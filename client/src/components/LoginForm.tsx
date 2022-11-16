import { observer } from 'mobx-react-lite'
import { FC, useState, useContext } from 'react'
import { Context } from '../main'

const LoginForm: FC = () => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const { store } = useContext(Context)

	return (
		<div>
			<input
				onChange={e => setEmail(e.target.value)}
				value={email}
				type="email"
				placeholder="Email"
			/>

			<input
				onChange={e => setPassword(e.target.value)}
				value={password}
				type="password"
				placeholder="Password"
			/>

			<button onClick={() => store.login(email, password)}>Login</button>
			<button onClick={() => store.registration(email, password)}>
				Registration
			</button>
			<br />

			<button onClick={() => store.logout()}>Logout</button>
		</div>
	)
}

export default observer(LoginForm)
