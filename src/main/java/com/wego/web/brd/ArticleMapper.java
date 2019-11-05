package com.wego.web.brd;

import java.util.List;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Repository;

import com.wego.web.pxy.Proxy;
@Lazy
@Repository
public interface ArticleMapper {
	public void insertArticle(Article article);
	public String countByArticle();
	public List<Article> selectAll();
	public void updateArticle(Article article);
	public void deleteArticle(Article article);
	public List<Article> selectAll(Proxy proxy);

}
