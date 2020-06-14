const express = require('express')
const dbManager = require('../db')
const {log, error} = require('../customLogger')
const User = require('../models/user')
const List = require('../models/lists')
const mailer = require('../util/mailer')
const crypto = require('crypto')

const router = express.Router()

const createActivationCode = (user) => {
  const setAt = new Date()
  const temp = user.username + setAt.toISOString() + setAt.toISOString()
  const code = crypto.createHash('sha1').update(temp).digest('hex')
  return code
}

router.post('/', (req, res) => {
	delete req.body.submit
	let {username, password} = req.body

	let newUser = Object.assign({
		creation_date: new Date(),
		invitation_date: new Date(),
		verified: false
	}, req.body)

	console.log(newUser)

	User.find({
		username
	})
	.then((user) => {
		if (user) {
			log('User exists')
			return Promise.resolve()
		} else {
			log('Creating user')
			newUser.activation_code = createActivationCode(newUser)
			return User.create(newUser)
		}
	})
	.then((result) => {
		if (result) {
			log('User created')
			log(result.ops)
			mailer.sendSignupNotification(newUser)
			mailer.sendActivationMail(newUser, req)
		} else {
			req.flash('info', 'User already exists')
			res.redirect('/signup')
		}
	})
	.then(() => {
		req.flash('info', 'User created. \nA verification mail has been sent to you.')
		res.redirect('/login')
	})
	.catch((err) => {
		error(err)
		res.render('error')
	})
		
})

router.get('/', (req, res) => {
	res.render('signup')
})

module.exports = router