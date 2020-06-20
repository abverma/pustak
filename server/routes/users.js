const express = require('express')
const dbManager = require('../db')
const {log, error} = require('../customLogger')
const router = express.Router()


router.get('/', (req, res) => {
	res.send({
		success: true,
		data: req.user
	})
})

module.exports = router