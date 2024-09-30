import blogService from "../services/blogs";

export const handleLike = (blog, setLikes, showSuccess, showError) => {
  blogService
    .updateLike(blog.id, blog)
    .then((updatedBlog) => {
      setLikes(updatedBlog.likes);
      showSuccess(`Liked blog "${blog.title}" by ${blog.author}`);
    })
    .catch((error) => {
      if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.error
      ) {
        showError(`Failed to like blog : ${error.response.data.error}`);
      } else {
        showError("Failed to like blog: An unexpected error occurred");
      }
    });
};

export const handleRemoveBlog = (
  blog,
  blogs,
  setBlogs,
  showSuccess,
  showError
) => {
  const blogId = blog.id;
  const blogTitle = blog.title;

  if (window.confirm(`Remove blog "${blogTitle}" by ${blog.author}`)) {
    blogService
      .remove(blogId)
      .then(() => {
        setBlogs(blogs.filter((n) => n.id !== blogId));
        showSuccess(`Blog "${blogTitle}" by ${blog.author} removed`);
      })
      .catch((error) => {
        showError(`Failed to remove blog : ${error.response.data.error}`);
      });
  }
};
