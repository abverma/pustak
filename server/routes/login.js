const express = require('express')
const passport = require('../passport')
const router = express.Router()

router.get('/', (req, res) => {
	res.render('login')
})

router.get('/twitter',
	passport.authenticate('twitter')
)

router.get('/facebook',
	passport.authenticate('facebook')
)

router.post('/',
	passport.authenticate('local', { 
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true
	})
)

router.post('/session',
	passport.authenticate('local', { 
		failureRedirect: '/login',
	}), (req, res) => {
		res.send('ok')
	})

module.exports = router
