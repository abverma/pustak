const express = require('express')
const dbManager = require('../db')
const {log, error} = require('../customLogger')
const User = require('../models/users')
const List = require('../models/lists')
const mailer = require('../util/mailer')
const crypto = require('crypto')
const { body, check, validationResult } = require('express-validator')


const router = express.Router()

const createActivationCode = (user) => {
  const setAt = new Date()
  const temp = user.username + setAt.toISOString() + setAt.toISOString()
  const code = crypto.createHash('sha1').update(temp).digest('hex')
  return code
}

router.post('/', [
		check('fullname', 'First Name is required').notEmpty(),
	    check('username', 'Email is required').notEmpty(),
	    check('username', 'Email is not valid.').isEmail(),
	    check('password', 'Password is required').notEmpty(),
	    check('confirmPassword', 'Confirm Password is required').notEmpty(),
	    body('confirmPassword', 'Passwords do not match')
	    .custom((value, { req })  => {
	    	if (value !== req.body.password) {
			    throw new Error('Password confirmation does not match password')
			}
			  
			// Indicates the success of this synchronous custom validator
			return true
	    })
	],
	(req, res) => {
	delete req.body.submit

	const errors = validationResult(req)

	console.log(errors.array())

	if (!errors.isEmpty()) {
        res.render('signup', {
            errors: errors.array()
        })
    } else {
    	let {username, password} = req.body

		let newUser = Object.assign({
			creation_date: new Date(),
			invitation_date: new Date(),
			verified: false
		}, req.body)

		newUser.username = newUser.username.toLowerCase()
		delete newUser.confirmPassword
		console.log(newUser)

		User.find({
			username: username.toLowerCase()
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
				req.flash('info', 'User created. \nA verification mail has been sent to you.')
				res.redirect('/login')
			} else {
				req.flash('info', 'User already exists')
				res.redirect('/signup')
			}
		})
		.catch((err) => {
			error(err)
			res.render('error')
		})
    }
})

router.get('/', (req, res) => {
	res.render('signup')
})

module.exports = router