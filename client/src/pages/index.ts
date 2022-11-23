import Home from './home'
import Posts from './posts'
import ErrorPage from './error-page'

import { IPages } from '../models/IPages'
const pages: IPages[] = [
	{
		name: 'Products',
		link: 'products',
		access: 'PUBLIC',
	},
	{
		name: 'Pricing',
		link: 'pricing',
		access: 'PUBLIC',
	},
	{
		name: 'Posts',
		link: 'posts',
		access: 'USER',
	},
	{
		name: 'Options',
		link: 'options',
		access: 'ADMIN',
	},
]

export { Home, Posts, ErrorPage, pages }
