var _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favouriteBlogTitle = (blogs) => {
    if (blogs.length === 0) return null

    const favourite = blogs.reduce((prev, current) =>
        current.likes > prev.likes ? current : prev)

    return favourite.title
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return null

    const counts = _.countBy(blogs, 'author')
    const blogsPerAuthorArr = Object.entries(counts).map(([author, blogs]) => ({author, blogs}))
    const maxBlogs = Math.max(...blogsPerAuthorArr.map(item => item.blogs))
    const mostBlogsAuthor = blogsPerAuthorArr.filter(item => item.blogs === maxBlogs)
    const topAuthor = mostBlogsAuthor[0]

    return topAuthor
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlogTitle,
    mostBlogs
}