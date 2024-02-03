// the packages and variables needed for setup
const request = require('supertest') // this is the thing that lets us run our code like postman
const { MongoMemoryServer } =  require('mongodb-memory-server')// this creates the fake mongodb databse that exists on our computer in our memory not on atlas
const app = require('../app') // this is our api application that we made with express this is the thing that we are giving to supertest to test
const Blog = require('../models/blog') // this is for us to be able to do crud operation on the User
const mongoose = require('mongoose')
const User = require('../models/user')
const server = app.listen(8080, () => console.log('Testing on Port 8080'))
let mongoServer 


beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    mongoose.connect(mongoServer.getUri(), { useNewUrlParser: true, useUnifiedTopology: true })
})

afterAll(async () => {
    await mongoose.connection.close()// shut off mongoose connection with mongodb
    mongoServer.stop()
    server.close()
})

/*
blogRoutes =

router.post('/', blogCtrl.createBlog)
router.get('/', blogCtrl.indexBlog)
router.get('/:id', blogCtrl.showBlog) 
router.put('/:id', blogCtrl.updateBlog)
router.delete('/:id', blogCtrl.destroyBlog)
router.post('/:blogId/users/:userId', blogCtrl.addUser) 

blogSchema = 

title: String
description: String
public: Boolean
*/

describe('Test suite for Blog Post Routes', () => {

    test('POST /blogs - Create a new blog post', async () => {
        const user = new User({
            name: 'John Doe',
            email: 'john@johnsemail.com',
            password: 'johnspassword'
        })
        await user.save()
        const token = await user.generateAuthToken()

        const response = await request(app).post('/blogs').send({ 
            title: 'Supertest Blog Post', 
            description: 'It is a super blog', 
            public: true 
        })
        .set('Authorization', `Bearer ${token}`)

        expect(response.body).toBeDefined()
        expect(response.body.title).toEqual('Supertest Blog Post')
        expect(response.body.description).toEqual('It is a super blog')
        expect(response.body.public).toEqual(true)
        // expect(response.body).toHaveProperty('token')

    })

    test('PUT /blogs/:blogId - Update a Blog Post', async () => {
        const user = new User({
            name: 'John Doe',
            email: 'john@johnsemail.com',
            password: 'johnspassword'
        })
        await user.save()
        const token = await user.generateAuthToken()

        firstBlog = await Blog.create({
            title: 'Blog Title',
            description: 'Blog Description',
            public: true,
        })

        const updatedBlog = {
            title: 'Updated Blog Title',
            description: 'Updated Blog Description',
            public: true,
        }

        const response = await request(app)
            .put(`/blogs/${firstBlog._id}`)
            .send(updatedBlog)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)

        expect(response.body._id).toEqual(firstBlog._id.toString())
        expect(response.body.title).toEqual(updatedBlog.title)
        expect(response.body.description).toEqual(updatedBlog.description)
        expect(response.body.public).toEqual(updatedBlog.public)
    })

    test('GET /blogs - List all Blog Posts (Index)', async () => {
        const response = await request(app).get('/blogs')
        expect(response.statusCode).toBe(200)
    })
    
    test('GET /blogs/:id - Retrieve an individual Blog Post', async () => {
        const user = new User({
            name: 'John Doe',
            email: 'john@johnsemail.com',
            password: 'johnspassword'
        })
        await user.save()
        const token = await user.generateAuthToken()

        const blog = await Blog.create({
            title: 'Test Blog',
            description: 'Test Description',
            public: true,
        })

        const response = await request(app)
            .get(`/blogs/${blog._id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)

        expect(response.body._id).toEqual(blog._id.toString())
        expect(response.body.title).toEqual(blog.title)
        expect(response.body.description).toEqual(blog.description)
        expect(response.body.public).toEqual(blog.public)
    })

    test('DELETE blogs/:id - Delete a Blog Post', async () => {
        const user = new User({
            name: 'John Doe',
            email: 'john@johnsemail.com',
            password: 'johnspassword'
        })
        await user.save()
        const token = await user.generateAuthToken()

        const blog = new Blog({ title: 'To Be Deleted', description: 'Placeholder', public: true })
        await blog.save()
    
        const response = await request(app)
          .delete(`/blogs/${blog._id}`)
          .set('Authorization', `Bearer ${token}`)
        
        expect(response.body.message).toEqual()
    })
})