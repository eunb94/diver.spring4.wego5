package com.wego.web.usr;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;
@Lazy
@Repository
public interface UserMapper {
	public void insertUser(User user);
	public User selectByIdPw(User user);
	public int existId(String uid);
}
