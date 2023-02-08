
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs[0].likes;
}

const favoriteBlog = (blogs) => {
    let favorite;
    blogs.forEach((blog) => {
        if (!favorite || blog.likes > favorite.likes) {
            favorite = { ...blog }
        }
    })
    return favorite;
}

const mostBlogs = (blogs) => {
    let blog;
    blogs.forEach((element) => {
        if (!blog || !blog['blogs'] || element.blogs > blog['blogg']) {
            blog = element;
        }
    })
    return blog;
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}