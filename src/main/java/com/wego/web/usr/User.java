package com.wego.web.usr;
import java.io.Serializable;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Lazy
@Component
@AllArgsConstructor
@NoArgsConstructor
public class User{
    private static final long serialVersionUID = 1L;
    private String uid, pwd, uname, birth, gender, tel, pettype;
}

