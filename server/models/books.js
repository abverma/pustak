const {ObjectID} = require('mongodb') 
const dbManager = require('../db')

exports.findBooks = (query, start, limit) => {

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

exports.findLists = (query, start, limit) => {

	const db = dbManager.getDb()

	return db.collection('lists').find(query).skip(start).limit(limit).toArray()
}

exports.getCount = (query) => {
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