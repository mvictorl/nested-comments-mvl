import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { IStore } from './models/IStore'
import Store from './store'

const store = new Store()

export const Context = createContext<IStore>({ store })

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Context.Provider value={{ store }}>
			<App />
		</Context.Provider>
	</React.StrictMode>
)
