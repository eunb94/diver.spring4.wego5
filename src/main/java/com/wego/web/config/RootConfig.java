package com.wego.web.config;

import javax.sql.DataSource;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

@Configuration
@ComponentScan(basePackages= {"com.wego.web"})
@MapperScan(basePackages = {"com.wego.web.mapper"})
public class RootConfig {

@Bean

public DataSource dataSource() {
	HikariConfig hikariConfig = new HikariConfig();
	hikariConfig.setDriverClassName("com.mysql.jdbc.Driver");
	hikariConfig.setJdbcUrl("jdbc:mysql://localhost:3306/wego?serverTimezone=UTC");
	hikariConfig.setUsername("wego");
	hikariConfig.setPassword("wego");
	HikariDataSource dataSource = new HikariDataSource(hikariConfig);
/*	dataSource.setDriverClassName("com.mysql.jdbc.Driver");
	dataSource.setJdbcUrl("jdbc:mysql://localhost:3306/wego?serverTimezone=UTC");
	dataSource.setUsername("wego");
	dataSource.setPassword("wego");*/
	return dataSource;
	
}
}
