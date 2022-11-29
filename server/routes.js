const Router = require('express').Router
const router = new Router()
const { body, check } = require('express-validator')

const userCtrl = require('./controllers/user-controller')
const postCtrl = require('./controllers/post-controller')

const authMiddleware = require('./middlewares/auth-middleware')

/**
 * Routes
 */
// Users routers
router.post('/user/registration', userCtrl.registration)
router.post(
	'/user/login',
	body('email').isEmail(),
	check('password')
		.isLength({
			min: process.env.PASS_LENGTH_MIN,
			max: process.env.PASS_LENGTH_MAX,
		})
		.withMessage(
			`Password mast be from ${process.env.PASS_LENGTH_MIN} to ${process.env.PASS_LENGTH_MAX} characrets`
		),
	userCtrl.login
)
router.post('/user/logout', userCtrl.logout)
router.get('/user/refresh', userCtrl.refresh)
router.get('/user/check', userCtrl.check)
router.get('/user/activate/:link', userCtrl.activate)
// router.get('/user/check/:code', async (req, res) => {})
router.get('/user', authMiddleware, userCtrl.getUsers)
// router.get('/user/:id', async (req, res) => {})
// router.put('/user:id', async (req, res) => {})
// router.delete('/user/:id', async (req, res) => {})

//  Posts routers
router.get('/posts', postCtrl.getPosts)
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
