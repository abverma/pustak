!function(e){var t={};function n(o){if(t[o])return t[o].exports;var l=t[o]={i:o,l:!1,exports:{}};return e[o].call(l.exports,l,l.exports,n),l.l=!0,l.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var l in e)n.d(o,l,function(t){return e[t]}.bind(null,l));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);class o{constructor(e,t){if(!e||!t)throw Error("Incomplete store definition");this.model=e,this.proxy=t,this.data=[],this.currentPage=1}load(e){let{params:t,callback:n,page:o=1}=e;if(!n)throw Error("Callback function required for function load.");{let e=t?0:25*(this.currentPage-1),l=this.proxy.url+"?start="+e+"&limit=25",r=(this.proxy.method,this.proxy.rootProperty),a=this.proxy.totalProperty;t&&(this.params=t);let s=new URLSearchParams(this.params).toString();s&&(l+="&"+s),fetch(l).then(e=>e.json()).then(e=>{this.data=e[r],this.currentPage=o,n(null,e[r],e[a],this.currentPage)}).catch(e=>{n(e)})}}loadNextPage(e){this.load({callback:e,page:++this.currentPage})}loadPreviousPage(e){this.load({callback:e,page:--this.currentPage})}getData(){return this.data}}const l=document.querySelector("#searchtext"),r=document.querySelector("#searchbtn"),a=document.querySelector("#resetbtn"),s=document.querySelector("#total"),i=document.querySelector("#result"),c=document.querySelector(".loader"),d=document.querySelector("#checkbox"),u=document.querySelector(".bottom"),m=document.querySelector(".nav"),f=(document.querySelector("footer"),document.querySelector(".hamburger")),p=document.querySelector(".left");let y,h,v,b,g,L,k=!1;l.addEventListener("input",(function(e){e.target.value?(r.disabled=!1,r.classList.remove("disabled"),r.classList.add("searchBtn")):(r.disabled=!0,r.classList.remove("searchBtn"),r.classList.add("disabled"))})),l.addEventListener("keyup",e=>{13===e.keyCode&&(e.preventDefault(),E(null))}),r.addEventListener("click",E),a.addEventListener("click",(function(e){l.value&&(l.value="",x())})),u.addEventListener("click",e=>{e.preventDefault(),L.scrollIntoView()}),f.addEventListener("click",e=>{e.preventDefault(),"0px"!==p.style.left?(p.style.left="0px",p.classList.add("slideOpen")):(p.style.left="-250px",p.classList.remove("slideOpen"))});const S=new class{constructor(e,t){this.name=e,this.fields=t}getFields(){return this.fields}setFields(e){this.fields=e}getName(){return this.name}setName(e){this.name=e}}("book",[{name:"title"},{name:"author"},{name:"list"},{name:"average_rating"}]),q=new class{constructor(e,t){this.name=e,this.fields=t,this.name="",this.fields=[]}getFields(){return this.fields}setFields(e){this.fields=e}getName(){return this.name}setName(e){this.name=e}}("list",[{name:"list"}]);function E(e){O({title:l.value},!0)}function P(e){let t=e.target.getAttribute("value"),n=document.querySelectorAll("#list-name");Object.keys(n).forEach(e=>n[e].classList.remove("activeLink")),e.target.classList.add("activeLink"),p.style.left="-250px",p.classList.remove("slideOpen"),b=t,"All"==t?x():O({list:t})}function x(e){r.classList.remove("searchBtn"),r.classList.add("disabled"),r.disabled=!0,l.value="",O()}function T(){i.classList.remove("slidefocus"),i.classList.remove("focus"),i.style.display="none",c.style.display="block"}function O(e,t){let n={callback:B};e||(e={}),n.params=e,T(),t&&d.checked?v.load(n):y.load(n)}function j(e){e.preventDefault(),T(),y.loadNextPage(B)}function A(e){e.preventDefault(),T(),y.loadPreviousPage(B)}function N(e,t=!0){t?(e.classList.add("disabledAnchor"),e.addEventListener("click",w)):(e.classList.remove("disabledAnchor"),e.removeEventListener("click",w))}function w(e){e.preventDefault()}function B(e,t,n,o){e&&console.log(e);let l=document.querySelector(".previous"),r=document.querySelector(".next");t?0==t.length?(s.innerHTML="No books found",N(l),N(r)):(s.innerHTML=25*(o-1)+1+" - "+(25*(o-1)+t.length)+" of "+n+" books",t.length+25*(o-1)==n?(N(r),r.removeEventListener("click",j)):(N(r,!1),r.addEventListener("click",j)),1==o?(N(l),l.removeEventListener("click",A)):(N(l,!1),l.addEventListener("click",A))):s.innerHTML="",function(e){i.textContent="";let t=document.getElementById("bottomToolBarTemplate").content.cloneNode(!0);e.forEach(e=>{const t=document.getElementById("book-template").content.cloneNode(!0);t.querySelector(".book-title").innerText=e.title,t.querySelector(".book-author").innerText=e.author,t.querySelector(".book-average-rating").innerText=e.average_rating;let n=t.querySelectorAll("a"),o=Object.keys(n).filter(t=>n[t].innerHTML==e.list);o.length&&n[o[0]].classList.add("active"),Object.keys(n).forEach(t=>n[t].addEventListener("click",t=>{t.preventDefault();let o=t.target,l=e.list;if(Object.keys(n).forEach(e=>n[e].classList.remove("active")),o.classList.add("active"),function(e,t){console.log(e._id),e.list=t,fetch("/books",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(e)}).then(e=>{e.json()}).catch(e=>{console.log(e)})}(e,t.target.innerHTML),e._id&&"All"!==b&&l!==t.target.innerHTML){for(;"book"!=o.getAttribute("class");)o=o.parentNode;o.addEventListener("animationend",()=>{i.removeChild(o)}),o.classList.add("slideOut")}})),i.appendChild(t)}),e.length&&(i.appendChild(t),L=document.querySelector(".bottomToolBar"),g=document.querySelector(".top"),g.addEventListener("click",e=>{e.preventDefault(),m.scrollIntoView()}))}(t),i.style.display="block",c.style.display="none",k?i.classList.add("slidefocus"):i.classList.add("focus"),k=!1}function C(e,t){e&&console.log(e),function(e){let t=document.getElementById("lists");t.textContent="";let n=document.getElementById("list-template").content.cloneNode(!0);n.querySelector("#list-name").innerText="All",n.querySelector("#list-name").setAttribute("value","All"),n.querySelector("#list-name").setAttribute("class","activeLink"),n.querySelector("#list-name").addEventListener("click",P),t.appendChild(n),e.forEach(e=>{let n=document.getElementById("list-template").content.cloneNode(!0);n.querySelector("#list-name").innerText=e.name,n.querySelector("#list-name").setAttribute("value",e.name),n.querySelector("#list-name").addEventListener("click",P),t.appendChild(n)})}(t)}document.onload=(console.log("Document load"),k=!0,b="All",y=new o(S,{url:"/books",rootProperty:"data",totalProperty:"count"}),v=new o(S,{url:"/books/search",rootProperty:"data",totalProperty:"count"}),h=new o(q,{url:"/lists",rootProperty:"data",totalProperty:"count"}),h.load({params:{},callback:C}),void O())}]);