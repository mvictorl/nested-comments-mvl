import { PrismaClient } from '@prisma/client'
import fastify from 'fastify'
import cors from '@fastify/cors'
import sensible from '@fastify/sensible'
import dotenv from 'dotenv'

dotenv.config()

// Create & config web-server instance
const app = fastify({ logger: true })

// Create DB client
const db = new PrismaClient()
// Function for access to DB (use @fastify/sensible)
const dbAccess = async promise => {
	const [err, data] = await app.to(promise)
	if (err) return app.httpErrors.internalServerError(err.message)
	return data
}

// Add web-server features
app.register(sensible)
app.register(cors, {
	origin: process.env.CLIENT_URL,
	credentials: true,
})

/**
 * Routes
 */
// Users routers
app.post('/user/registration', async (req, res) => {
	return res.send(req.routerPath)
})
app.post('/user/login', async (req, res) => {
	return res.send(req.routerPath)
})
app.post('/user/logout', async (req, res) => {
	return res.send(req.routerPath)
})
app.get('/user/refresh', async (req, res) => {
	return res.send(req.routerPath)
})
app.get('/user/activate/:link', async (req, res) => {
	return res.send(req.routerPath)
})
app.get('/user/check/:code', async (req, res) => {
	return res.send(req.routerPath)
})
app.get('/user', async (req, res) => {
	return res.send(req.routerPath)
})
app.get('/user/:id', async (req, res) => {
	return res.send(req.routerPath)
})
app.put('/user:id', async (req, res) => {
	return res.send(req.routerPath)
})
app.delete('/user/:id', async (req, res) => {})

// Posts routers
app.get('/posts', async (req, res) => {
	return await dbAccess(
		db.post.findMany({
			select: {
				id: true,
				title: true,
			},
		})
	)
})
app.get('/posts/:id', async (req, res) => {})
app.post('/posts', async (req, res) => {})
app.put('/posts:id', async (req, res) => {})
app.delete('/posts/:id', async (req, res) => {})

// Comments router
app.post('/posts/:id/comments', async (req, res) => {})
app.put('/posts/:pid/comments/:cid', async (req, res) => {})
app.delete('/posts/:pid/comments/:cid', async (req, res) => {})
app.post('/posts/:pid/comments/:cid/like', async (req, res) => {})

/**
 * Run the server!
 */
app
	.listen({ port: process.env.PORT })
	.then(address =>
		console.info(
			`\x1b[33m \x1b[3m Server listening on \x1b[31m${address} \x1b[0m `
		)
	)
	.catch(err => {
		console.log('Error starting server:', err)
		process.exit(1)
	})
