const BlogForm = ({ title, setTitle, author, setAuthor, url, setUrl, handleCreateBlog }) => {
    return <div>
      <h3> Create new blogs </h3>
      <form onSubmit={handleCreateBlog}>
        <input type="text" value={title} placeholder="Title" name="title" onChange={({target}) => setTitle(target.value)} />
        <br />
        <input type="text" value={author} name="author" placeholder="Author" onChange={({target}) => setAuthor(target.value)} />
        <br />
        <input type="text" value={url} name="url" placeholder="URL" onChange={({target}) => setUrl(target.value)} />
        <br />
        <button type="submit">Create</button>
      </form>
    </div>
}

export default BlogForm