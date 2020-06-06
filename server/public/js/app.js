const input = document.querySelector("#searchtext")
const btn = document.querySelector("#searchbtn")

input.addEventListener('input', inputHandler)
btn.addEventListener('click', btnHandler)

function inputHandler(v) {
	if (v.target.value) {
		btn.disabled = false
		btn.style.color = '#111'
	} else {
		btn.disabled = true
		btn.style.color = 'rgba(0, 0, 0, 0.247)'
	}
}

function btnHandler(v) {
	bookStore.load((err, data) => {
		if (err) {
			console.log(err.stack)
		} else {
			console.log(data)
			let resultElem = document.getElementById('result')

			data.forEach((data) => {
				var tmpl = document.getElementById('book-template').content.cloneNode(true)
				tmpl.querySelector('.book-title').innerText = data.title
			  	tmpl.querySelector('.book-author').innerText = data.author
			  	tmpl.querySelector('.book-average-rating').innerText = data.average_rating

			  	resultElem.appendChild(tmpl)
			})
		}
		
	})
}

class Book {
	name = '';
	fields = [];

	constructor(name, fields) {
		this.name = name
		this.fields = fields
	}

	getFields() {
		return this.fields
	}

	setFields(fields) {
		this.fields = fields
	}

	getName() {
		return this.name
	}

	setName(name) {
		this.name = name
	}
}

class Store {
	data = [];
	constructor(model, proxy) {
		if (!model || !proxy) {
			throw Error('Incomplete store definition')
		}
		this.model = model
		this.proxy = proxy
	}

	load(callback) {
		
		if (!callback){
			throw Error('Callback function required for function load.')
		}
		 else {
			let url = this.proxy.url,
			method = this.proxy.method || 'GET',
			rootProperty = this.proxy.rootProperty

			fetch(url)
				.then((response) => {
					return response.json()
				})
				.then((jsonResponse) => {
					this.data = jsonResponse[rootProperty]
					callback(null, jsonResponse[rootProperty])
				})
				.catch((err) => {
					callback(err)
				})
		}
		
	}

	getData() {
		return this.data
	}

}

book = new Book('book', [{
	'name': 'title'
}, {
	'name': 'author'
}, {
	'name': 'list'
}, {
	'name': 'average_rating'
}])

bookStore = new Store(book, {
	url: '/books',
	rootProperty: 'data'
})



