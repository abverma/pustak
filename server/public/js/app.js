const input = document.querySelector("#searchtext")
const searchbtn = document.querySelector("#searchbtn")
const reset = document.querySelector("#resetbtn")
const total = document.querySelector("#total")
const resultElem = document.querySelector('#result')
const loader = document.querySelector('.loader')
const checkbox = document.querySelector('#checkbox')
const localBooksUrl = '/books'
const booksUrl = '/books/search'
let slide = false

input.addEventListener('input', inputHandler)
input.addEventListener('keyup', (event) => {
	//detect enter key up 
	if (event.keyCode === 13) {
		event.preventDefault();
		btnHandler()
	}
})
searchbtn.addEventListener('click', btnHandler)
reset.addEventListener('click', (v) => {
	input.value = ''
	searchbtn.classList.remove('searchBtn')
	searchbtn.classList.add('disabled')
	searchbtn.disabled = true
	btnHandler()
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

const book = new Book('book', [{
	'name': 'title'
}, {
	'name': 'author'
}, {
	'name': 'list'
}, {
	'name': 'average_rating'
}])

const list = new List('list', [{
	'name': 'list'
}])

let bookStore, listStore

document.onload = start()

function start() {
	console.log('Document load')

	slide = true

	bookStore = new Store(book, {
		url: localBooksUrl,
		rootProperty: 'data',
		totalProperty: 'count'
	})

	onlineBookStore = new Store(book, {
		url: booksUrl,
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
		searchbtn.classList.remove('disabled')
		searchbtn.classList.add('searchBtn')
	} else {
		searchbtn.disabled = true
		searchbtn.classList.remove('searchBtn')
		searchbtn.classList.add('disabled')
	}
}

function btnHandler(v, param) {
	console.log('store load')
	console.log(slide)

	if (!param) {
		param = {}
	}

	if (input.value) {
		param['title'] = input.value
	}

	resultElem.classList.remove('slidefocus')
	resultElem.classList.remove('focus')

	resultElem.style.display = 'none'
	loader.style.display = 'block'

	if (checkbox.checked) {
		onlineBookStore.load(param, bookStoreLoadHandler)
	} else {
		bookStore.load(param, bookStoreLoadHandler)
	}

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

	// resultElem.classList.remove('loader')
	resultElem.style.display = 'block'
	loader.style.display = 'none'


	if (slide) {
		resultElem.classList.add('slidefocus')
	} else {
		resultElem.classList.add('focus')
	}

	slide = false
}

function listStoreLoadHandler (err, data)  {
	if (err) {
		console.log(err)
	}
	fillListData(data)
}

function listclick(e) {
	let value = e.attributes.value.value
	btnHandler(null, {
		list: value
	})
}

function fillBookData(data) {

	//clear existing list before repopulating
	resultElem.textContent = ''

	data.forEach((el) => {
		var tmpl = document.getElementById('book-template').content.cloneNode(true)
		tmpl.querySelector('.book-title').innerText = el.title
	  	tmpl.querySelector('.book-list').innerText = el.list ? el.list : ''
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






