// const db = require('../db')
const userService = require('../services/user-service')
const { validationResult, ValidationError } = require('express-validator')
const ApiError = require('../extensions/api-error')

class UserController {
	async registration(req, res, next) {
		try {
			// const errors = validationResult(req)
			// if (!errors.isEmpty()) {
			// 	return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
			// }
			const { name, email, password } = req.body
			const userData = await userService.registaration(name, email, password)
			// res.cookie('refreshToken', userData.refreshToken, {
			// 	httpOnly: true,
			// 	maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days as refresh token
			// })
			return res.json(userData)
		} catch (e) {
			next(e)
		}
	}

	async login(req, res, next) {
		try {
			const errors = validationResult(req)
			if (!errors.isEmpty()) {
				return next(
					ApiError.ValidationError('Validation error', errors.array())
				)
			}

			const { email, password } = req.body
			const userData = await userService.login(email, password)
			res.cookie('refreshToken', userData.refreshToken, {
				httpOnly: true,
				maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days as refresh token
			})
			return res.json(userData)
		} catch (e) {
			next(e)
		}
	}

	async logout(req, res, next) {
		try {
			const { refreshToken } = req.cookies // Take the 'refreshToken' token from cookie
			const data = await userService.logout(refreshToken) // Call 'logout' service function
			res.clearCookie('refreshToken') // Delete the 'refreshToken' cookie
			return res.json(data) // Return response to client
		} catch (e) {
			next(e)
		}
	}

	async refresh(req, res, next) {
		try {
			const { refreshToken } = req.cookies // Take the 'refreshToken' token from cookie
			const userData = await userService.refresh(refreshToken)
			res.cookie('refreshToken', userData.refreshToken, {
				httpOnly: true,
				maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days as refresh token
			})
			return res.json(userData)
		} catch (e) {
			next(e)
		}
	}

	async check(req, res, next) {
		try {
			const { refreshToken } = req.cookies // Take the 'refreshToken' token from cookie
			const userData = await userService.check(refreshToken)
			if (userData) {
				res.cookie('refreshToken', userData.refreshToken, {
					httpOnly: true,
					maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days as refresh token
				})
			} else {
				const data = await userService.logout(refreshToken) // Call 'logout' service function
				res.clearCookie('refreshToken') // Delete the 'refreshToken' cookie
			}
			return res.json(userData)
		} catch (e) {
			next(e)
		}
	}

	async activate(req, res, next) {
		try {
			const activationLink = req.params.link
			const { refreshToken } = req.cookies
			await userService.activate(activationLink, refreshToken)
			return res.redirect(process.env.CLIENT_URL)
		} catch (e) {
			next(e)
		}
	}

	async checkEmailExist(email) {
		await userService.isEmailExist(email).then(
			() => Promise.resolve(),
			() => Promise.reject(`E-mail (${email}) not exist`)
		)
	}

	async checkPasswordOk(password, { req }) {
		await userService.isPasswordOk(password, { req }).then(
			() => Promise.resolve(),
			() => Promise.reject('Wrong password')
		)
	}

	async getUsers(req, res, next) {
		try {
			return res.json(await userService.getUsers())
		} catch (e) {
			next(e)
		}
	}
}

module.exports = userCtrl = new UserController()
