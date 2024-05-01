import {useState, useEffect} from 'react'
import {Button} from './small'
import blogService from '../services/blogs'
import { all } from 'axios'


export const Blog = ({ blog, showSuccess, showError, user, handleRemoveBlog }) => {
  const [details, setDetails] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const [userOwner, setUserOwner] = useState(false)
  const toggleShow = () => setDetails(!details)

  useEffect(() => {
    setUserOwner(user.username === blog.user.username)
  }, [user.username, blog.user.username])


  const Formatting = ({ blog }) => {
    const authorFormat = <li> <b>Author: </b> {blog.author} </li>
    const urlFormat = <li> <b>URL: </b> {blog.url} </li>
    const likesFormat = <li> <b>Likes: </b> {likes} <Button className='likeButton' onClick={() => handleLike(blog.id)} text='Like' /> </li>
    const userFormat = <li> <b>User: </b> {blog.user.name} </li>
    const removeButtonFormat = <p><Button className='deleteButton' onClick={() => handleRemoveBlog(blog)} text='Remove' /></p>
  
    return (
      <div>
        <ul>
        {authorFormat}
        {urlFormat}
        {likesFormat}
        {userFormat}
        {userOwner ? removeButtonFormat : null}
        </ul>
      </div>
    )
  }

  const handleLike = (blogId) => {

    blogService
      .updateLike(blog.id, blog)
      .then(updatedBlog => {
        setLikes(updatedBlog.likes)
        showSuccess(`Liked blog "${blog.title}" by ${blog.author}`)
      })
      .catch(error => {
        showError(`Failed to like blog: ${error.response.data.error}`)
      })
  }


  return (
    <div>
      <Button className='blogButton' onClick={toggleShow} text={blog.title} /> 
      {details && <Formatting key={blog.id} blog={blog} />}
    </div>
  )
}


export default Blog