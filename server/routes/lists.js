const express = require('express')
const dbManager = require('../db')
const {log, error} = require('../customLogger')
const Lists = require('../models/lists')
const router = express.Router()

router.get('/', (req, res) => {

	let filter = {
		// user_id: req.user._id
	}

	start = req.query.start ? parseInt(req.query.start) : 0
	limit = req.query.limit ? parseInt(req.query.limit) : 25

	Lists.find(filter, start, limit)
		.then((result) => {
			res.status(200).json({
				success: true,
				data: result
			})
		})
		.catch((err) => {
			log(err)
			res.send(err)
		})
})

module.exports = router
