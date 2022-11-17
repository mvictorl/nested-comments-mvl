import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { IStore } from './models/IStore'
import Store from './store'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './index.css'

const store = new Store()

export const Context = createContext<IStore>({ store })

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Context.Provider value={{ store }}>
			<App />
		</Context.Provider>
	</React.StrictMode>
)
