const {ObjectID} = require('mongodb')
const dbManager = require('../db')
const bcrypt = require('bcrypt')


exports.findById = (id) => {
  	const db = dbManager.getDb()

	return db.collection('users').findOne({
		_id: ObjectID(id)
	})
}

exports.find = (query) => {
  	const db = dbManager.getDb()

	return db.collection('users').findOne(query)
}

exports.create = (user) => {
	const db = dbManager.getDb()

	return new Promise((resolve, reject) => {
		bcrypt.hash(user.password, 10)
		.then((hash) => {
			user.password = hash
		    return db.collection('users').insertOne(user, {
				forceServerObjectId: false
			})
		})
		.then(resolve)
		.catch(reject)
	})
	
}

exports.update = (id, updateObj) => {
  	const db = dbManager.getDb()

	return db.collection('users').updateOne({_id: ObjectID(id)}, {$set: updateObj})
}