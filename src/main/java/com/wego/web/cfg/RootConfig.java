package com.wego.web.cfg;

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DriverManagerDataSource;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

@Configuration
@ComponentScan(basePackages= {"com.wego.web"})
@MapperScan(basePackages = {"com.wego.web"})
public class RootConfig {
	
@Bean

public DataSource dataSource() {
	/*HikariConfig hikariConfig = new HikariConfig();
	hikariConfig.setDriverClassName("com.mysql.jdbc.Driver");
	hikariConfig.setJdbcUrl("jdbc:mysql://localhost:3306/wego?serverTimezone=UTC");
	hikariConfig.setUsername("wego");
	hikariConfig.setPassword("wego");*/
	//HikariDataSource dataSource = new HikariDataSource(hikariConfig);
	DriverManagerDataSource dataSource = new DriverManagerDataSource();
	dataSource.setDriverClassName("com.mysql.jdbc.Driver");
	dataSource.setUrl("jdbc:mysql://localhost:3306/wego?serverTimezone=UTC");
	dataSource.setUsername("wego");
	dataSource.setPassword("wego");
	return dataSource;
	
}

}
