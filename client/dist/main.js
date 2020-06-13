!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);class o{constructor(e,t){if(!e||!t)throw Error("Incomplete store definition");this.model=e,this.proxy=t,this.data=[],this.currentPage=1}load(e){let{params:t,callback:n,page:o=1}=e;if(!n)throw Error("Callback function required for function load.");{let e=t?0:25*(this.currentPage-1),r=this.proxy.url+"?start="+e+"&limit=25",l=(this.proxy.method,this.proxy.rootProperty),a=this.proxy.totalProperty;t&&(this.params=t);let i=new URLSearchParams(this.params).toString();i&&(r+="&"+i),fetch(r).then(e=>e.json()).then(e=>{this.data=e[l],this.currentPage=o,n(null,e[l],e[a],this.currentPage)}).catch(e=>{n(e)})}}loadNextPage(e){this.load({callback:e,page:++this.currentPage})}loadPreviousPage(e){this.load({callback:e,page:--this.currentPage})}getData(){return this.data}}const r=document.querySelector("#searchtext"),l=document.querySelector("#searchbtn"),a=document.querySelector("#resetbtn"),i=document.querySelector("#total"),s=document.querySelector("#result"),c=document.querySelector(".loader"),d=document.querySelector("#checkbox"),u=document.querySelector(".bottom");let m;const f=document.querySelector(".nav"),h=document.querySelector("footer");let p,y,v,g,b=!1;r.addEventListener("input",(function(e){e.target.value?(l.disabled=!1,l.classList.remove("disabled"),l.classList.add("searchBtn")):(l.disabled=!0,l.classList.remove("searchBtn"),l.classList.add("disabled"))})),r.addEventListener("keyup",e=>{13===e.keyCode&&(e.preventDefault(),S(null))}),l.addEventListener("click",S),a.addEventListener("click",(function(e){r.value&&(r.value="",P())})),u.addEventListener("click",e=>{e.preventDefault(),h.scrollIntoView()});const k=new class{constructor(e,t){this.name=e,this.fields=t}getFields(){return this.fields}setFields(e){this.fields=e}getName(){return this.name}setName(e){this.name=e}}("book",[{name:"title"},{name:"author"},{name:"list"},{name:"average_rating"}]),L=new class{constructor(e,t){this.name=e,this.fields=t,this.name="",this.fields=[]}getFields(){return this.fields}setFields(e){this.fields=e}getName(){return this.name}setName(e){this.name=e}}("list",[{name:"list"}]);function S(e){x({title:r.value},!0)}function E(e){let t=e.target.getAttribute("value");g=t,x({list:t})}function P(e){l.classList.remove("searchBtn"),l.classList.add("disabled"),l.disabled=!0,x()}function q(){s.classList.remove("slidefocus"),s.classList.remove("focus"),s.style.display="none",c.style.display="block"}function x(e,t){let n={callback:w};e||(e={}),n.params=e,q(),t&&d.checked?v.load(n):p.load(n)}function T(e){e.preventDefault(),q(),p.loadNextPage(w)}function j(e){e.preventDefault(),q(),p.loadPreviousPage(w)}function N(e,t=!0){t?(e.classList.add("disabledAnchor"),e.addEventListener("click",O)):(e.classList.remove("disabledAnchor"),e.removeEventListener("click",O))}function O(e){e.preventDefault()}function w(e,t,n,o){e&&console.log(e);let r=document.querySelector(".previous"),l=document.querySelector(".next");t?0==t.length?(i.innerHTML="No books found",N(r),N(l)):(i.innerHTML=25*(o-1)+1+" - "+(25*(o-1)+t.length)+" of "+n+" books",t.length+25*(o-1)==n?(N(l),l.removeEventListener("click",T)):(N(l,!1),l.addEventListener("click",T)),1==o?(N(r),r.removeEventListener("click",j)):(N(r,!1),r.addEventListener("click",j))):i.innerHTML="",function(e){s.textContent="";var t=document.getElementById("bottomToolBarTemplate").content.cloneNode(!0);e.forEach(e=>{var t=document.getElementById("book-template").content.cloneNode(!0);t.querySelector(".book-title").innerText=e.title,t.querySelector(".book-author").innerText=e.author,t.querySelector(".book-average-rating").innerText=e.average_rating;let n=t.querySelectorAll("a"),o=Object.keys(n).filter(t=>n[t].innerHTML==e.list);o.length&&n[o[0]].classList.add("active"),Object.keys(n).forEach(t=>n[t].addEventListener("click",t=>{t.preventDefault();let o=t.target;if(Object.keys(n).forEach(e=>n[e].classList.remove("active")),o.classList.add("active"),!e._id||"All"!==g&&e.list!==t.target.innerHTML){for(!function(e,t){console.log(e._id),e.list=t,fetch("/books",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(e)}).then(e=>{e.json()}).catch(e=>{console.log(e)})}(e,t.target.innerHTML);"book"!=o.getAttribute("class");)o=o.parentNode;o.addEventListener("animationend",()=>{s.removeChild(o)}),o.classList.add("slideOut")}})),s.appendChild(t)}),e.length&&(s.appendChild(t),m=document.querySelector(".top"),m.addEventListener("click",e=>{e.preventDefault(),f.scrollIntoView()}))}(t),s.style.display="block",c.style.display="none",b?s.classList.add("slidefocus"):s.classList.add("focus"),b=!1}function A(e,t){e&&console.log(e),function(e){let t=document.getElementById("lists");t.textContent="",e.forEach(e=>{let n=document.getElementById("list-template").content.cloneNode(!0);n.querySelector("#list-name").innerText=e.name,n.querySelector("#list-name").setAttribute("value",e.name),n.querySelector("#list-name").addEventListener("click",E),t.appendChild(n)});let n=document.getElementById("list-template").content.cloneNode(!0);n.querySelector("#list-name").innerText="All",n.querySelector("#list-name").addEventListener("click",P),t.appendChild(n)}(t)}document.onload=(console.log("Document load"),b=!0,g="All",p=new o(k,{url:"/books",rootProperty:"data",totalProperty:"count"}),v=new o(k,{url:"/books/search",rootProperty:"data",totalProperty:"count"}),y=new o(L,{url:"/lists",rootProperty:"data",totalProperty:"count"}),y.load({params:{},callback:A}),void x())}]);