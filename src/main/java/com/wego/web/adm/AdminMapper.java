package com.wego.web.adm;

import org.springframework.stereotype.Repository;

@Repository
public interface AdminMapper {
	public void insertAdmin(Admin admin);
	public Admin selectByIdPw(Admin admin);
	public int existId(String eid);
}
