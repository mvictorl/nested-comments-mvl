const db = require('../db')
const bcrypt = require('bcryptjs')
const uuid = require('uuid')
const ApiError = require('../extensions/api-error')
const tokenService = require('./token-service')

class UserService {
	async registaration(name, email, password) {
		const candidateUser = await db.user.findUnique({
			where: { email },
			select: { id: true },
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
		try {
			return await db.user
				.findUnique({
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
				.then(
					async user => {
						if (!(await bcrypt.compare(password, user.password))) {
							throw ApiError.ValidationError('Incorrect password', [
								{
									value: password,
									msg: 'Incorrect password',
									param: 'password',
									location: 'body',
								},
							])
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
					},
					err => {
						console.error('DataBase error')
						throw ApiError.DataBaseError('DB Error', e)
					}
				)
		} catch (e) {
			console.error('DB Error')
			throw ApiError.DataBaseError('DB Error', e)
		}

		// } catch (e) {
		// 	console.error('DataBase error')
		// 	throw ApiError.DataBaseError('DB Error', e)
		// }
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

	async check(refreshToken) {
		if (!refreshToken) return null

		const userData = await tokenService.validateRefreshToken(refreshToken)
		if (!userData) return null

		const tokenFromDb = await db.token.findFirst({
			where: { refreshToken },
			select: {
				id: true,
				refreshToken: true,
			},
		})
		if (!tokenFromDb) return null

		try {
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
		} catch (e) {
			console.error(e)
		}
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

	async isEmailExist(email) {
		try {
			await db.user
				.findUnique({
					where: { email },
					select: {
						id: true,
					},
				})
				.then(
					user => (!!user ? Promise.resolve(true) : Promise.reject(false)),
					() => Promise.reject(false)
				)
		} catch (e) {
			throw ApiError.DataBaseError('DB Error', e)
		}
	}

	async isPasswordOk(password, { req }) {
		try {
			await db.user
				.findUnique({
					where: { email: req.body.email },
					select: {
						password: true,
					},
				})
				.then(
					user =>
						!!user
							? bcrypt.compare(password, user.password)
							: Promise.reject(false),
					() => Promise.reject(false)
				)
				.then(
					res => (!res ? Promise.reject(false) : Promise.resolve(true)),
					() => Promise.reject(false)
				)
		} catch (e) {
			throw ApiError.DataBaseError('DB Error', e)
		}
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
