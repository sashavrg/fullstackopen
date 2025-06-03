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

module.exports = {
    dummy,
    totalLikes,
    favouriteBlogTitle
}