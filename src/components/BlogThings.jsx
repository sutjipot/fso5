import { Button } from "./small";

export const BlogThings = ({ blog, user, likeMutation, removeMutation }) => {
  const isUser = user.username === blog.user.username;

  const handleLike = () => {
    likeMutation.mutate();
  };

  const handleRemove = () => {
    if (
      window.confirm(
        `Are you sure you want to remove "${blog.title}" by ${blog.author}?`
      )
    ) {
      removeMutation.mutate(blog.id);
    }
  };

  return (
    <div>
      <ul>
        <li className="content">
          <b>Title: </b> {blog.title}
        </li>
        <li className="content">
          <b>Author: </b> {blog.author}
        </li>
        <li>
          <b>URL: </b> {blog.url}
        </li>
        <li>
          <b>Likes: </b> {blog.likes}
          <Button
            type="button"
            className="likeButton"
            onClick={handleLike}
            text="Like"
          />
        </li>
        <li>
          <b>User: </b> {blog.user.name}
          {isUser && (
            <Button
              type="button"
              className="deleteButton"
              onClick={handleRemove}
              text="Remove"
            />
          )}
        </li>
      </ul>
    </div>
  );
};

export default BlogThings;
