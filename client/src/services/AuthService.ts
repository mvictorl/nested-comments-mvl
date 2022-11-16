import { $api } from '../http'
import { AxiosResponse } from 'axios'
import { IAuthResponse } from '../models/IAuthResponse'

export default class AuthService {
	static async login(
		email: string,
		password: string
	): Promise<AxiosResponse<IAuthResponse>> {
		return $api.post<IAuthResponse>('/user/login', { email, password })
	}

	static async registration(
		email: string,
		password: string
	): Promise<AxiosResponse<IAuthResponse>> {
		return $api.post<IAuthResponse>('/user/registration', { email, password })
	}

	static async logout(): Promise<void> {
		return $api.post('/user/logout')
	}
}
