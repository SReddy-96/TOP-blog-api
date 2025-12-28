# TOP Blog API

## Summary

A blog site using jamstack to separate out the front-end and back-end, showing users who can comment and read posts and a separate front-end for the admin to CRUD posts.

## Preview

| User                                             | Admin                                             |
| ------------------------------------------------ | ------------------------------------------------- |
| [User walkthrough](https://youtu.be/QLnV7hnDQHg) | [Admin walkthrough](https://youtu.be/Kofs2v7H4fo) |

## Features

- Users can login or register for the blog app.
- Users can see see posts published by admin.
- Admin can create Blog post via TinyMCE and publish when needed.
- Using Postgres to store posts, comments and users.
- Users can add, edit, delete comments.
- Admin can delete all comments.
- Admin had access to a separate dashboard to view the posts and comments.
- Using JsonWebTokens to handle login and log out.

## Technical Challenges Overcome

- Creating the API to work across 2 applications.
- Dealing with both server side validation plus frontend validation.
- Using Json web tokens to handle login and logout and making sure remove the token and setting this up correctly.
- Using the Token to show the CRUD for the users comments and handling login for admin dashboard.
- Correctly setting up the requests to the backend.
- Using `loader` and `action` to separate out the frontend requests, Making the code more readable.
- Making sure the header of the fetch is correct, using Auth and telling the header its JSON data.

## Key Learnings

- How to set up and backend correctly and making it secure with JWT.
- How to handle and use JSONWebTokens.
- Understanding how important CORS is.
- Separating out the react app, with the requests in `file.data.js` and the show end in `file.js`.
- Appling the TinyMCE text editor to the admin page, to add blog posts directly on the web app and save the data in the database.
- Setting up the web tree in `main.jsx` and using loader and action correctly.
- Using the combination of `state` and proper setup with actions and loaders to make using forms simple.
- Making sure to `.env` from the start to make it easier going from dev to prod.
- Using `Fetcher` helps update the UI much faster and stops the user leaving the page when something is CRUD. Makes form submissions super simple alongside `action`.
- Using `.module.css` to compartmentalise the styling of each component. Also, using global styling with buttons.

## Technologies Used

- **Frontend:** HTML, CSS, Vite, eslint, React
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL, Prisma
- **Authentication:** Passport.js, JWT, CORS
- **Validation:** express-validator
- **Utilities:** serve-favicon, dotenv
- **Deployment:** Vercel (Frontend), Railway (Backend)

## Installation and Setup

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (running locally or via a service like Railway)
- Git

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/SReddy-96/TOP-blog-api.git
   cd TOP-blog-api
   ```

2. Navigate to the backend directory (assuming it's in a `backend` folder; adjust if different):

   ```bash
   cd backend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables: Create a `.env` file in the backend root and add:

   ``` env
   DATABASE_URL="postgresql://username:password@localhost:5432/blog_db"
   JWT_SECRET="your-secret-key"
   CORS_ORIGIN="http://localhost:5173,http://localhost:5174"  # Frontend URLs (user and admin)
   ```

   - Replace with your actual database URL and secrets.

5. Set up the database with Prisma:

   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

6. Start the backend server:

   ```bash
   npm start
   ```

   The API will run on `http://localhost:3000` (adjust port if needed).

### Frontend Setup (User)

1. Open a new terminal and navigate to the user frontend directory (assuming it's in a `frontend` folder; adjust if different):

   ```bash
   cd ../frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables: Create a `.env` file in the frontend root and add:

   ``` env
   VITE_API_BASE_URL="http://localhost:3000"
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

   The user app will run on `http://localhost:5173`.

### Frontend Setup (Admin)

1. Open another new terminal and navigate to the admin frontend directory (assuming it's in a `frontend-admin` folder; adjust if different):

   ```bash
   cd ../frontend-admin
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables: Create a `.env` file in the frontend-admin root and add:

   ```env
   VITE_API_BASE_URL="http://localhost:3000"
   VITE_TINYMCEKEY="your-tinymce-api-key"  # Get from TinyMCE dashboard
   ```

   - Replace `your-tinymce-api-key` with your actual TinyMCE API key.

4. Start the development server:

   ```bash
   npm run dev
   ```

   The admin app will run on `http://localhost:5174` (adjust port if needed).

### Deployment

- **Backend:** Deploy to Railway (or similar) by connecting your repo and setting environment variables.
- **Frontend (User):** Deploy to Vercel (or similar) by connecting your repo and setting `VITE_API_BASE_URL` to your deployed backend URL.
- **Frontend (Admin):** Deploy similarly, including the `VITE_TINYMCEKEY`.

For production, ensure CORS and JWT are configured securely.
