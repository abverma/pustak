const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const TwitterStrategy = require('passport-twitter').Strategy;
const FBStrategy = require('passport-facebook').Strategy;
const User = require('./models/users')
const {logger, log, error} = require('./customLogger')
const bcrypt = require('bcrypt')


passport.use(new LocalStrategy((username, password, done) => {

  	User.find({
  		username: username.toLowerCase()
  	})
	.then((myuser) => {
		log('Authenticating')

		if (!myuser) {
			log('User not found')
			return done(null, false, {message: 'User not found'})
		}

		if (!myuser.verified) {
			return done(null, false, {message: 'User not verifed. Please check verification email sent to you.'})
		}
		
		bcrypt.compare(password, myuser.password)
		.then(function(result) {
		    if (result) {
		    	log('Password match')
				return done(null, myuser)
		    } else {
		    	log('Password mismatch')
				return done(null, false, {message: 'Password mismatch'})
		    }
		})
	})
	.catch((err) => {
		error(err)
		return done(err, false)
	})
	
}))

passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_API_KEY,
    consumerSecret: process.env.TWITTER_SECRET,
    callbackURL: '/oauth/twitter/callback'
	},
	function(token, tokenSecret, profile, cb) {

		User.findOrCreate({ 
			twitterId: profile.id 
		}, {
			twitterId: profile.id,
			fullname: profile.displayName,
			username: profile.username
		})
		.then((user) => {
		  return cb(null, user)
		})
		.catch((err) => {
			return cb(err, false)
		})

	})
)

passport.use(new FBStrategy({
    clientID: process.env.FB_APP_ID,
    clientSecret: process.env.FB_SECRET,
    callbackURL: '/oauth/facebook/callback'
  },
  function(accessToken, refreshToken, profile, cb) {
   
   	console.log(profile)
    User.findOrCreate({ 
			facebookId: profile.id 
		}, {
			facebookId: profile.id,
			fullname: profile.displayName,
		})
		.then((user) => {
		  return cb(null, user)
		})
		.catch((err) => {
			return cb(err, false)
		})
  })
)

passport.serializeUser(function(user, done) {
	done(null, user._id)
})

passport.deserializeUser(function(id, done) {
	User.findById(id)
	.then((myuser) => {
		done(null, myuser)
	})
	.catch((err) => {
		error(err)
		done(err, false)
	})
})

module.exports = passport 