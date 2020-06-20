const dbManager = require('../db')
const {log, error} = require('../customLogger')
const User = require('../models/users')

exports.activateUser = (req, res) => {
	let {u: username, c: activationCode} = req.query

	log(username)
	log(activationCode)

	User.find({
		username
	})
	.then((user) => {
		if (!user) {
			return res.send(`User doesn't exist`)
		} else {
			let timediff = new Date() - user.invitation_date

			log(timediff)

			if (timediff > 1000 * 60 * 60 * 24) {
				return res.send('The request has expired')
			} else if (activationCode !== user.activation_code) {
				return res.send('Invalid activation request')
			} else {
				User.update(user._id, {
					verified: true
				})
				req.login(user, (err) => {
				  if (err) { 
				  	log(err)
				  	return next(err) 
				  }
				  return res.redirect('/');
				});
			}
		}
	})
}