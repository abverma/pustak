const {MongoClient, ObjectID} = require('mongodb')
const {logger, log, error} = require('./customLogger')
const {
	DB_USERNAME, 
	DB_PASSWORD, 
	DB_HOST, 
	DB_PORT, 
	DB_NAME,
	TEST_DB_HOST, 
	TEST_DB_PORT, 
	TEST_DB_NAME, 
	LOG_LEVEL } = process.env

let uri
console.log('Node Env: ' + process.env.NODE_ENV)
if (process.env.NODE_ENV == 'test') {
	uri = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${TEST_DB_HOST}:${TEST_DB_PORT}/${TEST_DB_NAME}?retryWrites=true&w=majority&connectTimeoutMS=300000`
} else if (DB_HOST == 'localhost' || DB_HOST == '0.0.0.0') {
	uri = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}?retryWrites=true&w=majority&connectTimeoutMS=300000`
} else {
	uri = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?retryWrites=true&w=majority&connectTimeoutMS=300000`
}

const client = new MongoClient(uri, { 
	useUnifiedTopology: true,
	loggerLevel: LOG_LEVEL,
	logger: log 
})

let db = null 

exports.connect = (callback) => {

		client.connect(err => {
			if (err) {
				error(err)
				if (callback) {
					return callback(err)
				} else {
					return Promise.reject(err)
				}
			}

			log('Connection successful!')
			db = process.env.NODE_ENV == 'test' ? client.db(TEST_DB_NAME) : client.db(DB_NAME)

			if (callback) {
				return callback(null, db)
			} else {
				return Promise.resolve(db)
			}
			
		})
}

exports.getDb = () => {
	return db
}

exports.getUri = () => {
	return uri
}

exports.close = () => {
	client.close()
		.then(() => {
			log('Connection closed!')
		})
		.catch((err) => {
			error(err)
			error('Error in closing connection!')
		})
}
