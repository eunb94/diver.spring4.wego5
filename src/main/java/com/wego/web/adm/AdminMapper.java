package com.wego.web.adm;

import java.util.HashMap;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;
@Lazy
@Repository
public interface AdminMapper {
	public void insertAdmin(Admin admin);
	public Admin selectByIdPw(Admin admin);
	public int existId(String eid);
	
	Admin selectAdmin(HashMap<String,Object> map);
}
