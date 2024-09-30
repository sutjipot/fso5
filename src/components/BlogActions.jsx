import blogService from "../services/blogs";

export const likeBlog = (blog, likeMutation) => {
  const updatedLikes = { ...blog, likes: blog.likes + 1 };
  likeMutation.mutate(updatedLikes);
};

export const removeBlog = (blog, removeMutation, showSuccess, showError) => {
  if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}?`)) {
    removeMutation.mutate(blog.id);
  }
};
