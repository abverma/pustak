const {ObjectID} = require('mongodb') 
const dbManager = require('../db')

exports.find = (query, start, limit) => {

	const db = dbManager.getDb()

	let match = { 
		user_id:  ObjectID(query.user_id)
	}

	if (query && query.hasOwnProperty('title') && query.title) {
		match['$text'] = { 
			'$search': '\"'+query.title+'\"' 
		}
	}

	if (query && query.hasOwnProperty('list') && query.list) {
		match['list'] = query.list
	}

	let pipelines = [{
		'$match': match
	},
	{
		'$sort': {
			'last_update_date': -1,
			'creation_date': -1
		}
	}, 
	{	
		'$skip': start
	},
	{
		'$limit': limit
	}]

	return db.collection('books').aggregate(pipelines).toArray()
}


exports.getCount = (query) => {
	const db = dbManager.getDb()

	let match = { 
		user_id:  ObjectID(query.user_id)
	}

	if (query && query.hasOwnProperty('title') && query.title) {
		match['$text'] = { 
			'$search': '\"'+query.title+'\"' 
		}
	}

	if (query && query.hasOwnProperty('list') && query.list) {
		match['list'] = query.list
	}

	return db.collection('books').countDocuments(match)
}

exports.update = (book, id) => {
	const db = dbManager.getDb()

	if (book._id) {
		delete book._id
		return db.collection('books').updateOne({'_id': ObjectID(id)}, {
			$set: book
		})
	} else {
		return db.collection('books').insertOne(book)
	}
	
}