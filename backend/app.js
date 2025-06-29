require("dotenv").config();

const express = require("express");
const passport = require("./middleware/passport"); // configured passport

// middleware
const errorHandler = require("./middleware/errorHandler");

// Routes
const indexRouter = require("./routes/indexRouter");
const loginRouter = require("./routes/loginRouter");
const registerRouter = require("./routes/registerRouter");
const postsRouter = require("./routes/postsRouter");
const commentsRouter = require("./routes/registerRouter");
const usersRouter = require("./routes/usersRouter");

const app = express();

// backend understand json
app.use(express.json());

// parse incoming req bodies
app.use(express.urlencoded({ extended: true }));

// require Auth middleware
require("./middleware/passport");

// Routes
// app.use("/", indexRouter);
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
