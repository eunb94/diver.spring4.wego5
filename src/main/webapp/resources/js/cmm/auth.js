"use strict";
var auth = auth || {};
auth =(()=>{
    const WHEN_ERR = '호출하는 JS를 찾을수 없습니다.'
    let _, js,auth_vuejs,brdvuejs;
    
    let init =()=>{
        _ = $.ctx();
        js= $.js();
        auth_vuejs = js+'/vue/auth_vue.js'
        brdvuejs = js+'/vue/brd_vue.js'
        
    }
    
    let onCreate=()=>{
        init()
        $.getScript(auth_vuejs)
        .done(()=>{
            setContentView()
            $('#a_go_join').click(e=>{
                e.preventDefault();
                $('head').html(auth_vue.join_head()),
                $('body').html(auth_vue.join_body())
                $('<button>',{
                    text: '회원가입',
                    href: '#',
                    click: e=>{
                        e.preventDefault();
                        existId($('#userid').val())
                        
                    }
                })
                .addClass('btn btn-primary btn-lg btn-block')
                .appendTo('#btn_join')        
            
            })
            })
        .fail(()=>{alert(WHEN_ERR)})
    }
    let setContentView=()=>{
        login()
    }
    
    let existId =x=>{
        $.ajax({
            url:_+'/users/'+x+'/exist',
            type: 'GET',
            contentType : 'application/json',
            success : d=>{
                
                if(d.msg ==='SUCCESS')
                    alert('회원가입 고고'),
                    join()
                else
                   alert('아이디 중복')
                
            },
            error : e=>{
                
                alert('익시트에이작스실패');
            }
            
        })
    }
    let prejoin=()=>{
        
        $('body').html(auth_vue.prejoin_form(x))
        .addClass("text-center")
        
    }
    let join=()=>{
        let data = {uid:$('#userid').val(),pwd:$('#password').val(),uname:$('#uname').val()}
        
        $.ajax({
            url:_+'/users/',
            type: 'POST',
            dataType:'json',
            data : JSON.stringify(data),
            contentType : 'application/json',
            success : d =>{
                alert('에이작스 성공'+d.msg);    
                if(d.msg ==='SUCCESS')
                    login()
                else(alert('조인회원가입실패'))
                
            },
            error : e =>{
                alert('조인에이작스실패');
            }
        })
    }
    let login=()=>{
        let x ={css:$.css(),img:$.img()}
        alert('x.css'+x.css)
        $('head').html(auth_vue.login_head(x)),
        $('body').html(auth_vue.login_body(x))
        .addClass('text-center')
        $('<button>',{
            type:"submit",
            text : "Sign in",
            click : e=>{
                e.preventDefault()
                let data = {uid:$('#uid').val(),pwd:$('#pwd').val(),uname:$('#uname').val()}
                $.ajax({
                    url:_+'/users/'+$('#uid').val(),
                    type: 'POST',
                    dataType:'json',
                    data:JSON.stringify(data),
                    contentType : 'application/json',
                    success : d=>{
                        alert(d.uname+'님 환영합니다');    
                        mypage(d)
                    },
                    error : e=>{
                        alert('에이작스실패');
                    }
                    
                })    
            }
        }).addClass("btn btn-lg btn-primary btn-block")
        .appendTo('#btn_login')
    
        
    }
    let mypage=d=>{
        $.getScript(brdvuejs).done(()=>{
            $('head').html(brd_vue.mypage_head)
             $('body').html(brd_vue.mypage_body(d))
             }).fail(()=>{alert(WHEN_ERR)})
        }
    return{onCreate,join,login,mypage,existId}
    
})();