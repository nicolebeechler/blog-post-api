# Blog Post API

Node version must be version 18 to work with api locally and must create .env with MONGO_URI & sha256 SECRET + Must have nodemon installed global

## About 

A practical application of many-to-many relationships in a JSON API context. A user can login, create, edit, view, and delete blog posts.

View the Project Board [here](https://github.com/users/nicolebeechler/projects/2/views/1). 

### API Models Diagram

![Excalidraw](https://i.imgur.com/tUhXMhR.png)


### Endpoints

#### Blog Posts:

1. **POST /blogs**: Accepts Blog Data and Creates a Blog
2. **GET /blogs**: Returns a list of all Blogs
3. **GET /blogs/:id**: Gets an individual Blog Post
4. **PUT /blogs/:id:** Updates a Blog Post
5. **DEL /blogs/:id:** Deletes a Blog Post

#### Users:

1. **POST /users**: Accepts user data and creates a New User
2. **PUT /users/:id:** Updates a User
3. **DEL /users/:id:** Deletes a User


## Getting Started

#### Download the API and Install the Packages

1. Retrieve the SSH link from the repository (`< > Code` > SSH)
2. Make a new directory in your terminal, and open the containing file
3. Clone the repository `git clone git@github.com:nicolebeechler/blog-post-api.git`
4. Open the file in VS Code `code .` (or your preferred editor)
5. In your Code Editor, open a terminal and install all the packages with `npm i`

#### Update the `.env example` File

1. Include your [MONGO_URI](https://www.mongodb.com/atlas/database)
2. Include your [sha256 SECRET](https://emn178.github.io/online-tools/sha256.html)
3. Update the file name to `.env`

## Testing

#### User Endpoints

```js
// userRoutes - .routes/userRoutes

router.post('/', userController.createUser) // create user
router.post('/login', userController.loginUser) // logs in user
router.put('/:id', userController.updateUser) // updates user
router.delete('/:id', userController.auth, userController.deleteUser) // deletes a user

// userSchema - .models/user

{
name: String,
email: String, 
password: String,
}
```

#### Blog Post Endpoints

```js
// blogRoutes - ./routes/blogRoutes

router.post('/', blogCtrl.createBlog) // creates a new blog
router.get('/', blogCtrl.indexBlog) // shows all blogs
router.get('/:id', blogCtrl.showBlog) // shows an individual blog
router.put('/:id', blogCtrl.updateBlog) // updates a blog
router.delete('/:id', blogCtrl.destroyBlog) // deletes a blog

// blogSchema - .models/blog

{
title: String
description: String
public: Boolean
}
```

### Postman Manual Testing

*Required: Connect to your MongoDB server with `npm run dev`*

#### User:

1. **Create New User**
	1. POST request
	2. URL: localhost:3000/users
	3. Body: raw, JSON, input the New User's Data based on the `userSchema`
2. **Edit User**
	1. PUT request
	2. URL: localhost:3000/users/`user._id` (from User)
	3. Authorization, Type: Bearer Token  (from User)
	4. Body: raw, JSON, update the value(s) in the userSchema
3. **Delete User**
	1. DELETE request
	2. URL: localhost:3000/users/`user._id` (from User)
	3. Authorization, Type: Bearer Token  (from User)
	4. Body: *leave blank*
	5. Expected response: `"message": "User deleted"`

#### Blog Posts: 

1. **Create New Blog Post**
	1. POST request
	2. URL: localhost:3000/blogs
	3. Body: raw, JSON, input the New Blog Post Data based on the `blogSchema`
2. **View All Blog Posts**
	1. GET request
	2. URL: localhost:3000/blogs
	3. Body: *leave blank*
3. **View an Individual Blog Post**
	1. GET request
	2. URL: localhost:3000/blogs/`blog._id` (from Blog Post)
	3. Body: *leave blank*
4. **Update Blog Post**
	1. PUT request
	2. URL: localhost:3000/users/`user._id` (from User)
	3. Authorization, Type: Bearer Token  (from User)
	4. Body: raw, JSON, update the value(s) in the userSchema
5. Delete Blog Post
	1. DELETE request
	2. URL: localhost:3000/users/`blog._id` (from Blog Post)
	4. Body: *leave blank*
	5. Expected response: `"message": "Blog post deleted"`

### Jest and Supertest Automated Testing

* Run the test files via `npm run test`

## Technologies Used

* MongoDB
* Express
* NodeJS
* Postman - Manual Testing
* Jest and Supertest - Automated Testing