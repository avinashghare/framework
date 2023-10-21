// config/passport.js
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy

const GOOGLE_CLIENT_ID = '740319502912-lfbb2ed4lgkv3oe9e6el11u6n53oca4v.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET = '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'

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: 'api/googlelogin/callback'
    //   callbackURL: '/auth/google/callback',
    //   callbackURL: "http://localhost:3000/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('inside passport.js profile', profile)
      console.log('inside passport.js accessToken', accessToken)
      console.log('inside passport.js refreshToken', refreshToken)
      // Handle user authentication and store user data as needed
      //   return profile;
      return done(null, profile)
    }
  )
)

module.exports = passport
