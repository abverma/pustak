const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('./models/user')
const {logger, log, error} = require('./customLogger')
const bcrypt = require('bcrypt')


passport.use(new LocalStrategy((username, password, done) => {

  	User.find({
  		username
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