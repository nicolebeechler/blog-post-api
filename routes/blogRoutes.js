const express = require('express')
const router = express.Router()
const blogCtrl = require('../controllers/blogController')

// GET /blogs: Accepts Blog data and Creates a Blog Post
router.post('/', blogpostCtrl.create)
// GET /blogs: Returns a list of all blogs
router.get('/', blogCtrl.index)
// GET /blogs/:id: Gets an individual blog
router.get('/:id', blogCtrl.show)
// POST /blogs/:blogId/users/:userId
router.post('/:blogId/users/:userId', blogCtrl.addUser)

module.exports = router