const route = require("express").Router();
const Blog = require("../models/Blog");
route.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});
route.get("/:id", async (request, response) => {
  const result = await Blog.findById(request.params.id);
  response.json(result.toJSON());
});

route.post("/", (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

route.put("/:id", async (request, response) => {
  const body = request.body;
  const updateObj = {
    title: body.title,
    author: body.author,
    url: !body.url ? "" : body.url,
    likes: body.likes,
  };
  const result = await Blog.findByIdAndUpdate(request.params.id, updateObj, {
    new: true,
  });
  response.json(result);
});

route.delete("/:id", async (request, response) => {
  await Blog.findOneAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = route;

