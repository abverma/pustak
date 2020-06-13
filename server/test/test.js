require('dotenv').config()
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
const dbManager = require('../db')
const should = chai.should()
const expect = chai.expect
const { uuid } = require('uuidv4')

chai.use(chaiHttp)

const agent = chai.request(server).keepOpen()
describe('login', () => {
	it('user should be able to login')
})

