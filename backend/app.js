require("dotenv").config();

const express = require("express");
const cors = require("cors");
const passport = require("./middleware/passport"); // configured passport

// middleware
const errorHandler = require("./middleware/errorHandler");

// Routes
const indexRouter = require("./routes/indexRouter");
const loginRouter = require("./routes/loginRouter");
const registerRouter = require("./routes/registerRouter");
const postsRouter = require("./routes/postsRouter");
const commentsRouter = require("./routes/commentsRouter");
const usersRouter = require("./routes/usersRouter");

const app = express();

// enable CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173", // your frontend URL
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// backend understand json
app.use(express.json());

// parse incoming req bodies
app.use(express.urlencoded({ extended: true }));

// require Auth middleware
require("./middleware/passport");

// Routes
app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);

// Auth checker
const requireAuth = passport.authenticate("jwt", { session: false });

// protected Routes
app.use("/posts", requireAuth, postsRouter);
app.use("/posts/:postId/comments", requireAuth, commentsRouter);
app.use("/users", requireAuth, usersRouter);

// error handler
app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(3000, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
