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

const mostLikes = (blogs) => {
    if (blogs.length === 0) return null

    const groupedByAuthor = _.groupBy(blogs, 'author')
    const authorsLikesSum = _.mapValues(groupedByAuthor, function(posts) {return _.sumBy(posts, 'likes')})
    const maxLikes = Math.max(...Object.values(authorsLikesSum))
    const [author, likes] = Object.entries(authorsLikesSum)
      .find(([_, likes]) => likes === maxLikes)  //array destructuring is super cool
    

    return { author, likes}
}

//console.log(mostLikes(listWithMultipleBlogs))

module.exports = {
    dummy,
    totalLikes,
    favouriteBlogTitle,
    mostBlogs,
    mostLikes
}