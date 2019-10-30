var navi = navi ||{}
navi = (()=>{
    const WHEN_ERR = '호출하는 JS 파일을 찾지 못했습니다.'
    let _, js, css, img, auth_js, brd_js, router_js, navi_vue_js
    let init =()=>{
    	 _= $.ctx()
         js = $.js()
         css = $.css()
         img = $.img()
       auth_js = js+'/cmm/auth.js'
       navi_vue_js = js+'/vue/navi_vue.js'
       brd_js = js+'/brd/brd.js'
       router_js = js+'/cmm/router.js'

    }
	let onCreate=()=>{
		init()
		$.when(
				$.getScript(auth_js),
				$.getScript(brd_js)
		).done(()=>{
			
		}).fail(()=>{		
			alert(WHEN_ERR)})
		setContentView()
	}
	let setContentView=()=>{
			$('<a>',{
        	href : '#',
	        text : '글쓰기'
        })
        .addClass('nav-link')
        .appendTo('#menu_write')
    	.click (e=>{
        	e.preventDefault()
        	$.getScript(brd_js, ()=>{
        		brd.write()
        	})
        })
	
        $('<a>',{
    	href : '#',    	
        text : '로그아웃'
    })
    .addClass('nav-link')
    .appendTo('#menu_logout')
    .click(e=>{
        	e.preventDefault()
        	alert('로그아웃 클릭시')
        	deleteCookie(_)
        	app.run(_)
        })
	}
	return{onCreate}
})()