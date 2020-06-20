const express = require('express')
const dbManager = require('../db')
const {log, error} = require('../customLogger')
const Books = require('../models/books')
const router = express.Router()
const axios = require('axios')
const parseString = require('xml2js').parseString
let url = 'https://www.goodreads.com/search/index.xml'

router.get('/', (req, res) => {

	let filter = req.query 
	filter['user_id'] = req.user._id

	start = req.query.start ? parseInt(req.query.start) : 0
	limit = req.query.limit ? parseInt(req.query.limit) : 25

	delete filter.start
	delete filter.limit
	const books = Books.find(filter, start, limit)
	const count = Books.getCount(filter)

	Promise.all([books, count])
		.then((result) => {
			res.status(200).json({
				success: true,
				data: result[0],
				count: result[1]
			})
		})
		.catch((err) => {
			log(err)
			res.send(err)
		})
})

router.get('/search', (req, res) => {

	let name = req.query.title
	axios.get(url + '?key=' + process.env.GOODREADS_KEY + '&q=' + name)
	.then(resp => {
		parseString(resp.data, function (err, result) {
			let books = result.GoodreadsResponse.search[0].results[0].work
			let resdata = []

			if (books && books.length) {
				books.forEach((data) => {
					let book = {}
					book['goodread_id'] = data.best_book[0].id._
					book['title'] = data.best_book[0].title[0]
					book['author'] = data.best_book[0].author[0].name[0]
					book['average_rating'] = data.average_rating
					book['image_url'] = data.best_book[0].image_url
					book['small_image_url'] = data.best_book[0].small_image_url
					resdata.push(book)
				})
			}
			
			res.send({
				success: true,
				data: resdata,
				count: resdata.length
			})
		})
	})
	.catch(error => {
		console.log(error)
	    res.send(error)
	})
})

router.post('/', (req, res) => {

	let book = req.body
	book.user_id = req.user._id
	book.last_update_date = new Date()
	book.list_update_date = new Date()
	log(book)

	Books.update(book)
	.then((result) => {
		res.send({
			success: true
		})
	})
	.then((err) => {
		error(err)
		res.status(500)
	})
})

module.exports = router