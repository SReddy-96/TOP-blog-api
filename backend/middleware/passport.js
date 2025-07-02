const passport = require("passport");
const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET || "your_jwt_secret";

// Local strategy for login (issue JWT on success)
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await db.getUserByUsername(username);
      if (!user) {
        return done(null, false, { message: "Incorrect username or password" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect username or password" });
      }
      // Success: pass user to controller to sign JWT
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

// JWT strategy for protected routes
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_SECRET,
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await db.getUserById(jwt_payload.id);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

module.exports = passport;