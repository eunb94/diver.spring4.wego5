<%@ page language="java" contentType="text/html; charset=UTF-8"
   pageEncoding="UTF-8"%>
<form >

<div class="input_box">
<div>  부서명 :</div><div><input id="d_Name"  type="text" name="dName"/></div>
<div>  사용자ID :</div><div><input id="userName" type="text" name="empNo"/></div>
<div>  비밀번호 :</div><div><input id="userPw" type="text" name="eName"/></div>

</div>
<div id="input_item">
    <input type="hidden" name="action" value="login" />
    <input type="hidden" name="page" value="mypage" />
    <input id="login_btn" type="button" value="로그인"/>
    <input id="join_btn" type="button" value="회원가입"/>
</div>

</form>
<script>

app.init('${ctx}');
</script>