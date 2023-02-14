
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const Blog = require('../models/Blog')
const api = supertest(app)



const initial = [
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0,
    },
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12,
    },
    {
        author: "Robert C. Martin",
        blogs: 3,
    },
];

beforeEach(async () => {
    await Blog.deleteMany({})
    for (let item of initial) {
        let obj = new Blog(item)
        await obj.save()
    }
})


test('a blog can be deleted', async () => {
  const atStart = await Blog.find({})
  const toDelete = atStart[0]

  await api
    .delete(`/api/blogs/${toDelete.id}`)
    .expect(204)

  const atEnd = await Blog.find({})

  expect(atEnd).toHaveLength(
    initial.length - 1
  )

  const contents = atEnd.map(r => r.title)

  expect(contents).not.toContain(toDelete.title)
})





afterAll(async () => {
    await mongoose.connection.close()
})