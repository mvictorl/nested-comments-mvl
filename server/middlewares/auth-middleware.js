const ApiError = requier('../extensions/api-error')
const tokenService = requier('../services/token-service.js')

module.exports = (req, res, next) => {
	console.log('===== Auth Middleware start =====')

	try {
		const authHeader = req.header.authorization

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
