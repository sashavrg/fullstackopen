const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = process.env.MONGODB_URI
console.log('Connecting to', mongoUrl)
mongoose
    .connect(mongoUrl)
    .then(() => {
    console.log('connected to MongoDB')
    })
    .catch((error) => {
    console.error('error connection to MongoDB:', error.message)
})

app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

app.delete('/api/blogs/:id', (request, response) => {
    Blog.findByIdAndDelete(request.params.id)
        .then(() => {
        response.status(204).end()
        })
        .catch((error) => {
        console.error(error)
        response.status(500).send('Error deleting blog')
        })
})

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})