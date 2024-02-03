const Blog = require('../models/blog')
const User = require('../models/user')

/* 
// GET /blogs: Accepts Blog data and Creates a Blog Post
router.post('/', blogCtrl.createBlog)
// GET /blogs: Returns a list of all blogs
router.get('/', blogCtrl.indexBlog)
// GET /blogs/user/:userId: Returns a list of blogs by user ID
router.get('/blogs/user/:userId', blogCtrl.getBlogsByUserId)
// GET /blogs/:id: Gets an individual blog
router.get('/:id', blogCtrl.showBlog)
// PUT /blogs: Updates a blog post
router.put('/:id', blogCtrl.updateBlog)
// DELETE /blogs:id Deletes an individual blog post
router.delete('/:id', blogCtrl.destroyBlog)
// POST /blogs/:blogId/users/:userId
router.post('/:blogId/users/:userId', blogCtrl.addUser)
*/

exports.createBlog = async function create(req, res) {
    try {
        const createdBlog = await new Blog(req.body)
        console.log(req.user)
        createdBlog.createdBy = req.user._id
        await createdBlog.save()
        res.status(200).json(createdBlog)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

exports.indexBlog = async function index(req, res) {
    try {
        const foundBlogs = await Blog.find({})
        res.status(200).json(foundBlogs)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

exports.showBlog = async function show(req, res) {
    try {
        const foundBlog = await Blog.findOne({ _id: req.params.id })
        res.status(200).json(foundBlog)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

exports.updateBlog = async function update(req, res) {
    try {
        const updatedBlog = await Blog.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true } )
        updatedBlog.createdBy = req.user._id
        await updatedBlog.save()
        res.status(200).json(updatedBlog)
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

exports.destroyBlog = async function destroy(req, res) {
    try {
     const deleted = await Blog.findOneAndDelete({ _id: req.params.id })
     if (!deleted) {
        return res.status(400).json({ msg: 'Blog not found' })
     }
     deleted.createdBy = req.user._id

     await Blog.deleteOne()

     res.status(200).json({msg: `The blog with the ID of ${deleted._id}  was deleted from the MongoDB database, no further action necessary`})
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}