import { makeAutoObservable } from 'mobx'
import { IUser } from '../models/IUser'
// import { IAuthResponse } from '../models/IAuthResponse'
import AuthService from '../services/AuthService'

const API_URL = import.meta.env.VITE_API_KEY

export default class Store {
	user = {} as IUser
	isAuth = false
	isLoading = false

	constructor() {
		makeAutoObservable(this)
	}

	setUser(user: IUser) {
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
		try {
			const res = await AuthService.login(email, password)
			localStorage.setItem('bearer-token', res.data.accessToken)
			this.setAuth(true)
			this.setUser(res.data.user)
		} catch (e: any) {
			console.error(e.response?.data?.message)
		}
	}

	async registration(email: string, password: string) {
		try {
			const res = await AuthService.registration(email, password)
			localStorage.setItem('bearer-token', res.data?.accessToken)
			this.setAuth(true)
			this.setUser(res.data.user)
		} catch (e: any) {
			console.error(e.response?.data?.message)
		}
	}

	async logout() {
		try {
			const res = await AuthService.logout()
			localStorage.clear() // removeItem('bearer-token')
			this.setAuth(false)
			this.setUser({} as IUser)
		} catch (e: any) {
			console.error(e.response?.data?.message)
		}
	}
}
