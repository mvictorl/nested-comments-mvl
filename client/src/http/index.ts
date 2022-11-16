import axios from 'axios'
import { IAuthResponse } from '../models/IAuthResponse'

const API_URL = import.meta.env.VITE_API_KEY
const SELF_URL = import.meta.env.VITE_SELF_URL

export const $api = axios.create({
	withCredentials: true,
	baseURL: API_URL,
})

$api.interceptors.request.use(config => {
	config.headers!.Authorization = `Bearer ${localStorage.getItem(
		'bearer-token'
	)}`
	console.log('Request', config)

	return config
})

$api.interceptors.response.use(
	config => config,
	async error => {
		const origRequest = error.config

		if (
			error.response.status === 401 &&
			error.config &&
			!error.config._isRetry
		) {
			origRequest._isRetry = true
			try {
				const response = await axios.get<IAuthResponse>(
					`${API_URL}/user/refresh`,
					{ withCredentials: true }
				)
				localStorage.setItem('bearer-token', response.data.accessToken)
				return $api.request(origRequest)
			} catch (e) {
				console.error('USER NOT AUTHORIZE', e)
			}
		}

		localStorage.removeItem('bearer-token')
		window.location.href = SELF_URL

		return Promise.reject(error)
	}
)
