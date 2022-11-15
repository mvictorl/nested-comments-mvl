const ApiError = require('../extensions/api-error')
const tokenService = require('../services/token-service')

module.exports = (req, res, next) => {
	console.log('===== Auth Middleware start =====')

	try {
		const authHeader = req.headers.authorization

		if (!authHeader) {
			return next(ApiError.AuthHeaderError())
		}

		const accessTocken = authHeader.split(' ')[1]
		if (!accessTocken) {
			return next(ApiError.AccessTockenError())
		}

		const userData = tokenService.validateAccessToken(accessTocken)
		if (!userData) {
			return next(ApiError.ValidateAccessTockenError())
		}
		req.user = userData
		next()
	} catch (e) {
		return next(ApiError.UnauthorizedUserError())
	}

	console.log('===== Auth Middleware end =====')
}
