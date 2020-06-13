const {ObjectID} = require('mongodb') 
const dbManager = require('../db')

exports.create = (lists) => {
	db = dbManager.getDb()

	return db.collection('lists').insertMany(lists)
}

exports.find = (query, start, limit) => {

	const db = dbManager.getDb()

	return db.collection('lists').find(query).skip(start).limit(limit).toArray()
}