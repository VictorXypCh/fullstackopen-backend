
const route = require("express").Router()
const Blog = require('../models/Blog')
route.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

route.post('/', (request, response) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

route.delete('/:id', async (request, response) => {
    await Blog.findOneAndRemove(request.params.id);
    response.status(204).end();
})


module.exports = route