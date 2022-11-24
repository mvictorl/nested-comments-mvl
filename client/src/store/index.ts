import { makeAutoObservable } from 'mobx'
import axios from 'axios'
import { IUser } from '../models/IUser'
import { IAuthResponse } from '../models/IAuthResponse'
import AuthService from '../services/AuthService'

const API_URL: string = process.env.REACT_APP_API_KEY || ''

export default class Store {
	user: IUser | null = null
	isAuth = false
	isLoading = false

	constructor() {
		makeAutoObservable(this)
		// this.user = {
		// 	id: '54b67ea2-94f7-4eea-b09c-ef9e1444603e',
		// 	name: 'Victor',
		// 	email: 'victor@ya.ru',
		// 	isActivated: true,
		// 	roles: ['USER'],
		// }
	}

	setUser(user: IUser | null) {
		this.user = user
	}

	setAuth(bool: boolean) {
		this.isAuth = bool
	}

	setLoading(bool: boolean) {
		this.isLoading = bool
	}

	/**
	 * Functions
	 */
	async login(email: string, password: string) {
		this.setLoading(true)
		try {
			const res = await AuthService.login(email, password)
			localStorage.setItem('bearer-token', res.data.accessToken)
			this.setAuth(true)
			this.setUser(res.data.user)
		} catch (e: any) {
			console.error(e.response?.data?.message)
		} finally {
			this.setLoading(false)
		}
	}

	async registration(email: string, password: string) {
		this.setLoading(true)
		try {
			const res = await AuthService.registration(email, password)
			localStorage.setItem('bearer-token', res.data?.accessToken)
			this.setAuth(true)
			this.setUser(res.data.user)
		} catch (e: any) {
			console.error(e.response?.data?.message)
		} finally {
			this.setLoading(false)
		}
	}

	async logout() {
		this.setLoading(true)
		try {
			await AuthService.logout()
			localStorage.clear() // removeItem('bearer-token')
			this.setAuth(false)
			this.setUser(null)
		} catch (e: any) {
			console.error(e.response?.data?.message)
		} finally {
			this.setLoading(false)
		}
	}

	async checkAuth() {
		this.setLoading(true)
		try {
			const res = await axios.get<IAuthResponse>(`${API_URL}/user/refresh`, {
				withCredentials: true,
			})
			localStorage.setItem('bearer-token', res.data.accessToken)
			this.setAuth(true)
			this.setUser(res.data.user)
		} catch (e: any) {
			console.error(e.response?.data?.message)
		} finally {
			this.setLoading(false)
		}
	}
}
