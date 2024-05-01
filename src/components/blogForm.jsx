import { useState } from "react"
import { Button, Input } from "./small"


export const BlogForm = ({ handleCreateBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  // handle content changes
  const handleTitleChange = (event) => setTitle(event.target.value)
  const handleAuthorChange = (event) => setAuthor(event.target.value)
  const handleUrlChange = (event) => setUrl(event.target.value)
  const resetInputs = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  // button style
  const buttonStyle = {
    cursor: 'pointer'
  }

  // add blog
  const addBlog = async (event) => {
    event.preventDefault()

    handleCreateBlog({
      title: title,
      author: author,
      url: url
    })

    resetInputs()
  } 

    return <div>
      <h3> Create new blogs </h3>
      <form onSubmit={addBlog}>
        <Input text="Title" type="text" placeholder="Title" value={title} name="title" onChange={handleTitleChange} />
        <Input text="Author" type="text" placeholder="Author" value={author} name="author" onChange={handleAuthorChange} />
        <Input text="URL" type="text" placeholder="URL" value={url} name="url" onChange={handleUrlChange} />
        <br />
        <Button style={buttonStyle} type="submit" text="Create" />
      </form>
    </div>
}

export default BlogForm