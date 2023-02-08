const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            __v: 0
        },
        {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12
        },
        {
            author: "Robert C. Martin",
            blogs: 3
        },
    ]

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('get most likes blog', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        expect(result).toEqual(
            {
                title: "Canonical string reduction",
                author: "Edsger W. Dijkstra",
                likes: 12
            }
        )
    })

    test('get most blogs', () => {
        const result = listHelper.mostBlogs(listWithOneBlog)
        expect(result).toEqual(
            {
                author: "Robert C. Martin",
                blogs: 3
            }
        )
    })

    test('get most likes blog object', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        expect(result).toEqual(
            {
                author: "Edsger W. Dijkstra",
                likes: 17
            }
        )
    })
});