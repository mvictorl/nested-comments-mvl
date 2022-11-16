import { FC, useContext, useState } from 'react'
import { Context } from './main'
import { IUser } from './models/IUser'

import './App.css'
import LoginForm from './components/LoginForm'

const App: FC = () => {
	const { store } = useContext(Context)
	const [] = useState<IUser[]>([])

	// if (store.isLoading) {
	//   return <div>Loading...</div>
	// }

	// if (!store.isAuth) {
	//   return (
	//     <div>
	//       <LoginForm />
	//     </div>
	//   )
	// }

	return (
		<div>
			<LoginForm />
			{/* <h1>
				{store.isAuth
					? `User with e-mail ${store.user.email} is authorized`
					: 'Authorization are needed'}
			</h1>

			<h1>
				{store.user.isActivated
					? 'Account with e-mail ${store.user.email} is activated'
					: 'Account activation are needed'}
			</h1> */}
		</div>
	)
}

export default App
