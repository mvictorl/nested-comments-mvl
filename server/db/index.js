const { PrismaClient } = require('@prisma/client')

// Create DB client
module.exports = db = new PrismaClient()
