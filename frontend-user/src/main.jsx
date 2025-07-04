import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import "./index.css";

// routes
import Index from "./components/index";
import Login from "./components/login";
import Register from "./components/register";
import Post from "./components/post";
import {
  loader as postLoader,
  action as postAction,
} from "./components/post/post.data";
import Posts from "./components/posts";
import { loader as postsLoader } from "./components/posts/posts.data";
import Profile from "./components/profile";
import Root from "./components/root";

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
          { path: "login", element: <Login /> },
          { path: "register", element: <Register /> },
          {
            path: "posts",
            loader: postsLoader,
            element: <Posts />,
            children: [
              {
                path: ":postId",
                loader: postLoader,
                action: postAction,
                element: <Post />,
              },
            ],
          },
          { path: "users/:userid", element: <Profile /> },
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
