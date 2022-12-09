const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const router = require('./routes/routes.js')
const errorMiddleware = require('./middlewares/error-middleware')

const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 5000

// Create web-server
const app = express()

app.disable('x-powered-by')
app.use(express.json())
app.use(bodyParser.json())
app.use(cookieParser())
app.use(
	cors({
		origin: process.env.CLIENT_URL,
		credentials: true,
	})
)

app.use('/api', router)
app.use(errorMiddleware) // Error handler middleware (LAST!)

/**
 * Run web-server!
 */
const startServer = () => {
	try {
		const server = app.listen(PORT, () =>
			console.info(
				`\x1b[33m\x1b[3m Web-server is running on port \x1b[31m${
					server.address().port
				}\x1b[0m `
			)
		)
	} catch (e) {
		console.error(e)
	}
}

startServer()
