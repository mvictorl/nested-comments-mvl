import { IUser } from './IUser'
import { IValidationErrorResponse } from './IValidationErrorResponse'

export interface IAuthResponse {
	accessToken: string
	refreshToken: string
	user: IUser
	errors?: IValidationErrorResponse[]
}
