//npms
const dotenv = require('dotenv')
const express = require('express')
const session = require('express-session')
const flash = require('express-flash')
const exphbs  = require('express-handlebars')
const MongoDBStore = require('connect-mongodb-session')(session)
const bodyParser = require('body-parser')
const path = require('path')

//app modules
dotenv.config()
const {logger, log, error} = require('./customLogger')
const dbManager = require('./db')
const passport = require('./passport')
const books = require('./routes/books')
const login = require('./routes/login')
const signup = require('./routes/signup')
const lists = require('./routes/lists')

//constants
const app = express()
const publicDir = path.join(__dirname, './public')
const clientDir = path.join(__dirname, '../client/dist')
const store = new MongoDBStore({
  uri: dbManager.getUri(),
  collection: 'sessions'
})
const isLoggedIn = (req, res, next) => {
	if (req.user) {
		next()
	} else {
		log('User not logged in. Redirectng to /.')
		res.redirect('/login')
	}
}

addMiddlewares()
addRoutes()
app.listen(process.env.PORT, process.env.HOST, listen())

function addMiddlewares() {
	app.engine('handlebars', exphbs())
	app.set('views', publicDir)
	app.set('view engine', 'handlebars')
	app.use(logger)
	app.use(express.json()) // for parsing application/json
	app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
	app.use(session({ 
		secret: process.env.SECRET, 
		store: store,
		cookie: {
			maxAge:  1000 * 60 * 60 * 24 * 2 // 2days
		},
		resave: false,
	  	saveUninitialized: true
	}))
	app.use(flash())
	app.use(passport.initialize())
	app.use(passport.session())
	app.use((req, res, next) => {
		if (dbManager.getDb()) {
			next()
		}
		else {
			log('Db connection not ready')
			throw Error('Db connection not ready')
		}
	})
}

function addRoutes() {
	app.get('/logout', (req, res) => {
		req.logout()
		res.redirect('/login')
	})
	app.get('/', isLoggedIn, (req, res) => {
		res.sendFile(path.join(clientDir, 'index.html'))
	})
	app.use('/signup', signup)
	app.use('/login', login)
	app.use('/books', isLoggedIn, books)
	app.use('/lists', isLoggedIn, lists)
	app.use(express.static(publicDir))
	app.use(express.static(clientDir))
	app.use(function (err, req, res, next) {
		error(err.stack)
		res.render('error')
	})
}

function listen () {
	log(`[${new Date().toUTCString()}] Server started`)
	log(`Server listening at ${process.env.PORT}`)
	log('Connecting to db')

	dbManager.connect((err, result) => {
		if (err) {
			log('Could not connect to db')
			error(err)
		}
		else {
			db = result
		}
	})
}

module.exports = app
