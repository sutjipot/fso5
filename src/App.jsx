import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import {
  ErrorNotification,
  SuccessNotification,
} from "./components/notifications";
import { Button } from "./components/small";
import { BlogForm } from "./components/blogForm";
import { LoginForm } from "./components/loginForm";
import { Togglable } from "./components/togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { useNotification } from "./NotificationContext";
import { NotificationProvider } from "./NotificationContext";
import QueryProvider from "./QueryProvider";
import { useQuery } from "@tanstack/react-query";
import { UserProvider, useUser } from "./UserContext";

const App = () => {
  const { state, setUser, logoutUser } = useUser();
  const { user } = state;
  const {
    state: { successMessage, errorMessage },
    showSuccess,
    showError,
  } = useNotification();

  const buttonStyle = {
    cursor: "pointer",
  };

  const blogFormRef = useRef();

  // get all blogs
  const { data: blogs = [], refetch } = useQuery({
    queryKey: "blogs",
    queryFn: blogService.getAll,
  });

  // get logged user
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBloglistUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  // handle login
  const handleLogin = (userObjects) => {
    loginService
      .login(userObjects)
      .then((returnedUser) => {
        setUser(returnedUser);
        blogService.setToken(returnedUser.token);
        window.localStorage.setItem(
          "loggedBloglistUser",
          JSON.stringify(returnedUser)
        );
        showSuccess(`Welcome ${returnedUser.name}, you are logged in`);
      })
      .catch((error) => {
        showError(`Wrong credentials ${error.response.data.error}`);
      });
  };

  // handle logout
  const handleLogout = async (event) => {
    event.preventDefault();

    try {
      setUser(null);
      window.localStorage.clear();
      blogService.setToken(null);
      showSuccess("Logged out");
    } catch (exception) {
      showError("Failed to logout");
    }
  };

  // handle create blog
  const handleCreateBlog = (blogObjects) => {
    blogFormRef.current.toggleVisibility();

    blogService
      .create(blogObjects)
      .then((createdBlog) => {
        refetch();
        showSuccess(
          `A new blog "${createdBlog.title}" by ${createdBlog.author} added`
        );
      })
      .catch((error) => {
        showError(`Failed to create a new blog: ${error.response.data.error}`);
      });
  };

  // show user
  const showUser = () => {
    return (
      <div>
        <p>{user.name} logged in</p>{" "}
        <Button
          type="button"
          style={buttonStyle}
          onClick={handleLogout}
          text="Log Out"
        ></Button>
      </div>
    );
  };

  // show blogs
  const showBlogs = () => {
    blogs.sort((a, b) => b.likes - a.likes);
    return (
      <div>
        <h3> Click Blog for Details</h3>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            blogs={blogs}
            user={user}
            showSuccess={showSuccess}
            showError={showError}
          />
        ))}
      </div>
    );
  };

  // login view component
  const loginPage = () => {
    return <LoginForm handleLogin={handleLogin} />;
  };

  // blog view component
  const blogPage = () => {
    return (
      <div>
        {showUser()}

        <Togglable buttonLabel="Create a new blog" ref={blogFormRef}>
          <BlogForm handleCreateBlog={handleCreateBlog} />
        </Togglable>

        {blogs.length === 0 ? <p>No blogs available</p> : showBlogs()}
      </div>
    );
  };

  return (
    <div>
      <h2> Blog List </h2>
      <ErrorNotification message={errorMessage} />
      <SuccessNotification message={successMessage} />

      {user === null ? loginPage() : blogPage()}
    </div>
  );
};

const Wrapped = () => (
  <QueryProvider>
    <NotificationProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </NotificationProvider>
  </QueryProvider>
);

export default Wrapped;
