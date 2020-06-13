import Store from './store'
class Book {

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


//List model
class List {

	constructor(name, fields) {
		this.name = name
		this.fields = fields
		this.name = ''
		this.fields = []
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
let bookStore, listStore, onlineBookStore

input.addEventListener('input', inputHandler)
input.addEventListener('keyup', (event) => {
	//detect enter key up 
	if (event.keyCode === 13) {
		event.preventDefault()
		btnHandler()
	}
})
searchbtn.addEventListener('click', btnHandler)
reset.addEventListener('click', (v) => {

	if (input.value) {
		input.value = ''
		searchbtn.classList.remove('searchBtn')
		searchbtn.classList.add('disabled')
		searchbtn.disabled = true
		loadPage()
	}
	
})

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

	listStore.load({
		params: {}, 
		callback: listStoreLoadHandler
	})

	loadPage()
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

function btnHandler(v) {
	loadPage({
		title: input.value
	})
}

function mask() {
	resultElem.classList.remove('slidefocus')
	resultElem.classList.remove('focus')

	resultElem.style.display = 'none'
	loader.style.display = 'block'
}

function unmask() {
	resultElem.style.display = 'block'
	loader.style.display = 'none'

	if (slide) {
		resultElem.classList.add('slidefocus')
	} else {
		resultElem.classList.add('focus')
	}

	slide = false
}

function loadPage (params) {
	let options = {
		callback: bookStoreLoadHandler
	}

	if (!params) {
		params = {}
	}

	options.params = params

	mask()

	if (checkbox.checked) {
		onlineBookStore.load(options)
	} else {
		bookStore.load(options)
	}
}

function disableAnchorListner(event) {
	event.preventDefault()
}

function loadNextPage(event) {
	event.preventDefault()
	mask()
	bookStore.loadNextPage(bookStoreLoadHandler)
}

function loadPreviousPage(event) {
	event.preventDefault()
	mask()
	bookStore.loadPreviousPage(bookStoreLoadHandler)
}

function disableAnchor(anchor, flag = true) {
	if (flag) {
		anchor.classList.add('disabledAnchor')
		anchor.addEventListener('click', disableAnchorListner)
	} else {
		anchor.classList.remove('disabledAnchor')
		anchor.removeEventListener('click', disableAnchorListner)
	}
}

function bookStoreLoadHandler (err, data, count, currentPage)  {
	if (err) {
		console.log(err)
	}

	let previous = document.querySelector('.previous')
	let next = document.querySelector('.next')

	if (data) {
		if (data.length == 0) {
			total.innerHTML = 'No books found'
			
			disableAnchor(previous)
			disableAnchor(next)

		} else {
			total.innerHTML = (((currentPage - 1) * 25) + 1) + ' - ' + (((currentPage - 1) * 25) + data.length) + ' of ' + count + ' books'

			if (data.length + (currentPage - 1) * 25 == count ) {
				disableAnchor(next)
				next.removeEventListener('click', loadNextPage)
			} else {
				disableAnchor(next, false)
				next.addEventListener('click', loadNextPage)
			}

			if (currentPage == 1) {
				disableAnchor(previous)
				previous.removeEventListener('click', loadPreviousPage)
			} else {
				disableAnchor(previous, false)
				previous.addEventListener('click', loadPreviousPage)
			}
		}
	} else {
		total.innerHTML = ''
	}

	fillBookData(data)
	unmask()
}

function listStoreLoadHandler (err, data)  {
	if (err) {
		console.log(err)
	}
	fillListData(data)
}

function listclick(e) {
	let value = e.target.getAttribute('value')
	loadPage({
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
		tmpl.querySelector('#list-name').addEventListener('click', listclick)

	  	listElem.appendChild(tmpl)
	})
}






