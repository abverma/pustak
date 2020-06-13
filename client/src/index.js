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
const bottom = document.querySelector('.bottom')
let top
const nav = document.querySelector('.nav')
const footer = document.querySelector('footer')
const localBooksUrl = '/books'
const booksUrl = '/books/search'
let slide = false
let bookStore, listStore, onlineBookStore, currentList

input.addEventListener('input', inputHandler)
input.addEventListener('keyup', (event) => {
	//detect enter key up 
	if (event.keyCode === 13) {
		event.preventDefault()
		btnHandler(null, true)
	}
})
searchbtn.addEventListener('click', btnHandler)
reset.addEventListener('click', resetHandler)
bottom.addEventListener('click', (e) => {
	e.preventDefault()
	footer.scrollIntoView()
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
	currentList = 'All'
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
		url: '/lists',
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

function resetHandler(v) {
	if (input.value) {
		input.value = ''
		resetPage()
	}
}

function btnHandler(v) {
	loadPage({
		title: input.value
	}, true)
}

function listclickHandler(e) {
	let value = e.target.getAttribute('value')
	currentList = value
	loadPage({
		list: value
	})
}

function actionListener(data, newList) {
	console.log(data._id)
	data.list = newList

	fetch('/books', {
	    method: 'POST',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify(data)
	})
	.then((response) => {
		response.json()
	})
	.catch((err) => {
		console.log(err)
	})
	
}

function resetPage(v) {
	searchbtn.classList.remove('searchBtn')
	searchbtn.classList.add('disabled')
	searchbtn.disabled = true
	loadPage()
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

function mark(list) {
	console.log('Mark as ' + list)
}

function loadPage (params, search) {
	let options = {
		callback: bookStoreLoadHandler
	}

	if (!params) {
		params = {}
	}

	options.params = params

	mask()

	if (search && checkbox.checked) {
		onlineBookStore.load(options)
	} else {
		bookStore.load(options)
	}
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

function disableAnchorListner(event) {
	event.preventDefault()
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

function fillBookData(data) {

	//clear existing list before repopulating
	resultElem.textContent = ''
	
	var bottomToolBar = document.getElementById('bottomToolBarTemplate').content.cloneNode(true)

	data.forEach((el) => {

		var tmpl = document.getElementById('book-template').content.cloneNode(true)
		tmpl.querySelector('.book-title').innerText = el.title
	  	// tmpl.querySelector('.book-list').innerText = el.list ? el.list : ''
	  	tmpl.querySelector('.book-author').innerText = el.author
	  	tmpl.querySelector('.book-average-rating').innerText = el.average_rating

		let actionsAnchors = tmpl.querySelectorAll('a')
		let listIdx = Object.keys(actionsAnchors).filter(x => actionsAnchors[x].innerHTML == el.list)
		
		if (listIdx.length) {
			actionsAnchors[listIdx[0]].classList.add('active')
		}

		Object.keys(actionsAnchors).forEach(x => actionsAnchors[x].addEventListener('click', (e) => {
			e.preventDefault()
			let curnode = e.target
			Object.keys(actionsAnchors).forEach(x => actionsAnchors[x].classList.remove('active'))
			curnode.classList.add('active')
			if (!el._id || currentList !== 'All' && el.list !== e.target.innerHTML) {
				actionListener(el, e.target.innerHTML)
				while (curnode.getAttribute('class') != 'book') {
				    curnode = curnode.parentNode
				}
				curnode.addEventListener('animationend', () => {
					resultElem.removeChild(curnode)
				})
				curnode.classList.add('slideOut')
			}
			
		}))

	  	resultElem.appendChild(tmpl)
	  	
	})

	if (data.length) {
		resultElem.appendChild(bottomToolBar)
	  	top = document.querySelector('.top')
	  	top.addEventListener('click', (e) => {
	  		e.preventDefault()
	  		nav.scrollIntoView()
	  	})
	}
	
}

function fillListData(data) {
	let listElem = document.getElementById('lists')

	//clear existing list before repopulating
	listElem.textContent = ''

	data.forEach((el) => {
		let tmpl = document.getElementById('list-template').content.cloneNode(true)
		tmpl.querySelector('#list-name').innerText = el.name
		tmpl.querySelector('#list-name').setAttribute('value', el.name)
		tmpl.querySelector('#list-name').addEventListener('click', listclickHandler)

	  	listElem.appendChild(tmpl)
	})

	let tmpl = document.getElementById('list-template').content.cloneNode(true)
	tmpl.querySelector('#list-name').innerText = 'All'
	tmpl.querySelector('#list-name').addEventListener('click', resetPage)
	listElem.appendChild(tmpl)
}
