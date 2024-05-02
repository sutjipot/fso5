import { Button } from './small'
import { useState, useEffect } from 'react'
import { handleLike, handleRemoveBlog } from './BlogActions'


export const BlogThings = ({ blog, blogs, setBlogs, showSuccess, showError, user }) => {
  const [userOwner, setUserOwner] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  useEffect(() => {
    setUserOwner(user.username === blog.user.username)
  }, [user.username, blog.user.username])

  const authorFormat = <li className='content'> <b>Author: </b> {blog.author} </li>
  const titleFormat = <li className='content'> <b>Title: </b> {blog.title} </li>
  const urlFormat = <li> <b>URL: </b> {blog.url} </li>
  const likesFormat = <li> <b>Likes: </b> {likes} <Button type='button' className='likeButton' onClick={() => handleLike(blog, setLikes, showError, showSuccess)} text='Like' /> </li>
  const userFormat = <li> <b>User: </b> {blog.user.name} </li>
  const removeButtonFormat = <p><Button type='button' className='deleteButton' onClick={() => handleRemoveBlog(blog, blogs, setBlogs, showError, showSuccess)} text='Remove' /></p>

  return (
    <div>
      <ul>
        {titleFormat}
        {authorFormat}
        {urlFormat}
        {likesFormat}
        {userFormat}
        {userOwner ? removeButtonFormat : null}
      </ul>
    </div>
  )
}