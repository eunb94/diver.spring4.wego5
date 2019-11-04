"use strict"
var admin= admin || {}
admin = (()=>{
	const WHEN_ERR = '호출하는 JS 파일을 찾지 못했습니다.'
		let _, js, css, img, brd_js, navi_vue_js, brd_vue, navi_js
		let init=()=>{
			_ = $.ctx()
			js = $.js()
			css = $.css()
			img = $.img()
			brd_js = js+'/brd/brd.js'
			navi_vue_js = js + '/vue/navi_vue.js'
			navi_js = js+'/cmm/navi.js'
		}
		let onCreate=()=>{
			init()
			$.when(
				$.getScript(navi_js),
				$.getScript(navi_vue_js)
			).done(()=>{
				setContentView()
				navi.onCreate()
			}).fail(()=>{
				alert(WHEN_ERR)
			})
		}
		let setContentView=()=>{
			$('body').empty()
			$('#form_join').remove()
			$(navi_vue.nav())
			.appendTo('body')
			$('<table id="tab"><tr></tr></table>')
			.css({border: '1px solid black', width: '80%', height :'90%', 'margin':'0 auto'})
			.appendTo('body')
			$.each(
				[{id:'left', width : '20%'}, 
				{id:'right', width:'80%'}], 
				(i,j)=>{
				$('<td id="'+j.id+'"</td>')		
				.css({border: '2px solid black', 'j.width': '80%', 'vertical-align':'top'})
				.appendTo('#tab tr')
			})
			$.each(
				[{txt:'웹크롤링', name:'web_crawl'},
				{txt:' 직원관리', name:'admin_mgmt'}, 
				{txt:'고객관리', name:'cust_mgmt'}, 
				{txt:'업체관리', name:'company_mgmt'}, 
				{txt:'매출관리', name:'sales_mgmt'}, 
				{txt:'임시관리', name:'temp_mgmt'}],
				(i,j)=>{	
				$('<div name="'+j.name+'">'+j.txt+'</div>')
				.css({border: '2px solid black',margin:'0 auto', 'line-height' : '50px'})
				.appendTo('#left')
				.click(function(){
					$(this).addClass('active')
					$(this).siblings().removeClass('active')
					switch($(this).attr('name')){
					case 'web_crawl': web_crawl()
						break;
					case 'admin_mgmt':
						break;
					case 'cust_mgmt': 
						break;
					case 'company_mgmt': 
						break;
					case 'sales_mgmt': 
						break;
					case 'temp_mgmt': 
						break;
					}
					
				})
			})
			$('#left').css({border: '2px solid black', width: '20%', 'vertical-align':'top'})
			$('#left div')
			web_crawl()		
		}
		let web_crawl=()=>{
			$('</br></br></br></br></br><h2>Web Crawling</h2></br></br></br></br></br></br></br>'+	
					'<form id="crawl_form">'+
					'  <select name="site" size="1">'+
			/*		'    <option value="volvo">Volvo</option>'+
					'    <option value="saab">Saab</option>'+
					'    <option value="fiat">Fiat</option>'+
					'    <option value="audi">Audi</option>'+*	/
					'  </select>'+
					'  <br><br>'+
					'  <input class="form-control mr-sm-2" type="text" placeholder="insert URL for crawling" aria-label="Search">'+
					/*' <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>'+*/
					'</form>'+
					'<p>Hold down the Ctrl (windows) / Command (Mac) button to select multiple options.</p>')	
					.appendTo('#right')
					$.each(
			[{txt: 'Naver', value: 'naver.com'},	
			 {txt: 'Daum', value: 'daum.net'},
			 {txt: 'Google', value: 'google.co.kr'},
			 {txt: 'Youtube', value: 'youtube.com'}],
			 (i,j)=>{			 
				 $('<option value="'+j.value+'">'+j.txt+'</option>').appendTo('#crawl_form select')
			 })
			 $('  <input class="form-control mr-sm-2" type="text" placeholder="insert URL for crawling" aria-label="Search">')
			 .appendTo('#crawl_form')
			$(' <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>')
			.appendTo('#crawl_form')
			.click(e=>{
				e.preventDefault()
				let arr = [$('#crawl_form select[name="site"]').val(),
					$('#crawl_form input[type="text"]').val()]
				if(!$.fn.nullChacker(arr)){
					$.getJSON(_+'/proxys/crawling/'+arr[0]
													+'/'+arr[1],d=>{
														alert(d.msg)
													})
				}
			})
			 
		}
		
		
		return{onCreate}
	})()