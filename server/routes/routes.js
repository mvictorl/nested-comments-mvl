const Router = require('express').Router
const router = new Router()

const { body, check } = require('express-validator')

const userCtrl = require('../controllers/user-controller')
// const postCtrl = require('./controllers/post-controller')

const { authUser } = require('../middlewares/auth-middleware')

// function checkEmailExist(email, { req }) {
// 	return db.user
// 		.findUnique({
// 			where: { email },
// 			select: {
// 				id: true,
// 			},
// 		})
// 		.then(user => {
// 			if (!user) {
// 				return Promise.reject(`E-mail (${email}) not exist`)
// 			}
// 		})
// }

// function checkPasswordOk(password, { req }) {
// 	return db.user
// 		.findUnique({
// 			where: { email: req.body.email },
// 			select: {
// 				password: true,
// 			},
// 		})
// 		.then(user => {
// 			return bcrypt.compare(password, user.password)
// 		})
// 		.then(res => {
// 			if (!res) {
// 				return Promise.reject('Wrong password')
// 			}
// 		})
// }

/**
 * Routes
 */
// Users routers
router.post(
	'/user/registration',
	body('name')
		.isLength({
			min: process.env.NAME_LENGTH_MIN,
			max: (process.env.NAME_LENGTH_MAX = 25),
		})
		.withMessage(
			`User name mast be from ${process.env.NAME_LENGTH_MIN} to ${process.env.NAME_LENGTH_MAX} characrets`
		),
	body('email').isEmail(),
	body('password')
		.isLength({
			min: process.env.PASS_LENGTH_MIN,
			max: process.env.PASS_LENGTH_MAX,
		})
		.withMessage(
			`Password mast be from ${process.env.PASS_LENGTH_MIN} to ${process.env.PASS_LENGTH_MAX} characrets`
		)
		.bail()
		.custom((value, { req }) => {
			if (value !== req.body.passwordConfirm) {
				throw new Error('Password confirmation is incorrect')
			}
		}),
	userCtrl.registration
)

router.post(
	'/user/login',
	body('email')
		.isEmail()
		.withMessage('Incorrect email')
		.bail()
		.custom(userCtrl.checkEmailExist),
	body('password')
		.isLength({
			min: process.env.PASS_LENGTH_MIN,
			max: process.env.PASS_LENGTH_MAX,
		})
		.withMessage(
			`Password mast be from ${process.env.PASS_LENGTH_MIN} to ${process.env.PASS_LENGTH_MAX} characrets`
		)
		.bail()
		.custom(userCtrl.checkPasswordOk)
		.withMessage('Wrong Password'),
	userCtrl.login
)

router.post('/user/logout', userCtrl.logout)
router.get('/user/refresh', userCtrl.refresh)
router.get('/user/check', userCtrl.check)
router.get('/user/activate/:link', userCtrl.activate)
// router.get('/user/check/:code', async (req, res) => {})
router.get('/user', authUser, userCtrl.getUsers)
// router.get('/user/:id', async (req, res) => {})
// router.put('/user:id', async (req, res) => {})
// router.delete('/user/:id', async (req, res) => {})

//  Posts routers
router.get('/posts', async (req, res) => {})
router.get('/posts/:id', async (req, res) => {})
router.post('/posts', async (req, res) => {})
router.put('/posts:id', async (req, res) => {})
router.delete('/posts/:id', async (req, res) => {})

// Comments routers
router.post('/posts/:id/comments', async (req, res) => {})
router.put('/posts/:pid/comments/:cid', async (req, res) => {})
router.delete('/posts/:pid/comments/:cid', async (req, res) => {})
router.post('/posts/:pid/comments/:cid/like', async (req, res) => {})

module.exports = router
