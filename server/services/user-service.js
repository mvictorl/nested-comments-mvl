const db = require('../db')
const bcrypt = require('bcryptjs')
const uuid = require('uuid')
const ApiError = require('../extensions/api-error')
const tokenService = require('./token-service')

class UserService {
	async registaration(email, name, password) {
		const candidateUser = await db.user.findUnique({
			where: { email },
		})

		if (candidateUser) {
			throw ApiError.BadRequest(`E-mail ${email} already exist`)
		}

		const hashedPassword = await bcrypt.hash(password, 12)
		const activationLink = uuid.v4()

		const newUser = await db.user.create({
			data: {
				email,
				name,
				password: hashedPassword,
				activationLink,
			},
			select: {
				id: true,
				email: true,
				name: true,
				roles: true,
				isActivated: true,
			},
		})
		const tokens = tokenService.generatePairOfTokens({ ...newUser })
		await tokenService.saveToken(newUser.id, tokens.refreshToken)
		return { ...tokens, user: newUser }
	}

	async login(email, password) {
		const user = await db.user.findUnique({
			where: { email },
			select: {
				id: true,
				email: true,
				name: true,
				roles: true,
				password: true,
				isActivated: true,
			},
		})
		if (!user) {
			throw ApiError.BadRequest(`E-mail ${email} not found`)
		}

		const isPasswordsEqials = await bcrypt.compare(password, user.password)
		if (!isPasswordsEqials) {
			throw ApiError.BadRequest(`Wrong passord`)
		}

		const userDto = {
			id: user.id,
			email: user.email,
			name: user.name,
			roles: user.roles,
			isActivated: user.isActivated,
		} // id, email, isActivated

		const tokens = tokenService.generatePairOfTokens({ ...userDto })
		// ToDO: check old token for this user & change it
		await tokenService.saveToken(userDto.id, tokens.refreshToken)
		return { ...tokens, user: userDto }
	}

	async logout(refreshToken) {
		return await tokenService.removeToken(refreshToken)
	}

	async refresh(refreshToken) {
		if (!refreshToken) {
			throw ApiError.UnauthorizedUserError()
		}

		const userData = await tokenService.validateRefreshToken(refreshToken)

		const tokenFromDb = await db.token.findFirst({
			where: { refreshToken },
			select: {
				id: true,
				refreshToken: true,
			},
		})

		if (!userData || !tokenFromDb) {
			throw ApiError.UnauthorizedUserError()
		}

		const userDto = await db.user.findUnique({
			where: { id: userData.id },
			select: {
				id: true,
				email: true,
				name: true,
				roles: true,
				isActivated: true,
			},
		})

		const tokens = tokenService.generatePairOfTokens({ ...userDto })
		await tokenService.saveToken(userDto.id, tokens.refreshToken)

		return { ...tokens, user: userDto }
	}

	async activate(activationLink, refreshToken) {
		const userData = await tokenService.validateRefreshToken(refreshToken)
		if (!userData) {
			throw ApiError.UnauthorizedUserError()
		}

		const user = await db.user.findUnique({
			where: { id: userData.id },
			select: {
				activationLink: true,
			},
		})
		if (!user || user.activationLink !== activationLink) {
			// throw new Error('Не корректная ссылка активации')
			throw ApiError.BadRequest('Некорректная ссылка активации')
		}

		await db.user.update({
			where: { id: userData.id },
			data: {
				isActivated: true,
				roles: ['USER'],
			},
		})
	}

	async getUsers() {
		return await db.user.findMany({
			select: {
				id: true,
				name: true,
				email: true,
				roles: true,
			},
		})
	}
}

module.exports = new UserService()
