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

//User model
class User {

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

const darkTheme =  {
	'--main-bg-color': '#444', /*#fff; #333;*/
	'--main-color': '#fff', /*#111; #fff;*/
	'--link-color': '#03A9F4', /*#03A9F4;*/
	'--accent-bg-color': '#03A9F4',
	'--accent-color': '#fff', /*#fff;*/
	'--inactive-link-color': '#fff' /*#fff; #757575;*/
}

const lightTheme =  {
	'--main-bg-color': '#fff', /*#fff; #333;*/
	'--main-color': '#111', /*#111; #fff;*/
	'--link-color': '#03A9F4', /*#03A9F4;*/
	'--accent-bg-color': '#03A9F4',
	'--accent-color': '#fff', /*#fff;*/
	'--inactive-link-color': '#757575' /*#fff; #757575;*/
}

const input = document.querySelector("#searchtext")
const searchbtn = document.querySelector("#searchbtn")
const reset = document.querySelector("#resetbtn")
const total = document.querySelector("#total")
const resultElem = document.querySelector('#result')
const loader = document.querySelector('.loader')
const checkbox = document.querySelector('#checkbox')
const bottom = document.querySelector('.bottom')
const nav = document.querySelector('.nav')
const footer = document.querySelector('footer')
const hamburger = document.querySelector('.hamburger')
const leftNav = document.querySelector('.leftNav')
const profileLeft = document.querySelector('.profileLeft')
const routers = document.querySelectorAll('router')
const routeDiv = document.querySelector('route')
const home = document.querySelector('.home')
const html = document.querySelector('html')
const contextMenu = document.querySelector('#contextMenu')

const localBooksUrl = '/books'
const booksUrl = '/books/search'
let slide = false
let bookStore, listStore, onlineBookStore, userStore, currentList, top, bottomToolBar

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
	bottomToolBar.scrollIntoView()
})
hamburger.addEventListener('click', (e) => {
	e.preventDefault()

	if (leftNav.style.left !== '0px') {
		leftNav.style.left = '0px'
		leftNav.classList.add('slideOpen')
	} else {
		leftNav.style.left = '-250px'
		leftNav.classList.remove('slideOpen')
	}
	
})

Object.keys(routers).forEach((key) => {

	routers[key].addEventListener('click', () => {
		let children = routers[key].children
		let child 
		Object.keys(children).forEach((key) => {
			if (children[key].tagName == 'A') {
				child = children[key]
			}
		})
		
		if (!child) {
			child = routers[key].firstChild
			children = child.children
			Object.keys(children).forEach((key) => {
				if (children[key].tagName == 'A') {
					child = children[key]
				}
			})
		}

		console.log('Current path: ' + child.getAttribute('href'))
		let currentPath = child.getAttribute('href')

		route(currentPath)
	})
	
})



// leftNav.addEventListener('animationed', (e) => {
// 	if (leftNav.style.left = '-250px') {
// 		leftNav.classList.remove('slideOpen')
// 	}
// })

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

const user = new User('user', [{
	'name': 'username'
}, {
	'name': 'fullname'
}])

document.onload = start()

function start() {
	console.log('Document load')

	console.log(window.location.hash)

	setTheme(darkTheme)

	let hash = '/' + window.location.hash

	route(hash)
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

	userStore = new Store(user, {
		url: '/users',
		rootProperty: 'data',
		totalProperty: 'count'
	})

	listStore.load({
		params: {}, 
		callback: listStoreLoadHandler
	})

	userStore.load({
		callback: profileStoreHandler
	})

	loadPage()
}

function setTheme(theme) {
	Object.keys(theme).forEach(key => {
		html.style.setProperty(key, theme[key])
	})
}

function changeTheme() {
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
	let links = document.querySelectorAll('#list-name')

	Object.keys(links).forEach(x => links[x].classList.remove('activeLink'))

	e.target.classList.add('activeLink')
	leftNav.style.left = '-250px'
	leftNav.classList.remove('slideOpen')

	currentList = value

	if (value == 'All') {
		resetPage()
	} else {
		loadPage({
			list: value
		})
	}
	
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
	input.value = ''
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

function hidePaging(flag, classes) {

	classes.forEach((cls) => {
		console.log(cls)
		let elem = document.querySelector(cls)

		if (elem) {
			if (flag) {
				elem.style.display = 'none'
			} else {
				elem.style.display = 'block'
			}
		}
		
	})
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
			total.innerHTML = 'No books found. Search a book with above checkbox checked to search a book on goodreads.com and then add it to your list.'
			
			hidePaging(true, ['.bottom', '.previous', '.next'])
			disableAnchor(previous)
			disableAnchor(next)

		} else {
			hidePaging(false, ['.bottom', '.previous', '.next'])

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

function profileStoreHandler (err, data) {
	if (err) {
		console.log(err)
	}
	fillProfileData(data)
}

function fillBookData(data) {

	//clear existing list before repopulating
	resultElem.textContent = ''
	
	let bottomToolBarNode = document.getElementById('bottomToolBarTemplate').content.cloneNode(true)

	data.forEach((el) => {

		const tmpl = document.getElementById('book-template').content.cloneNode(true)
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
			let oldList = el.list
			Object.keys(actionsAnchors).forEach(x => actionsAnchors[x].classList.remove('active'))
			curnode.classList.add('active')
			actionListener(el, e.target.innerHTML)

			if (el._id && currentList !== 'All' && oldList !== e.target.innerHTML) {
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
		resultElem.appendChild(bottomToolBarNode)
		bottomToolBar = document.querySelector('.bottomToolBar')
	  	top = document.querySelector('.top')
	  	top.addEventListener('click', (e) => {
	  		e.preventDefault()
	  		nav.scrollIntoView()
	  	})
	}


}

function fillListData(data) {
	let listElem = document.getElementById('lists')
	const contextMenu = document.querySelector('#contextMenu')

	const h3 = document.createElement('h3')
	h3.innerHTML = 'Lists'
	contextMenu.appendChild(h3)
	//clear existing list before repopulating
	listElem.textContent = ''

	let tmpl1 = document.getElementById('list-template').content.cloneNode(true)
	let tmpl2 = document.getElementById('list-template').content.cloneNode(true)

	tmpl1.querySelector('#list-name').innerText = 'All'
	tmpl2.querySelector('#list-name').innerText = 'All'

	tmpl1.querySelector('#list-name').setAttribute('value', 'All')
	tmpl2.querySelector('#list-name').setAttribute('value', 'All')

	tmpl1.querySelector('#list-name').setAttribute('class', 'activeLink')
	tmpl2.querySelector('#list-name').setAttribute('class', 'activeLink')

	tmpl1.querySelector('#list-name').addEventListener('click', listclickHandler)
	tmpl2.querySelector('#list-name').addEventListener('click', listclickHandler)

	listElem.appendChild(tmpl1)
	contextMenu.appendChild(tmpl2)

	data.forEach((el) => {
		let tmpl1 = document.getElementById('list-template').content.cloneNode(true)
		tmpl1.querySelector('#list-name').innerText = el.name
		tmpl1.querySelector('#list-name').setAttribute('value', el.name)
		tmpl1.querySelector('#list-name').addEventListener('click', listclickHandler)

	let tmpl2 = document.getElementById('list-template').content.cloneNode(true)
		tmpl2.querySelector('#list-name').innerText = el.name
		tmpl2.querySelector('#list-name').setAttribute('value', el.name)
		tmpl2.querySelector('#list-name').addEventListener('click', listclickHandler)

	  	listElem.appendChild(tmpl1)
	  	contextMenu.appendChild(tmpl2)
	})
	
}

function fillProfileData(user) {

	const profileElem = document.getElementById('profile')
	//clear existing list before repopulating
	profileElem.textContent = ''

	const tmpl = document.getElementById('profile-template').content.cloneNode(true)
	tmpl.querySelector('#profile-fullname').innerText = user.fullname
	tmpl.querySelector('#profile-username').innerText = user.username
	tmpl.querySelector('#profile-darktheme').addEventListener('change', (e) => {
		const check = e.target.checked
		if (check) {
			setTheme(darkTheme)
		} else {
			setTheme(lightTheme)
		}
	})
	profileElem.appendChild(tmpl)
}

function route(currentPath) {
	// currentPath = '/' + currentPath
	const children = routeDiv.childNodes

	if (currentPath !== '/#' && currentPath !== '/') {
		if (contextMenu) {
			contextMenu.style.display = 'none'
		} 
	} else {
		if (contextMenu) {
			contextMenu.style.display = 'block'
		}
	}

	Object.keys(children).forEach((key) => {
		if (children[key].tagName == 'DIV') {
			if (children[key].getAttribute('routeId') == currentPath || children[key].getAttribute('routeId') + '#' == currentPath) {
				children[key].classList.remove('hidden')
			} else {
				children[key].classList.add('hidden')
			}
		}	
	})
}
