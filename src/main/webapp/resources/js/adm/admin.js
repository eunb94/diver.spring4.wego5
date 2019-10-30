"use strict"
var admin= admin || {}
admin = (()=>{
	let _, js, css, img
	let init=()=>{
		_ = $.ctx()
		js = $.js()
		css = $.css()
		img = $.img()
	}
	let onCreate=()=>{
		init()
		setContentView()
	}
	let setContentView=()=>{}
	return{onCreate}
})()