const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const GOOGLE_CLIENT_ID = "934069972797-i7eip628dcggt00e74q9hvk5j4ieu6m0.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/auth/google/callback",
  passReqToCallback: true,
},

function(request, accessToken, refreshToken,params, profile, done) {
  console.log(params)
  return done(null, profile);
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
