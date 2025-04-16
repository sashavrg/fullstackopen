const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog.find({}).then((blogs) => {
      response.json(blogs)
    })
  })
  
  blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
  
    blog.save().then((result) => {
      response.status(201).json(result)
    })
  })
  
  blogsRouter.delete(':id', (request, response) => {
      Blog.findByIdAndDelete(request.params.id)
          .then(() => {
          response.status(204).end()
          })
          .catch((error) => {
          console.error(error)
          response.status(500).send('Error deleting blog')
          })
  })

  module.exports = blogsRouter