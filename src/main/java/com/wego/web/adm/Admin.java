package com.wego.web.adm;
import java.io.Serializable;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Lazy
@Data
@Component
@AllArgsConstructor
@NoArgsConstructor
public class Admin{
    private static final long serialVersionUID = 1L;
    private String eid, pwd, ename, job, mgr, hiredate, sal, comm, deptNo;
}

