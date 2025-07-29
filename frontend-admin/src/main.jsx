import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import "./index.css";

import Root from "./components/root/root";
import Index from "./components/index/index";
import { loader as indexLoader } from "./components/index/index.data";
import NewPost from "./components/newPost/newPost";
import { action as NewPostAction } from "./components/newPost/newPost.data";
import Login from "./components/login/login";
import { action as loginAction } from "./components/login/login.data";
import EditPost from "./components/editPost/editPost";
import {
  action as editPostAction,
  loader as editPostLoader,
} from "./components/editPost/editPost.data";
import Profile from "./components/profile/profile";
import {
  loader as userLoader,
  editUserAction,
} from "./components/profile/profile.data";
import Post from "./components/post/post";
import {
  loader as postLoader,
  action as postAction,
  deleteCommentAction,
  editCommentAction,
} from "./components/post/post.data";
import DeletePost from "./components/deletePost/deletePost";
import {
  loader as DeletePostLoader,
  action as DeletePostAction,
} from "./components/deletePost/deletePost.data";
import DeleteProfile from "./components/deleteProfile/deleteProfile";
import {
  action as DeleteProfileAction,
  loader as DeleteProfileLoader,
} from "./components/deleteProfile/deleteProfile.data";

// auth checker middleware
import RequireAuth from "./components/requireAuth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            loader: indexLoader,
            element: (
              <RequireAuth>
                <Index />
              </RequireAuth>
            ),
          },
          { path: "login", action: loginAction, element: <Login /> },
          {
            path: "newPost",
            action: NewPostAction,
            element: (
              <RequireAuth>
                <NewPost />
              </RequireAuth>
            ),
          },
          {
            path: "users/:userId",
            loader: userLoader,
            element: (
              <RequireAuth>
                <Profile />
              </RequireAuth>
            ),
            children: [
              {
                path: "edit",
                action: editUserAction,
              },
            ],
          },
          {
            path: "users/:userId/delete",
            loader: DeleteProfileLoader,
            action: DeleteProfileAction,
            element: (
              <RequireAuth>
                <DeleteProfile />
              </RequireAuth>
            ),
          },
          {
            path: "posts/:postId",
            loader: postLoader,
            action: postAction,
            element: (
              <RequireAuth>
                <Post />
              </RequireAuth>
            ),
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
            path: "posts/:postId/edit",
            loader: editPostLoader,
            action: editPostAction,
            element: (
              <RequireAuth>
                <EditPost />
              </RequireAuth>
            ),
          },
          {
            path: "posts/:postId/delete",
            loader: DeletePostLoader,
            action: DeletePostAction,
            element: (
              <RequireAuth>
                <DeletePost />
              </RequireAuth>
            ),
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
