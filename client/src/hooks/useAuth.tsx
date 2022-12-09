import {
	createContext,
	useContext,
	useState,
	ReactNode,
	useEffect,
} from 'react'
import { IUser } from '../models/IUser'
import { IValidationErrorResponse } from '../models/IValidationErrorResponse'
import AuthService from '../services/AuthService'

const initAuthContext = {
	isAuth: false,
	user: {} as IUser,
	isLoading: false,
	errors: [] as IValidationErrorResponse[],
	signin: (email: string, password: string): Promise<void> | void => {},
	signup: (
		name: string,
		email: string,
		password: string,
		confirm: string
	): Promise<void> | void => {},
	signout: (): Promise<void> | void => {},
	clearErrors: (): void => {},
	// sendPasswordResetEmail: () => {},
	// confirmPasswordReset: () => {},
}

const authContext = createContext(initAuthContext)

type Props = {
	children?: ReactNode
}

export function ProviderAuth({ children }: Props) {
	const auth = useProviderAuth()
	return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

export const useAuth = () => {
	return useContext(authContext)
}

function useProviderAuth() {
	const [isAuth, setIsAuth] = useState(false)
	const [user, setUser] = useState({} as IUser)
	const [isLoading, setIsLoading] = useState(false)
	const [errors, setErrors] = useState([] as IValidationErrorResponse[])

	useEffect(() => {
		try {
			setIsLoading(true)
			AuthService.check().then(
				res => {
					if (res.data) {
						localStorage.setItem('bearer-token', res.data?.accessToken)
						localStorage.setItem('isauth', 'true')
						setIsAuth(true)
						setUser(res.data.user)
					} else {
						localStorage.clear() // removeItem('bearer-token')
						setIsAuth(false)
						setUser({} as IUser)
					}
				},
				error => {
					localStorage.clear() // removeItem('bearer-token')
					setIsAuth(false)
					setUser({} as IUser)
					console.error(error)
				}
			)
		} catch (e: any) {
			console.error(e.response?.data?.message)
		} finally {
			setIsLoading(false)
		}
	}, [])

	const signin = async (email: string, password: string) => {
		try {
			setIsLoading(true)
			return await AuthService.login(email, password).then(
				res => {
					localStorage.setItem('bearer-token', res.data.accessToken)
					localStorage.setItem('isauth', 'true')
					setIsAuth(true)
					setUser(res.data.user)
					setErrors([])
				},
				error => {
					if (error.response?.data?.message === 'Validation error') {
						setErrors(error.response?.data?.errors)
					} else console.error(error)
				}
			)
		} catch (e: any) {
			console.error(e)
		} finally {
			setIsLoading(false)
		}
	}

	const signup = async (
		name: string,
		email: string,
		password: string,
		confirm: string
	) => {
		try {
			setIsLoading(true)
			return await AuthService.registration(
				name,
				email,
				password,
				confirm
			).then(
				res => {
					localStorage.setItem('bearer-token', res.data?.accessToken)
					localStorage.setItem('isauth', 'true')
					setIsAuth(true)
					setUser(res.data.user)
				},
				error => {
					if (error.response?.data?.message === 'Validation error') {
						setErrors(error.response?.data?.errors)
					} else console.error(error)
				}
			)
		} catch (e: any) {
			console.error(e)
		} finally {
			setIsLoading(false)
		}
	}

	const signout = async () => {
		try {
			setIsLoading(true)
			return await AuthService.logout().then(res => {
				localStorage.clear()
				setIsAuth(false)
				setUser({} as IUser)
			})
		} catch (e: any) {
			console.error(e)
		} finally {
			setIsLoading(false)
		}
	}

	const clearErrors = () => {
		setErrors([] as IValidationErrorResponse[])
	}

	// const sendPasswordResetEmail = email => {
	// 	return firebase
	// 		.auth()
	// 		.sendPasswordResetEmail(email)
	// 		.then(() => {
	// 			return true
	// 		})
	// }
	// const confirmPasswordReset = (code, password) => {
	// 	return firebase
	// 		.auth()
	// 		.confirmPasswordReset(code, password)
	// 		.then(() => {
	// 			return true
	// 		})
	// }
	// Subscribe to user on mount
	// Because this sets state in the callback it will cause any ...
	// ... component that utilizes this hook to re-render with the ...
	// ... latest auth object.
	// useEffect(() => {
	// 	const unsubscribe = firebase.auth().onAuthStateChanged(user => {
	// 		if (user) {
	// 			setUser(user)
	// 		} else {
	// 			setUser([])
	// 		}
	// 	})
	// 	// Cleanup subscription on unmount
	// 	return () => unsubscribe()
	// }, [])
	// Return the user object and auth methods
	return {
		isAuth,
		user,
		isLoading,
		errors,
		signin,
		signup,
		signout,
		clearErrors,
		// sendPasswordResetEmail,
		// confirmPasswordReset,
	}
}
