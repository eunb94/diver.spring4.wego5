"use strict"
var brd = brd||{}
brd = (()=>{
	let _, js, brd_vue_js, $userid
	let init =()=>{
		 _ = $.ctx()
        js = $.js()
        brd_vue_js = js+'/vue/brd_vue.js'
        $userid = $.userid()

	}
	let onCreate =()=>{
		init()
		$.getScript(brd_vue_js, ()=>{
			setContentView()
			navigation()
		})
	}
			 
	let setContentView=()=>{
			$('head').html(brd_vue.brd_head())
	        $('body').addClass('text-center')
	        .html(brd_vue.brd_body({ctx: '/web',css: $.css(), img: $.img()}))
	        $('#recent_updates .media').remove()
	        $('#recent_updates .d-block').remove()
	        $('#recent_updates').append('<h1>등록된 글이 없습니다.</h1>')
	       
	        /*        +' <input type="reset" class="btn btn-danger" style="float:right;width:100px;margin-right:10px" value="CANCEL"/>'
	        +'<input name="write" type="submit" class="btn btn-primary" style="float:right;width:100px;margin-right:10px" value="SUBMIT"/>'*/
	}
	let write=()=>{
		$('#recent_updates').html(brd_vue.brd_write())
		$('#write_form input[name="writer"]').val($userid)
		$('#suggestions').remove()
		$('<input>',{
			style: "float:right;width:100px;margin-right:10px",
			value: "취소"
		})
		.addClass("btn btn-danger")
		.appendTo('#write_form')
		.click(()=>{
			
		})
		$('<input>',{
			style: "float:right;width:100px;margin-right:10px",
			value: "전송"
		})
		.addClass("btn btn-primary")
		.appendTo('#write_form')
		.click(e=>{
			e.preventDefault()
			let json = {
					uid : $('#write_form input[name="writer"]').val(),
					title: $('#write_form input[name="title"]').val(),
					content: $('#write_form textarea[name="content"]').val()
			}
			alert('글내용 '+json.content)
			$.ajax({
				url : _+'/articles/',
				type : 'POST',
				data : JSON.stringify(json),
				dataType : 'json',
				contentType : 'application/json',
				success : d=>{
					$('#recent_updates').html('<h1>목록 불러오기</h1>')
					
				},
				error : e=>{alert('에러')}
			})
		})
		
	}
let navigation = () => {
		
		$('<a>',{
        	href : '#',
        	click : e=>{
	        	e.preventDefault()
	        	write()
	        },
	        text : '글쓰기'
        })
        .addClass('nav-link')
        .appendTo('#go_write')
	}
	return {onCreate}
})()