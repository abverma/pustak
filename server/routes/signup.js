const express = require('express')
const dbManager = require('../db')
const {log, error} = require('../customLogger')
const User = require('../models/user')
const List = require('../models/lists')

const router = express.Router()

router.post('/', (req, res) => {
	delete req.body.submit
	let {username, password} = req.body

	User.find({
		username
	})
	.then((user) => {
		if (user) {
			log('User exists')
			return Promise.resolve()
		} else {
			log('Creating user')
			return User.create(req.body)
		}
	})
	.then((result) => {
		if (result) {
			log('User created')
			log(result.ops)
			req.flash('info', 'User created')
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
		
})

router.get('/', (req, res) => {
	res.render('signup')
})

module.exports = router