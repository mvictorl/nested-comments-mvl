const userService = require('../services/user-service')

class UserController {
	async registration(req, res, next) {
		try {
			// const errors = validationResult(req)
			// if (!errors.isEmpty()) {
			// 	return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
			// }
			const { name, email, password } = req.body
			const userData = await userService.registaration(email, name, password)
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

	async getUsers(req, res, next) {
		try {
			return res.json(await userService.getUsers())
		} catch (e) {
			next(e)
		}
	}
}

module.exports = userCtrl = new UserController()
