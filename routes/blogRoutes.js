const express = require('express')
const router = express.Router()
const blogCtrl = require('../controllers/blogController')

// GET /blogs: Accepts Blog data and Creates a Blog Post
router.post('/', blogCtrl.createBlog)
// GET /blogs: Returns a list of all blogs
router.get('/', blogCtrl.indexBlog)
// GET /blogs/:id: Gets an individual blog
router.get('/:id', blogCtrl.showBlog)
// PUT /blogs: Updates a blog post
router.put('/:id', blogCtrl.updateBlog)
// DELETE /blogs:id Deletes an individual blog post
router.delete('/:id', blogCtrl.destroyBlog)
// POST /blogs/:blogId/users/:userId
router.post('/:blogId/users/:userId', blogCtrl.addUser)

module.exports = router