const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/userRoutes')
const blogRoutes = require('./routes/blogRoutes')
const app = express()

app.use(express.json()) 
app.use(bodyParser.json())
app.use(morgan('combined'))
app.use('/users', userRoutes)
app.use('/blogs', blogRoutes)

module.exports = app