const axios = require('axios')
const fs = require('fs')
const API_KEY = '7a4338bc'
const URL = 'https://www.omdbapi.com/?apikey='

const request = (title) => {
	title = title.replace(' ', '+')

	return new Promise((resolve, reject) => {
		axios.get(url + API_KEY + '&t=' + name)
		.then(resp => {
			console.log(resp)
			resolve()
		})
		.catch(err => {
			console.log(err)
			reject(err)
		})
	})
}

request('jo jeeta')

setTimeout(() => {
	console.log('done')
}, 10000)

