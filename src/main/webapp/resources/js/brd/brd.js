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
	        recent_updates()
	       
	}
	let recent_updates=()=>{
	    $('#recent_updates .media').remove()
	    $('#suggestions').remove()
	    $('#recent_updates .d-block').remove()
	    $.getJSON(_+'/articles/',d=>{
	    	alert('글목록 숫자 :' +d.count)
				let i =0
				let res = ''
					$.each(d, (i,j)=>{				  
						$('<div class="media text-muted pt-3"><img data-src="holder.js/32x32?theme=thumb&amp;bg=007bff&amp;fg=007bff&amp;size=1" alt="32x32" class="mr-2 rounded" style="width: 32px; height: 32px;" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2232%22%20height%3D%2232%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2032%2032%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16dfcdddb72%20text%20%7B%20fill%3A%23007bff%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A2pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16dfcdddb72%22%3E%3Crect%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22%23007bff%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2211.5390625%22%20y%3D%2216.9%22%3E32x32%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E" data-holder-rendered="true">'+
						'          <p id="id_'+i+'" class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">'+
						'         </p></div>').appendTo('#recent_updates')
						$('<strong class="d-block text-gray-dark">@<a>'+j.uid+'</a></strong>')
						.appendTo("#id_"+i)
						.click(()=>{
							alert('id 클릭')
						})
						$('<a>'+j.title+'</a>')
						.appendTo("#id_"+i)
						.click(()=>{
							alert('제목 클릭')
							detail(j)
						})
				})
				
				$('#recent_updates').append(res) 
		    })
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
					alert('글목록 : '+ d.count)
					$('#recent_updates div.container-fluid').remove()
					recent_updates()
					
			
					
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
let detail = x =>{
	alert('넘기는 seq 값 '+x)
	$('#recent_updates').html(brd_vue.brd_write())
	$('#recent_updates div.container-fluid h1').html('ARTICLE DETAIL')
		$('#write_form input[name="writer"]').val(x.uid)
		$('#write_form input[name="title"]').val(x.title)
		$('#write_form textarea[name="content"]').val(x.content)
		$('#suggestions').remove()
		$('<input>',{
			style: "float:right;width:100px;margin-right:10px",
			value: "삭제"
		})
		.addClass("btn btn-danger")
		.appendTo('#write_form')
		.click(()=>{
			let json = {
					uid : $('#write_form input[name="writer"]').val(),
					title: $('#write_form input[name="title"]').val(),
					content: $('#write_form textarea[name="content"]').val()
			}
			$.ajax({
				url : _+'/articles/'+$('#artseq').val(),
				type : 'DELETE',
				data : JSON.stringify(json),
		        dataType : 'json',
				contentType : 'application/json',
				success : d=>{
					if(d.msg === 'SUCCESS'){
						alert('삭제완료!!' +d.msg)
						$('#recent_updates div.container-fluid').remove()
						recent_updates()
					}else{
						alert('삭제 실패^^ 왜 실패니..?')
					}
				}
			
			})	
		})
		$('<input>',{
			style: "float:right;width:100px;margin-right:10px",
			value: "수정"
		})
		.addClass("btn btn-primary")
		.appendTo('#write_form')
		.click(()=>{
		
			let json = {
					uid : $('#write_form input[name="writer"]').val(),
					title: $('#write_form input[name="title"]').val(),
					content: $('#write_form textarea[name="content"]').val()
				
			}
			$.ajax({
				url : _+'/articles/'+x.artseq,
				type : 'PUT',
				data : JSON.stringify(json),
		        dataType : 'json',
				contentType : 'application/json',
				success : d=>{
					if(d.msg === 'SUCCESS'){
						alert('수정완료!!' +d.msg)
						$('#recent_updates div.container-fluid').remove()
						recent_updates()
					}else{
						alert('수정 실패^^ 왜 실패니..?')
					}
				}
			
			})	
		})
		}
	return {onCreate}
})()