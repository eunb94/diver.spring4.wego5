"use strict";
function Session(x){
	sessionStorage.setItem('ctx',x);
	sessionStorage.setItem('js',x + '/resources/js');
	sessionStorage.setItem('css',x + '/resources/css');
	sessionStorage.setItem('img',x + '/resources/img');
	return {
		ctx : ()=>{return sessionStorage.getItem('ctx');},
		js : ()=>{return sessionStorage.getItem('js');},
		css : ()=>{return sessionStorage.getItem('css');},
		img : ()=>{return sessionStorage.getItem('img');}
	}
}
function User(x){
	sessionStorage.setItem('uid', x.uid)
	sessionStorage.setItem('pwd', x.pwd)
	sessionStorage.setItem('uname', x.uname)
	return {
		userid : ()=>{return sessionStorage.getItem('uid');},
		password : ()=>{return sessionStorage.getItem('pwd');},
		username : ()=>{return sessionStorage.getItem('uname');}
	}
}
