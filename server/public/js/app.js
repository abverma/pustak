const input = document.querySelector("#searchtext")
const searchbtn = document.querySelector("#searchbtn")
const reset = document.querySelector("#resetbtn")
const total = document.querySelector("#total")

input.addEventListener('input', inputHandler)
input.addEventListener('keyup', (event) => {
	if (event.keyCode === 13) {
		event.preventDefault();
		btnHandler()
	}
})
searchbtn.addEventListener('click', btnHandler)
reset.addEventListener('click', (v) => {
	input.value = ''
})

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

class List {
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

	load(params, callback) {
		
		if (!callback){
			throw Error('Callback function required for function load.')
		}
		 else {
			let url = this.proxy.url + '?start=0&limit=25',
			method = this.proxy.method || 'GET',
			rootProperty = this.proxy.rootProperty,
			totalProperty = this.proxy.totalProperty

			let urlparams = new URLSearchParams(params).toString()
			
			if (urlparams) {
				url += '&' + urlparams
			}

			fetch(url)
				.then((response) => {
					return response.json()
				})
				.then((jsonResponse) => {
					this.data = jsonResponse[rootProperty]
					callback(null, jsonResponse[rootProperty], jsonResponse[totalProperty])
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

list = new List('list', [{
	'name': 'list'
}])

let bookStore 

document.onload = start()

function start() {
	console.log('Load')
	bookStore = new Store(book, {
		url: '/books',
		rootProperty: 'data',
		totalProperty: 'count'
	})
	listStore = new Store(list, {
		url: 'books/lists',
		rootProperty: 'data',
		totalProperty: 'count'
	})
	btnHandler()
}

function inputHandler(v) {
	if (v.target.value) {
		searchbtn.disabled = false
		searchbtn.style.color = '#111'
	} else {
		searchbtn.disabled = true
		searchbtn.style.color = 'rgba(0, 0, 0, 0.247)'
	}
}

function btnHandler(v) {
	console.log('store load')
	let param = {}

	if (input.value) {
		param['title'] = input.value
	}

	bookStore.load(param, bookStoreLoadHandler)

	listStore.load({}, listStoreLoadHandler)
}

function bookStoreLoadHandler (err, data, count)  {
	if (err) {
		console.log(err)
	}

	if (data) {
		total.innerHTML = data.length + ' of ' + count
	} else {
		total.innerHTM = ''
	}
	fillBookData(data)
}

function listStoreLoadHandler (err, data)  {
	if (err) {
		console.log(err)
	}
	fillListData(data)
}

function listclick(e) {
	let value = e.attributes.value.value
	bookStore.load({
		list: value
	}, bookStoreLoadHandler)
}

function fillBookData(data) {
	let resultElem = document.getElementById('result')

	//clear existing list before repopulating
	resultElem.textContent = ''

	data.forEach((el) => {
		var tmpl = document.getElementById('book-template').content.cloneNode(true)
		tmpl.querySelector('.book-title').innerText = el.title
	  	tmpl.querySelector('.book-author').innerText = el.author
	  	tmpl.querySelector('.book-average-rating').innerText = el.average_rating

	  	resultElem.appendChild(tmpl)
	})
}

function fillListData(data) {
	let listElem = document.getElementById('lists')

	//clear existing list before repopulating
	listElem.textContent = ''

	data.forEach((el) => {
		var tmpl = document.getElementById('list-template').content.cloneNode(true)
		tmpl.querySelector('#list-name').innerText = el.name
		tmpl.querySelector('#list-name').setAttribute('value', el.name)
		tmpl.querySelector('#list-name').setAttribute('onclick', 'listclick(this)')

	  	listElem.appendChild(tmpl)
	})
}






