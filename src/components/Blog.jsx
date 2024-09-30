import { useState, useEffect } from "react";
import { Button } from "./small";
import { BlogThings } from "./BlogThings";
import { useNotification } from "../NotificationContext";
import { useMutation } from "@tanstack/react-query";
import blogService from "../services/blogs";

export const Blog = ({ blog, user, setBlogs }) => {
  const [details, setDetails] = useState(false);
  const toggleShow = () => setDetails(!details);
  const { showSuccess, showError } = useNotification();

  const likeMutation = useMutation({
    mutationFn: async () => {
      const updatedBlog = await blogService.updateLike(blog.id, {
        ...blog,
        likes: blog.likes + 1,
      });
      return updatedBlog;
    },
    onSuccess: (data) => {
      setBlogs((prevBlogs) =>
        prevBlogs.map((b) => (b.id === data.id ? data : b))
      );
      showSuccess(`Liked blog "${data.title}" by ${data.author}`);
    },
    onError: (error) => {
      showError(error.response?.data?.error || "Failed to like blog");
    },
  });

  const removeMutation = useMutation({
    mutationFn: async () => {
      await blogService.remove(blog.id);
    },
    onSuccess: () => {
      setBlogs((prevBlogs) => prevBlogs.filter((b) => b.id !== blog.id));
      showSuccess(`Removed blog "${blog.title}" by ${blog.author}`);
    },
    onError: (error) => {
      showError(error.response?.data?.error || "Failed to remove blog");
    },
  });

  const blogButton = (
    <Button
      className="blogButton"
      type="button"
      onClick={toggleShow}
      text={blog.title}
    />
  );

  return (
    <div className="blog">
      {blogButton}
      {details && (
        <BlogThings
          blog={blog}
          user={user}
          likeMutation={likeMutation}
          removeMutation={removeMutation}
        />
      )}
    </div>
  );
};

export default Blog;
