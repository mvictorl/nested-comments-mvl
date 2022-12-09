import React, { createContext } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
import { IStore } from './models/IStore'
import Store from './store'
import { ProviderAuth } from './hooks/useAuth'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './index.css'

const store = new Store()

export const Context = createContext<IStore>({ store })

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	// <React.StrictMode>
	<ProviderAuth>
		<RouterProvider router={router} />
	</ProviderAuth>
	// <Context.Provider value={{ store }}>
	// 	<RouterProvider router={router} />
	// </Context.Provider>
	// </React.StrictMode>
)
