package com.wego.web.adm;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wego.web.cmm.IConsumer;
import com.wego.web.cmm.IFunction;
import com.wego.web.pxy.ProxyMap;
import com.wego.web.utl.Printer;

@RestController
@RequestMapping("/admins")
public class AdminCtrl {
	@Autowired
	Map<String, Object> map;
	@Autowired
	Printer printer;
	@Autowired
	Admin admin;
	@Autowired
	AdminMapper adminMapper;
	@Autowired
	ProxyMap pxyMap;
	
	
	@PostMapping("/")
	public Map<?,?> register(@RequestBody Admin param){
		IConsumer<Admin> c = t-> adminMapper.insertAdmin(param);
		c.accept(param);
		map.clear();
		map.put("msg", "SUCCESS");
		return map;
		}
	
	@PostMapping("/{eid}")
	public Map<?,?> access(@PathVariable String eid , @RequestBody Admin param) {
		IFunction<Admin, Admin> f = t->adminMapper.selectByIdPw(param);
		printer.accept("컨트롤러 어드민 : " + param.toString());
		String a = (f.apply(param)!=null) ? "SUCCESS" : "FAIL";
		System.out.println("스트링"+a);
		map.clear();
		map.put("msg", (f.apply(param)!=null) ? "SUCCESS" : "FAIL");
		return map;
		}
	
	@GetMapping("/{eid}")
	public Admin searchAdminById() {
		return admin;}
	
	@PutMapping("/{eid}")
	public Map<?,?> updateAdmin(){
		return map;}
	
	@DeleteMapping("/{eid}")
	public Map<?,?> removeAdmin(){
		return map;}
}
