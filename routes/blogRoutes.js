const express = require('express')
const router = express.Router()
const blogCtrl = require('../controllers/blogController')
const userCtrl = require('../controllers/userController')

// GET /blogs: Accepts Blog data and Creates a Blog Post
router.post('/', userCtrl.auth, blogCtrl.createBlog)
// GET /blogs: Returns a list of all blogs
router.get('/', blogCtrl.indexBlog)
// GET /blogs/:id: Gets an individual blog
router.get('/:id', blogCtrl.showBlog)
// PUT /blogs: Updates a blog post
router.put('/:id', userCtrl.auth, blogCtrl.updateBlog)
// DELETE /blogs:id Deletes an individual blog post
router.delete('/:id', userCtrl.auth, blogCtrl.destroyBlog)

module.exports = router