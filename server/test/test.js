const should = require('chai').should()
const axios = require('axios')

const db = require('../db').getDb()
const url = 'http://localhost:3000'
let COOKIE

const login = async function ()  {
	return axios.post('http://localhost:3000/login/session', {
		username: 'qitaab@tutanota.com',
		password: 'qitaab',
	})
	.then(function (response) {
		const cookie = response.headers['set-cookie'][0].split(';')[0]
		const data = response.data
		return Promise.resolve({
			cookie,
			data
		})
	})
	.catch(function (err) {
		return Promise.reject(err)
	}) 
}

const request = (path, method, config = {}) => {
	return axios[method](url + path, Object.assign({
		headers:{'Cookie': COOKIE}
	}, config))
	.then(res => {
		return Promise.resolve(res.data)
	})
	.catch(err => {
		return Promise.reject(err)
	})
}

describe('test suite', () => {
	before(() => {
		console.log(process.env.NODE_ENV)
	})
	describe('login', function() {
		it('user should be able to login',  async function() {
				const {cookie, data}  = await login()
				COOKIE = cookie
				should.exist(cookie)
				data.should.equal('ok')
		})
	})

	describe('books', () => {
		it(`get user's books`, (done) => {
			request('/books', 'get')
			.then(res => {
				should.exist(res)
				res.success.should.equal(true)
				should.exist(res.data)
				should.exist(res.count)
				done()
			})
			.catch(err => {
				console.log(err)
				done()
			})
		})
	})
})


