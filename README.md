# TOP Blog API

## Summary

A blog site using jamstack to separate out the front-end and back-end, showing users who can comment and read posts and a separate front-end for the admin to CRUD posts.

## Features

## Technical Challenges Overcome

## Key Learnings

## Technologies Used

- **Frontend:** HTML, CSS,
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL, Prisma
- **Authentication:** Passport.js, JWT
- **Validation:** express-validator
- **Utilities:** serve-favicon, dotenv
- **Deployment:**

## Notes

- decide if to use react or not
- two different websites

## Frontend-users

- Set up
- vite react
- using `useEffect` to fetch posts, comments and users

```js
// On login success
localStorage.setItem("token", toke// On login success
localStorage.setItem('token', token);

// On logout
localStorage.removeItem('token');n);

// On logout
localStorage.removeItem("token");
```

## Fronted-admin

- Shouldn't need register
- checking role of user. has to be admin
- shows the same login as user but checks user role
- more like a dashboard
- shows posts in a list
- shows unpublished and published and the ability to switch the posts.
- admin can access all comments and can delete
- Look into [tinyMCE](https://www.tiny.cloud/docs/tinymce/6/cloud-quick-start/) for editing posts.

## Backend

- npm init
- install dependencies
  - prisma
  - prisma schema
  - express
  - jsonwebtoken
  - passport-jwt (store in local storage)
  - bcryptjs
  - express-validator
- create schema and generate and migrate
  - posts
    - id
    - title
    - post
    - user_id
    - publish (boolean)
    - created
    - updated
    - comments
  - users
    - id
    - username
    - password
    - created
    - updated
    - role
    - posts
    - comments
  - comments
    - id
    - comment
    - user_id
    - post_id
    - created
    - updated
- set up jwt token, storing in localstorage, setting up auth to check for token in header
- set up routes

  - posts
    - `app.use('/posts', postsRouter)`
    - Click on user to see their profile
    - `app.use('/posts', postsRouter)`
    - CREATE `postsRouter.post('/:id')`
    - READ `postsRouter.get('/:id')`
    - UPDATE `postsRouter.put('/:id')`
    - DELETE `postsRouter.delete('/:id')`
  - Comments
    - Separate out in `app.use('posts/:id', commentsRouter)`
    - CREATE `postRouter.post('/comments/:id')`
    - READ `postRouter.get('/comments/:id')`
    - UPDATE `postRouter.put('/comments/:id')`
    - DELETE `postRouter.delete('/comments/:id')`
  - index
  - users `app.use('/users', usersRouter)`
    - user can CRUD profile
    - CREATE `usersRouter.post('/:id')`
    - READ `usersRouter.get('/:id')`
    - UPDATE `usersRouter.put('/:id')`
    - DELETE `usersRouter.delete('/:id')`

- middleware

  - auth to check if admin
  - check if logged in for certain routes, can see home page, blog, login and register if not
  - check if comment is current user (won't need middleware can just check in react if the comment is the current-user then show a button)
  - check if profile is current user

- Controllers
  - posts
    - create (admin) ✅
    - read (get comments of post too ) ✅
    - read all (get all posts) ✅
    - update(admin) ✅
    - delete(admin) ✅
  - comments (only users)
    - create (user of comment)✅
    - read not needed
    - update (user of comment)✅
    - delete (user of comment)✅
  - users
    - create (register) ✅
    - read (any show comments too) ✅
    - update (current user === user) ✅
    - delete (current user === user) ✅
  - index
    - read (show home page)
