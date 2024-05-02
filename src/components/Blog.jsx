import { useState, useEffect } from 'react'
import { Button } from './small'
import { BlogThings } from './BlogThings'


export const Blog = ({ blog, blogs, user, setBlogs, showSuccess, showError}) => {
  const [details, setDetails] = useState(false)
  const toggleShow = () => setDetails(!details)


  const blogButton = (
    < Button
      className='blogButton'
      type='button'
      onClick={toggleShow}
      text={blog.title}
    />
  )


  return (
    <div className='blog'>
      {blogButton}
      {details && <BlogThings blog={blog} blogs={blogs} user={user} setBlogs={setBlogs} showSuccess={showSuccess} showError={showError} />}
    </div>
  )
}


export default Blog