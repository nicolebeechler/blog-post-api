# Blog Post API

This repository contains the code for a Node/Express BackEnd API that connects to a database.

* Node must be version 18 to work with the API locally
* A .env file must be used with a MONGO_URI & sha256 SECRET hash
* Nodemon must be installed globally

### About the App

A practical application of many-to-many relationships in a JSON API context. 

A user can login, create, edit, view, and delete blog posts. Users are required to login to create and delete blog posts. The data is stored in MongoDB.

This app has been tested with Postman, Jest and Supertest to verify that the endpoints are working.

View my [Project Board](https://github.com/users/nicolebeechler/projects/2/views/1) to see how I prioritized and organized my work.

---

### How to Run the API

1. In your terminal, navigate to the directory/folder you will clone the API into
2. Clone the repository (`git clone git@github.com:nicolebeechler/blog-post-api.git`)
3. Open `blog-post-api` in your code editor
4. Run `npm install` to install all dependencies

### How to Connect the API

1. Rename ".env example" to `.env`
2. Include your [MONGO_URI](https://www.mongodb.com/atlas/database) database link to store data
3. Include your [sha256 SECRET](https://emn178.github.io/online-tools/sha256.html) hash to use JWT (token authentication)
4. Open the terminal within your code editor
5. Run `npm run dev` to connect to MongoDB and [localhost:3000](https://localhost:3000/)

### Check if They Are Connected

1. If you see `We in the Building 3000`, it's connected to Port 3000
2. If you see `Mongo is showing love`, it's connected to MongoDB
3. If you see `Cannot GET /` in [localhost:3000](https://localhost:3000/), the BackEnd is working

---

### API Models, Routes, & Endpoints

#### Models Diagram 

![Blog Post Models](https://i.imgur.com/yXggv2K.png)

#### Model Schemas

```js
// blog schema - .models/blog
{
    title: { type: String, required: true }, 
    description: { type: String, required: true }, 
    public: { type: Boolean, required: true }, 
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {
    timestamps: true
}
```

```js
// user schema - .models/user
{
name: String,
    email: String, 
    password: String, 
    blogposts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog'}]
}
```

### Endpoints & Routes

#### Blog Posts:

| Endpoints: |  |  |
| ---- | ---- | ---- |
| POST | /blogs | Accepts blog data and creates a blog |
| GET | /blogs | Returns a list of all blog posts |
| GET | /blogs/:id | Gets a list of all blog posts |
| PUT | /blogs/:id | Updates a blog post |
| DEL | /blogs/:id | Deletes a blog post |

```js
// blogRoutes - ./routes/blogRoutes

router.post('/', blogCtrl.createBlog) // creates a new blog
router.get('/', blogCtrl.indexBlog) // shows all blogs
router.get('/:id', blogCtrl.showBlog) // shows an individual blog
router.put('/:id', blogCtrl.updateBlog) // updates a blog
router.delete('/:id', blogCtrl.destroyBlog) // deletes a blog
```
#### [](https://github.com/nicolebeechler/blog-post-api#users)Users:

| Endpoints: |  |  |
| ---- | ---- | ---- |
| POST | /users | Accepts user data and creates a new user |
| PUT | /users/:id | Updates a user |
| DEL | /users/:id | Deletes a user |

```js
// userRoutes - .routes/userRoutes

router.post('/', userController.createUser) // create user
router.post('/login', userController.loginUser) // logs in user
router.put('/:id', userController.updateUser) // updates user
router.delete('/:id', userController.auth, userController.deleteUser) // deletes a user
```

---

### Testing

To verify that the routes and endpoints are working with the models and controllers, I used Postman for manual testing and Jest and Supertest for automated testing. 

#### Postman Manual Testing

_Required: Connect to your MongoDB server with `npm run dev`_

| USER | Request Type | URL | BODY (raw, JSON) | Auth Token | Expected Response |
| ---- | ---- | ---- | ---- | ---- | ---- |
| Create New User | POST | localhost:3000/users | userSchema = `{"name", "email", "password")` | No |  |
| Edit/Update User | PUT | localhost:3000/users/`user._id` | update the value(s) in the userSchema | Yes |  |
| Delete User | DELETE | localhost:3000/users/`user._id` | `// leave blank` | Yes | `"message": "User deleted"` |

| BLOG POSTS | Request Type | URL | BODY (raw, JSON) | Auth Token | Expected Response |
| ---- | ---- | ---- | ---- | ---- | ---- |
| Create New Blog Post | POST | localhost:3000/blogs | blogSchema = `"title", "description", "public"}` | Yes |  |
| View All Blog Posts | GET | localhost:3000/blogs | `// leave blank` | No |  |
| View an Individual Blog Post | GET | localhost:3000/blogs/`blog._id` | `// leave blank` | No |  |
| Edit/Update Blog Post | PUT | localhost:3000/blogs/`blog._id` | update the value(s) in the blogSchema | Yes |  |
| Delete Blog Post | DELETE | localhost:3000/blogs/`blog._id` | `// leave blank` | Yes | `"message": "Blog post deleted"` |

#### Jest and Supertest Automated Testing

Run the test files via `npm run test`

**Expected Response:** 

![Blogs Test](https://i.imgur.com/lUvDcqB.png)

![Users Test](https://i.imgur.com/2b1HQ1E.png)

---

### Technologies Used

* Express
* NodeJS
* MongoDB
* Postman - Manual Testing
* Jest and Supertest - Automated Testing