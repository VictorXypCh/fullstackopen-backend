const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs[0].likes;
};

const favoriteBlog = (blogs) => {
  let favorite;
  blogs.forEach((blog) => {
    if (!favorite || blog.likes > favorite.likes) {
      favorite = { ...blog };
    }
  });
  return favorite;
};

const mostBlogs = (blogs) => {
  let blog;
  blogs.forEach((element) => {
    if (!blog || !blog["blogs"] || element.blogs > blog["blog"]) {
      blog = element;
    }
  });
  return blog;
};

const mostLikes = (blogs) => {
  let authors = {};
  blogs.forEach((blog) => {
    if (!authors[blog.author]) {
      authors[blog.author] = blog.likes;
    } else {
      authors[blog.author] += blog.likes;
    }
  });

  let mostLikes = { value: 0 };
  for (const [key, value] of Object.entries(authors)) {
    if (mostLikes.value < value) {
      mostLikes = { author: key, likes: value };
    }
  }
  return mostLikes;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};

