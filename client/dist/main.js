/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./store */ \"./src/store.js\");\n\nclass Book {\n\n\tconstructor(name, fields) {\n\t\tthis.name = name\n\t\tthis.fields = fields\n\t}\n\n\tgetFields() {\n\t\treturn this.fields\n\t}\n\n\tsetFields(fields) {\n\t\tthis.fields = fields\n\t}\n\n\tgetName() {\n\t\treturn this.name\n\t}\n\n\tsetName(name) {\n\t\tthis.name = name\n\t}\n}\n\n\n//List model\nclass List {\n\n\tconstructor(name, fields) {\n\t\tthis.name = name\n\t\tthis.fields = fields\n\t\tthis.name = ''\n\t\tthis.fields = []\n\t}\n\n\tgetFields() {\n\t\treturn this.fields\n\t}\n\n\tsetFields(fields) {\n\t\tthis.fields = fields\n\t}\n\n\tgetName() {\n\t\treturn this.name\n\t}\n\n\tsetName(name) {\n\t\tthis.name = name\n\t}\n}\n\n//User model\nclass User {\n\n\tconstructor(name, fields) {\n\t\tthis.name = name\n\t\tthis.fields = fields\n\t\tthis.name = ''\n\t\tthis.fields = []\n\t}\n\n\tgetFields() {\n\t\treturn this.fields\n\t}\n\n\tsetFields(fields) {\n\t\tthis.fields = fields\n\t}\n\n\tgetName() {\n\t\treturn this.name\n\t}\n\n\tsetName(name) {\n\t\tthis.name = name\n\t}\n}\n\nconst darkTheme =  {\n\t'--main-bg-color': '#444', /*#fff; #333;*/\n\t'--main-color': '#fff', /*#111; #fff;*/\n\t'--link-color': '#03A9F4', /*#03A9F4;*/\n\t'--accent-bg-color': '#03A9F4',\n\t'--accent-color': '#fff', /*#fff;*/\n\t'--inactive-link-color': '#fff' /*#fff; #757575;*/\n}\n\nconst lightTheme =  {\n\t'--main-bg-color': '#fff', /*#fff; #333;*/\n\t'--main-color': '#111', /*#111; #fff;*/\n\t'--link-color': '#03A9F4', /*#03A9F4;*/\n\t'--accent-bg-color': '#03A9F4',\n\t'--accent-color': '#fff', /*#fff;*/\n\t'--inactive-link-color': '#757575' /*#fff; #757575;*/\n}\n\nconst input = document.querySelector(\"#searchtext\")\nconst searchbtn = document.querySelector(\"#searchbtn\")\nconst reset = document.querySelector(\"#resetbtn\")\nconst total = document.querySelector(\"#total\")\nconst resultElem = document.querySelector('#result')\nconst loader = document.querySelector('.loader')\nconst checkbox = document.querySelector('#checkbox')\nconst bottom = document.querySelector('.bottom')\nconst nav = document.querySelector('.nav')\nconst footer = document.querySelector('footer')\nconst hamburger = document.querySelector('.hamburger')\nconst leftNav = document.querySelector('.leftNav')\nconst profileLeft = document.querySelector('.profileLeft')\nconst routers = document.querySelectorAll('router')\nconst routeDiv = document.querySelector('route')\nconst home = document.querySelector('.home')\nconst html = document.querySelector('html')\nconst contextMenu = document.querySelector('#contextMenu')\n\nconst localBooksUrl = '/books'\nconst booksUrl = '/books/search'\nlet slide = false\nlet bookStore, listStore, onlineBookStore, userStore, currentList, top, bottomToolBar\n\ninput.addEventListener('input', inputHandler)\ninput.addEventListener('keyup', (event) => {\n\t//detect enter key up \n\tif (event.keyCode === 13) {\n\t\tevent.preventDefault()\n\t\tbtnHandler(null, true)\n\t}\n})\nsearchbtn.addEventListener('click', btnHandler)\nreset.addEventListener('click', resetHandler)\nbottom.addEventListener('click', (e) => {\n\te.preventDefault()\n\tbottomToolBar.scrollIntoView()\n})\nhamburger.addEventListener('click', (e) => {\n\te.preventDefault()\n\n\tif (leftNav.style.left !== '0px') {\n\t\tleftNav.style.left = '0px'\n\t\tleftNav.classList.add('slideOpen')\n\t} else {\n\t\tleftNav.style.left = '-250px'\n\t\tleftNav.classList.remove('slideOpen')\n\t}\n\t\n})\n\nObject.keys(routers).forEach((key) => {\n\n\trouters[key].addEventListener('click', () => {\n\t\tlet children = routers[key].children\n\t\tlet child \n\t\tObject.keys(children).forEach((key) => {\n\t\t\tif (children[key].tagName == 'A') {\n\t\t\t\tchild = children[key]\n\t\t\t}\n\t\t})\n\t\t\n\t\tif (!child) {\n\t\t\tchild = routers[key].firstChild\n\t\t\tchildren = child.children\n\t\t\tObject.keys(children).forEach((key) => {\n\t\t\t\tif (children[key].tagName == 'A') {\n\t\t\t\t\tchild = children[key]\n\t\t\t\t}\n\t\t\t})\n\t\t}\n\n\t\tconsole.log('Current path: ' + child.getAttribute('href'))\n\t\tlet currentPath = child.getAttribute('href')\n\n\t\troute(currentPath)\n\t})\n\t\n})\n\n\n\n// leftNav.addEventListener('animationed', (e) => {\n// \tif (leftNav.style.left = '-250px') {\n// \t\tleftNav.classList.remove('slideOpen')\n// \t}\n// })\n\nconst book = new Book('book', [{\n\t'name': 'title'\n}, {\n\t'name': 'author'\n}, {\n\t'name': 'list'\n}, {\n\t'name': 'average_rating'\n}])\n\nconst list = new List('list', [{\n\t'name': 'list'\n}])\n\nconst user = new User('user', [{\n\t'name': 'username'\n}, {\n\t'name': 'fullname'\n}])\n\ndocument.onload = start()\n\nfunction start() {\n\tconsole.log('Document load')\n\n\tconsole.log(window.location.hash)\n\n\tsetTheme(darkTheme)\n\n\tlet hash = '/' + window.location.hash\n\n\troute(hash)\n\tslide = true\n\tcurrentList = 'All'\n\tbookStore = new _store__WEBPACK_IMPORTED_MODULE_0__[\"default\"](book, {\n\t\turl: localBooksUrl,\n\t\trootProperty: 'data',\n\t\ttotalProperty: 'count'\n\t})\n\n\tonlineBookStore = new _store__WEBPACK_IMPORTED_MODULE_0__[\"default\"](book, {\n\t\turl: booksUrl,\n\t\trootProperty: 'data',\n\t\ttotalProperty: 'count'\n\t})\n\n\tlistStore = new _store__WEBPACK_IMPORTED_MODULE_0__[\"default\"](list, {\n\t\turl: '/lists',\n\t\trootProperty: 'data',\n\t\ttotalProperty: 'count'\n\t})\n\n\tuserStore = new _store__WEBPACK_IMPORTED_MODULE_0__[\"default\"](user, {\n\t\turl: '/users',\n\t\trootProperty: 'data',\n\t\ttotalProperty: 'count'\n\t})\n\n\tlistStore.load({\n\t\tparams: {}, \n\t\tcallback: listStoreLoadHandler\n\t})\n\n\tuserStore.load({\n\t\tcallback: profileStoreHandler\n\t})\n\n\tloadPage()\n}\n\nfunction setTheme(theme) {\n\tObject.keys(theme).forEach(key => {\n\t\thtml.style.setProperty(key, theme[key])\n\t})\n}\n\nfunction changeTheme() {\n}\n\nfunction inputHandler(v) {\n\tif (v.target.value) {\n\t\tsearchbtn.disabled = false\n\t\tsearchbtn.classList.remove('disabled')\n\t\tsearchbtn.classList.add('searchBtn')\n\t} else {\n\t\tsearchbtn.disabled = true\n\t\tsearchbtn.classList.remove('searchBtn')\n\t\tsearchbtn.classList.add('disabled')\n\t}\n}\n\nfunction resetHandler(v) {\n\tif (input.value) {\n\t\tinput.value = ''\n\t\tresetPage()\n\t}\n}\n\nfunction btnHandler(v) {\n\tloadPage({\n\t\ttitle: input.value\n\t}, true)\n}\n\nfunction listclickHandler(e) {\n\tlet value = e.target.getAttribute('value')\n\tlet links = document.querySelectorAll('#list-name')\n\n\tObject.keys(links).forEach(x => links[x].classList.remove('activeLink'))\n\n\te.target.classList.add('activeLink')\n\tleftNav.style.left = '-250px'\n\tleftNav.classList.remove('slideOpen')\n\n\tcurrentList = value\n\n\tif (value == 'All') {\n\t\tresetPage()\n\t} else {\n\t\tloadPage({\n\t\t\tlist: value\n\t\t})\n\t}\n\t\n}\n\nfunction actionListener(data, newList) {\n\tconsole.log(data._id)\n\tdata.list = newList\n\n\tfetch('/books', {\n\t    method: 'POST',\n\t    headers: {\n\t      'Accept': 'application/json',\n\t      'Content-Type': 'application/json'\n\t    },\n\t    body: JSON.stringify(data)\n\t})\n\t.then((response) => {\n\t\tresponse.json()\n\t})\n\t.catch((err) => {\n\t\tconsole.log(err)\n\t})\n\t\n}\n\nfunction resetPage(v) {\n\tsearchbtn.classList.remove('searchBtn')\n\tsearchbtn.classList.add('disabled')\n\tsearchbtn.disabled = true\n\tinput.value = ''\n\tloadPage()\n}\n\nfunction mask() {\n\tresultElem.classList.remove('slidefocus')\n\tresultElem.classList.remove('focus')\n\n\tresultElem.style.display = 'none'\n\tloader.style.display = 'block'\n}\n\nfunction unmask() {\n\tresultElem.style.display = 'block'\n\tloader.style.display = 'none'\n\n\tif (slide) {\n\t\tresultElem.classList.add('slidefocus')\n\t} else {\n\t\tresultElem.classList.add('focus')\n\t}\n\n\tslide = false\n}\n\nfunction mark(list) {\n\tconsole.log('Mark as ' + list)\n}\n\nfunction loadPage (params, search) {\n\tlet options = {\n\t\tcallback: bookStoreLoadHandler\n\t}\n\n\tif (!params) {\n\t\tparams = {}\n\t}\n\n\toptions.params = params\n\n\tmask()\n\n\tif (search && checkbox.checked) {\n\t\tonlineBookStore.load(options)\n\t} else {\n\t\tbookStore.load(options)\n\t}\n}\n\nfunction loadNextPage(event) {\n\tevent.preventDefault()\n\tmask()\n\tbookStore.loadNextPage(bookStoreLoadHandler)\n}\n\nfunction loadPreviousPage(event) {\n\tevent.preventDefault()\n\tmask()\n\tbookStore.loadPreviousPage(bookStoreLoadHandler)\n}\n\nfunction disableAnchor(anchor, flag = true) {\n\tif (flag) {\n\t\tanchor.classList.add('disabledAnchor')\n\t\tanchor.addEventListener('click', disableAnchorListner)\n\t} else {\n\t\tanchor.classList.remove('disabledAnchor')\n\t\tanchor.removeEventListener('click', disableAnchorListner)\n\t}\n}\n\nfunction hidePaging(flag, classes) {\n\n\tclasses.forEach((cls) => {\n\t\tconsole.log(cls)\n\t\tlet elem = document.querySelector(cls)\n\n\t\tif (elem) {\n\t\t\tif (flag) {\n\t\t\t\telem.style.display = 'none'\n\t\t\t} else {\n\t\t\t\telem.style.display = 'block'\n\t\t\t}\n\t\t}\n\t\t\n\t})\n}\n\nfunction disableAnchorListner(event) {\n\tevent.preventDefault()\n}\n\nfunction bookStoreLoadHandler (err, data, count, currentPage)  {\n\tif (err) {\n\t\tconsole.log(err)\n\t}\n\n\tlet previous = document.querySelector('.previous')\n\tlet next = document.querySelector('.next')\n\n\tif (data) {\n\t\tif (data.length == 0) {\n\t\t\ttotal.innerHTML = 'No books found. Search a book with above checkbox checked to search a book on goodreads.com and then add it to your list.'\n\t\t\t\n\t\t\thidePaging(true, ['.bottom', '.previous', '.next'])\n\t\t\tdisableAnchor(previous)\n\t\t\tdisableAnchor(next)\n\n\t\t} else {\n\t\t\thidePaging(false, ['.bottom', '.previous', '.next'])\n\n\t\t\ttotal.innerHTML = (((currentPage - 1) * 25) + 1) + ' - ' + (((currentPage - 1) * 25) + data.length) + ' of ' + count + ' books'\n\n\t\t\tif (data.length + (currentPage - 1) * 25 == count ) {\n\t\t\t\tdisableAnchor(next)\n\t\t\t\tnext.removeEventListener('click', loadNextPage)\n\t\t\t} else {\n\t\t\t\tdisableAnchor(next, false)\n\t\t\t\tnext.addEventListener('click', loadNextPage)\n\t\t\t}\n\n\t\t\tif (currentPage == 1) {\n\t\t\t\tdisableAnchor(previous)\n\t\t\t\tprevious.removeEventListener('click', loadPreviousPage)\n\t\t\t} else {\n\t\t\t\tdisableAnchor(previous, false)\n\t\t\t\tprevious.addEventListener('click', loadPreviousPage)\n\t\t\t}\n\n\n\t\t}\n\t} else {\n\t\ttotal.innerHTML = 'Could not find the book on goodreads.'\n\t}\n\n\tfillBookData(data)\n\tunmask()\n}\n\nfunction listStoreLoadHandler (err, data)  {\n\tif (err) {\n\t\tconsole.log(err)\n\t}\n\tfillListData(data)\n}\n\nfunction profileStoreHandler (err, data) {\n\tif (err) {\n\t\tconsole.log(err)\n\t}\n\tfillProfileData(data)\n}\n\nfunction fillBookData(data) {\n\n\t//clear existing list before repopulating\n\tresultElem.textContent = ''\n\t\n\tlet bottomToolBarNode = document.getElementById('bottomToolBarTemplate').content.cloneNode(true)\n\n\tif (!data) {\n\t\treturn \n\t}\n\n\tdata.forEach((el) => {\n\n\t\tconst tmpl = document.getElementById('book-template').content.cloneNode(true)\n\t\ttmpl.querySelector('.book-title').innerText = el.title\n\t  \t// tmpl.querySelector('.book-list').innerText = el.list ? el.list : ''\n\t  \ttmpl.querySelector('.book-author').innerText = el.author\n\t  \ttmpl.querySelector('.book-average-rating').innerText = el.average_rating\n\n\t\tlet actionsAnchors = tmpl.querySelectorAll('a')\n\t\tlet listIdx = Object.keys(actionsAnchors).filter(x => actionsAnchors[x].innerHTML == el.list)\n\t\t\n\t\tif (listIdx.length) {\n\t\t\tactionsAnchors[listIdx[0]].classList.add('active')\n\t\t}\n\n\t\tObject.keys(actionsAnchors).forEach(x => actionsAnchors[x].addEventListener('click', (e) => {\n\t\t\te.preventDefault()\n\t\t\tlet curnode = e.target\n\t\t\tlet oldList = el.list\n\t\t\tObject.keys(actionsAnchors).forEach(x => actionsAnchors[x].classList.remove('active'))\n\t\t\tcurnode.classList.add('active')\n\t\t\tactionListener(el, e.target.innerHTML)\n\n\t\t\tif (el._id && currentList !== 'All' && oldList !== e.target.innerHTML) {\n\t\t\t\twhile (curnode.getAttribute('class') != 'book') {\n\t\t\t\t    curnode = curnode.parentNode\n\t\t\t\t}\n\t\t\t\tcurnode.addEventListener('animationend', () => {\n\t\t\t\t\tresultElem.removeChild(curnode)\n\t\t\t\t})\n\t\t\t\tcurnode.classList.add('slideOut')\n\t\t\t}\n\t\t\t\n\t\t}))\n\n\t  \tresultElem.appendChild(tmpl)\n\t  \t\n\t})\n\n\tif (data.length) {\n\t\tresultElem.appendChild(bottomToolBarNode)\n\t\tbottomToolBar = document.querySelector('.bottomToolBar')\n\t  \ttop = document.querySelector('.top')\n\t  \ttop.addEventListener('click', (e) => {\n\t  \t\te.preventDefault()\n\t  \t\tbottom.scrollIntoView()\n\t  \t})\n\t}\n\n\n}\n\nfunction fillListData(data) {\n\tlet listElem = document.getElementById('lists')\n\tconst contextMenu = document.querySelector('#contextMenu')\n\n\tconst h3 = document.createElement('h3')\n\th3.innerHTML = 'Lists'\n\tcontextMenu.appendChild(h3)\n\t//clear existing list before repopulating\n\tlistElem.textContent = ''\n\n\tlet tmpl1 = document.getElementById('list-template').content.cloneNode(true)\n\tlet tmpl2 = document.getElementById('list-template').content.cloneNode(true)\n\n\ttmpl1.querySelector('#list-name').innerText = 'All'\n\ttmpl2.querySelector('#list-name').innerText = 'All'\n\n\ttmpl1.querySelector('#list-name').setAttribute('value', 'All')\n\ttmpl2.querySelector('#list-name').setAttribute('value', 'All')\n\n\ttmpl1.querySelector('#list-name').setAttribute('class', 'activeLink')\n\ttmpl2.querySelector('#list-name').setAttribute('class', 'activeLink')\n\n\ttmpl1.querySelector('#list-name').addEventListener('click', listclickHandler)\n\ttmpl2.querySelector('#list-name').addEventListener('click', listclickHandler)\n\n\tlistElem.appendChild(tmpl1)\n\tcontextMenu.appendChild(tmpl2)\n\n\tdata.forEach((el) => {\n\t\tlet tmpl1 = document.getElementById('list-template').content.cloneNode(true)\n\t\ttmpl1.querySelector('#list-name').innerText = el.name\n\t\ttmpl1.querySelector('#list-name').setAttribute('value', el.name)\n\t\ttmpl1.querySelector('#list-name').addEventListener('click', listclickHandler)\n\n\tlet tmpl2 = document.getElementById('list-template').content.cloneNode(true)\n\t\ttmpl2.querySelector('#list-name').innerText = el.name\n\t\ttmpl2.querySelector('#list-name').setAttribute('value', el.name)\n\t\ttmpl2.querySelector('#list-name').addEventListener('click', listclickHandler)\n\n\t  \tlistElem.appendChild(tmpl1)\n\t  \tcontextMenu.appendChild(tmpl2)\n\t})\n\t\n}\n\nfunction fillProfileData(user) {\n\n\tconst profileElem = document.getElementById('profile')\n\t//clear existing list before repopulating\n\tprofileElem.textContent = ''\n\n\tconst tmpl = document.getElementById('profile-template').content.cloneNode(true)\n\ttmpl.querySelector('#profile-fullname').innerText = user.fullname\n\ttmpl.querySelector('#profile-username').innerText = user.username\n\ttmpl.querySelector('#profile-darktheme').addEventListener('change', (e) => {\n\t\tconst check = e.target.checked\n\t\tif (check) {\n\t\t\tsetTheme(darkTheme)\n\t\t} else {\n\t\t\tsetTheme(lightTheme)\n\t\t}\n\t})\n\tprofileElem.appendChild(tmpl)\n}\n\nfunction route(currentPath) {\n\t// currentPath = '/' + currentPath\n\tconst children = routeDiv.childNodes\n\n\tif (currentPath !== '/#' && currentPath !== '/') {\n\t\tif (contextMenu) {\n\t\t\tcontextMenu.style.display = 'none'\n\t\t} \n\t} else {\n\t\tif (contextMenu) {\n\t\t\tcontextMenu.style.display = 'block'\n\t\t}\n\t}\n\n\tObject.keys(children).forEach((key) => {\n\t\tif (children[key].tagName == 'DIV') {\n\t\t\tif (children[key].getAttribute('routeId') == currentPath || children[key].getAttribute('routeId') + '#' == currentPath) {\n\t\t\t\tchildren[key].classList.remove('hidden')\n\t\t\t} else {\n\t\t\t\tchildren[key].classList.add('hidden')\n\t\t\t}\n\t\t}\t\n\t})\n}\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/store.js":
/*!**********************!*\
  !*** ./src/store.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Store; });\nclass Store {\n\n\tconstructor(model, proxy) {\n\t\tif (!model || !proxy) {\n\t\t\tthrow Error('Incomplete store definition')\n\t\t}\n\t\tthis.model = model\n\t\tthis.proxy = proxy\n\t\tthis.data = []\n\t\tthis.currentPage = 1\n\t}\n\n\tload(options) {\n\t\t\n\t\tlet {params, callback, page=1} = options\n\n\t\tif (!callback){\n\t\t\tthrow Error('Callback function required for function load.')\n\t\t}\n\t\t else {\n\t\t \tlet start = params ? 0 : (this.currentPage - 1)*25\n\n\t\t\tlet url = this.proxy.url + '?start=' + start + '&limit=25',\n\t\t\tmethod = this.proxy.method || 'GET',\n\t\t\trootProperty = this.proxy.rootProperty,\n\t\t\ttotalProperty = this.proxy.totalProperty\n\n\t\t\tif (params) {\n\t\t\t\tthis.params = params\n\t\t\t}\n\n\t\t\tlet urlparams = new URLSearchParams(this.params).toString()\n\t\t\t\n\t\t\tif (urlparams) {\n\t\t\t\turl += '&' + urlparams\n\t\t\t}\n\n\t\t\tfetch(url)\n\t\t\t\t.then((response) => {\n\t\t\t\t\treturn response.json()\n\t\t\t\t})\n\t\t\t\t.then((jsonResponse) => {\n\t\t\t\t\tthis.data = jsonResponse[rootProperty]\n\t\t\t\t\tthis.currentPage = page\n\t\t\t\t\tcallback(null, jsonResponse[rootProperty], jsonResponse[totalProperty], this.currentPage)\n\t\t\t\t})\n\t\t\t\t.catch((err) => {\n\t\t\t\t\tcallback(err)\n\t\t\t\t})\n\t\t}\n\t\t\n\t}\n\n\tloadNextPage(callback) {\n\t\tthis.load({\n\t\t\tcallback,\n\t\t\tpage: ++this.currentPage\n\t\t})\n\t}\n\n\tloadPreviousPage(callback) {\n\t\tthis.load({\n\t\t\tcallback,\n\t\t\tpage: --this.currentPage\n\t\t})\n\t}\n\n\tgetData() {\n\t\treturn this.data\n\t}\n}\n\n//# sourceURL=webpack:///./src/store.js?");

/***/ })

/******/ });