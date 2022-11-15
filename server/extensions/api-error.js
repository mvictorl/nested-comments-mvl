module.exports = class ApiError extends Error {
	constructor(status, message, errors = []) {
		super(message)
		this.status = status
		this.errors = errors
	}

	static UnauthorizedUserError() {
		return new ApiError(401, 'User is not authorized')
	}

	static AuthHeaderError() {
		return new ApiError(401, 'User is not authorized (no Auth Header)')
	}

	static AccessTockenError() {
		return new ApiError(401, 'User is not authorized (no Access Tocken)')
	}

	static ValidateAccessTockenError() {
		return new ApiError(
			401,
			'User is not authorized (Access Tocken Validation error)'
		)
	}

	static BadRequest(message, errors = []) {
		return new ApiError(400, message, errors)
	}
}
