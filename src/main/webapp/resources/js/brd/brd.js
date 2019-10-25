"use strict"
var brd = brd ||{}
brd = (()=>{
    let _, js, brd_vue_js
    let init =()=>{
        _ = $.ctx()
       js = $.js()
       brd_vue_js = js+'/vue/brd_vue.js'
    }
    let onCreate=()=>{
    	$.getScript(brd_vue_js,()=>{
        init()
        setContentView(d)
        $('<a>',{
            	href : '#',
            	click : e=>{
                	e.preventDefault()
                	write(d)
            	},
            	text : '글쓰기'
            	})
            .addClass('nav-link')
            .appendTo('#go_write')
    	})
    }
    let setContentView=(d)=>{
        
            $('head').html(brd_vue.brd_head({css: $.css(), img: $.img()}))
            $('body').addClass('text-center')
            .html(brd_vue.brd_body(d))
            $('#recent_updates .media').remove()
            $('#recent_updates .d-block').remove()
            $('#recent_updates').append('<h1>등록된 글이 없습니다.</h1>')
        
    }
    let write=d=>{
    	alert('글쓰기로 이동')
    	$('#recent_updates').html(brd_vue.brd_write(d))
    	$('#suggestions').remove()
    }
    return {onCreate}
})()