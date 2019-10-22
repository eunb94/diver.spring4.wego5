<%@ page language="java" contentType="text/html; charset=UTF-8"
   pageEncoding="UTF-8"%>
<div></div>
<div></div>
<div id = "join_join"><h3>회원가입</h3></div>
<div></div>
<div></div>
<form id="join_form">
    <div id = "join_spac" >
    <div>EMPNO</div>
    <div class = "input_join"><input id="join_empno" type="text" name="empNo"/></div>
    <div>ENAME</div>
    <div class = "input_join"><input id="join_ename" type="text" name="eName"/></div>
    <div>JOB</div>
    <div class = "input_join"><input id="join_job" type="text" name="job"/></div>
    <div>MGR</div>
    <div class = "input_join"><input id="join_mgr" type="text" name="mgr"/></div>
    <div>SAL</div>
    <div class = "input_join"><input id="join_sal" type="text" name="sal"/></div>
    <div>COMM</div>
    <div class = "input_join"><input id="join_comm" type="text" name="comm"/></div>
    <div>DEPTNO</div>
    <div class = "input_join"><input id="join_deptno" type="text" name="deptNo"/></div>
    </div>
    <div></div>
    <div></div>
    <input type="hidden" name="action" value="create" />
    <input type="hidden" name="page" value = "login" />
    <div><h3><input id="join_btn1" type="button" value="가입하기" /></h3></div>
</form>
    <div></div>
<script>
app.init('${ctx}');
</script>