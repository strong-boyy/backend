const passport = require("passport");
const config = require("../src/config/index");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: config.google.clientID,
      clientSecret: config.google.clientSecret,
      callbackURL: config.google.callbackUrl,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = {
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          avatar: profile.photos[0].value,
        };
        done(null, user); 
      } catch (error) {
        done(error, null);
      }
    }
  )
);

// Lưu thông tin user vào session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Lấy user từ session
passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
