import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import "./index.css";

// routes
import Index from "./components/index/index";
import Login from "./components/login/login";
import { action as loginAction } from "./components/login/login.data";
import Register from "./components/register/register";
import { action as registerAction } from "./components/register/register.data";
import Post from "./components/post/post";
import {
  loader as postLoader,
  action as postAction,
  deleteCommentAction,
  editCommentAction,
} from "./components/post/post.data";
import Posts from "./components/posts/posts";
import { loader as postsLoader } from "./components/posts/posts.data";
import Profile from "./components/profile/profile";
import {
  loader as userLoader,
  editUserAction,
  deleteUserAction,
} from "./components/profile/profile.data";
import Root from "./components/root/root";

// add routes to pages !!!
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          { path: "login", action: loginAction, element: <Login /> },
          { path: "register", action: registerAction, element: <Register /> },
          {
            path: "posts",
            loader: postsLoader,
            element: <Posts />,
          },
          {
            path: "posts/:postId",
            loader: postLoader,
            action: postAction,
            element: <Post />,
            children: [
              {
                path: "comments/:commentId",
                action: deleteCommentAction,
              },
              {
                path: "comments/:commentId/edit",
                action: editCommentAction,
              },
            ],
          },
          {
            path: "users/:userId",
            loader: userLoader,
            element: <Profile />,
            children: [
              {
                path: "edit",
                action: editUserAction,
              },
              {
                path: "delete",
                action: deleteUserAction,
              },
            ],
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
