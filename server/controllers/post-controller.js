const postService = require('../services/post-service')

class PostController {
	async getPosts(req, res, next) {
		try {
			return res.json(await postService.getPosts())
		} catch (e) {
			next(e)
		}
	}
}

module.exports = postCtrl = new PostController()
