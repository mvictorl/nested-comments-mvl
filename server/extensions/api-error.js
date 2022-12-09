module.exports = class ApiError extends Error {
	constructor(status, message, errors = []) {
		super(message)
		this.status = status
		this.errors = errors
	}

	static UnauthorizedUserError() {
		return new ApiError(403, 'User is not authorized')
	}

	static AuthHeaderError() {
		return new ApiError(401, 'User is not authorized (no Auth Header)')
	}

	static AccessTockenError() {
		return new ApiError(401, 'User is not authorized (no Access Token)')
	}

	static ValidateAccessTockenError() {
		return new ApiError(
			401,
			'User is not authorized (Access Token Validation error)'
		)
	}

	static PermissionError() {
		return new ApiError(401, 'User has no permissions')
	}

	// static UserActivationError() {
	// 	return new ApiError(403, 'Account are not activated')
	// }

	static BadRequest(message) {
		return new ApiError(422, message)
	}

	static ValidationError(message, errors = []) {
		return new ApiError(422, message, errors)
	}

	static DataBaseError(message, error) {
		return new ApiError(500, message, error)
	}
}
