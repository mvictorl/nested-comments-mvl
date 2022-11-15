const db = require('../db')

class PostService {
	async getPosts() {
		return await db.post.findMany({
			select: {
				id: true,
				title: true,
			},
		})
	}
}

module.exports = new PostService()
