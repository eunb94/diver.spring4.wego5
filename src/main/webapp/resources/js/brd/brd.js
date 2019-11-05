"use strict"
var brd = brd||{}
brd = (()=>{

		let _, js, css, img, brd_vue_js, navi_js, navi_vue_js, page_vue_js, compo_vue_js
		let init =x=>{
			_= $.ctx()
	         js = $.js()
	         css = $.css()
	         img = $.img()
	        navi_js = js+'/cmm/navi.js'
	        brd_vue_js = js + '/vue/brd_vue.js'
	        navi_vue_js = js + '/vue/navi_vue.js'
	        page_vue_js = js + '/vue/page_vue.js'
	        compo_vue_js = js + '/vue/compo_vue.js'
	        alert('1'+_)
		}
	let onCreate =x=>{
		init(x)
		$.when(
			$.getScript(brd_vue_js),
			$.getScript(navi_js),
			$.getScript(navi_vue_js),
			$.getScript(page_vue_js),
			$.getScript(compo_vue_js)
		).done(()=>{
			setContentView()
			navi.onCreate({_:_, js:js, css:css,img:img})
		}).fail(()=>{
			alert(WHEN_ERR)
		})
	}
	let setContentView=()=>{
		
		$('head').html(brd_vue.brd_head({css: $.css(), img: $.img()}))
        $('body').addClass('text-center')
        .html(brd_vue.brd_body({ctx: '/web',css: $.css(), img: $.img()}))
        $(navi_vue.nav()).appendTo('#navi')
        recent_updates({page: '1', size : '5'})
	}
	let recent_updates=x=>{
		alert('호출된 페이지 번호 : '+ x)
	    $('#recent_updates .media').remove()
	    $('#suggestions').remove()
	    
	    $('#recent_updates .d-block').remove()
	    
	    $.getJSON(sessionStorage.getItem('ctx')+'/articles/'+x.page+'/size/'+x.size, d=>{
	    	alert('몇개니'+Object.keys(d).length)
	    	alert('글목록 숫자 :' +d.count)

					$.each(d.articles, (i,j)=>{				  
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
					
	      		$(page_vue.page())
	      		.appendTo('#recent_updates')
	      		$('#pagination').empty()
	      		$('#recent_updates div.container h2').remove() 
	      		
				$('<form id="paging_form" class="form-inline my-2 my-lg-0" style="float: right">'+
				'  <select name="site" size="1">'+
				'  </select>'+
				'</form>').prependTo('#recent_updates div.container')
			$('#paging_form input[class="form-control mr-sm-2"]').css({width:'80%'})
			$.each([{sub:'5개보기'},{sub:'10개보기'},{sub:'15개보기'}],(i,j)=>{
				$('<option value='+j.sub+'>'+j.sub+'</option>')
				.appendTo('#paging_form select')
				
				
			})
			 
			/*	   $(page_vue.page()).appendTo('body')*/
				 /*   $('    <li class="page-item"><a class="page-link" href="#">1</a></li>')
				    .appendTo*/
/*				let t = ''
			
					for(var q=0; q<d.length/5;q++){
						t+='<li class="page-item"><a class="page-link" href="#">'+(q+1)+'</a></li>'
					}
	    		$(t)
	    		.appendTo('#pagination')*/
	    		$.each(d.pages,(i,j)=>{
	    			$('<li class="page-item"><a class="page-link" href="#">'+j+'</a></li>')
	    			.appendTo('#pagination')
	    			
	    		}) 
	    			/*$('#h_page').empty() 
				$('<form id="page_form" class="select_box">'+
					'  <select name="site" size="1">'+
					'</form>')				
				.prependTo('#pagination')
				$('#page_form input[class="form-control mr-sm-2"]').css({width:'80%'})
				$.each(
			[{txt: '5개보기', value: 'naver.com'},	
			 {txt: '10개보기', value: 'daum.net'},
			 {txt: '15개보기', value: 'google.co.kr'}],
			 (i,j)=>{			 
				 $('<option value="'+j.value+'">'+j.txt+'</option>').appendTo('#page_form select')
			 })*/
				
	    		
				
		    })
		 
		}
/*	let web_pageNum=()=>{
		$('#h_page').empty()
					$('<form id="page_form" class="select_box">'+
					'  <select name="site" size="1">'+
					'</form>')				
				.appendTo('#h_page')
				$.each(
			[{txt: '5개', value: 'naver.com'},	
			 {txt: '10개', value: 'daum.net'},
			 {txt: '15개', value: 'google.co.kr'}],
			 (i,j)=>{			 
				 $('<option value="'+j.value+'">'+j.txt+'</option>').appendTo('#page_form select')
			 })
			 .appendTo('#page_form')
			 .css({'width':'50%'})
	}*/
	let write=()=>{
		$('#recent_updates').html(brd_vue.brd_write())
		$('#write_form input[name="writer"]').val(getCookie("USERID"))
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
			alert('2'+_)
			$.ajax({
				url : sessionStorage.getItem('ctx')+'/articles/',
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
	return {onCreate, write}
})()