const express = require('express')
const dbManager = require('../db')
const {log, error} = require('../customLogger')
const Books = require('../models/books')
const router = express.Router()

router.get('/', (req, res) => {

	let filter = req.query 
	filter['user_id'] = req.user._id

	start = req.query.start ? parseInt(req.query.start) : 0
	limit = req.query.limit ? parseInt(req.query.limit) : 25

	delete filter.start
	delete filter.limit
	Books.findBooks(filter, start, limit)
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

router.get('/lists', (req, res) => {

	let filter = {
		user_id: req.user._id,
	}

	start = req.query.start ? parseInt(req.query.start) : 0
	limit = req.query.limit ? parseInt(req.query.limit) : 25

	Books.findLists(filter, start, limit)
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

router.post('/', (req, res) => {

	let intake = req.body
	let userId = req.user._id

	log(intake)

	dbManager.updateIntake(intake, userId)
	.then((result) => {
		res.send({
			success: true
		})
	})
	.then((err) => {
		erro(err)
		res.status(500)
	})
})

module.exports = router