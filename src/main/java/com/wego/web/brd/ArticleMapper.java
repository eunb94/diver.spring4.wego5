package com.wego.web.brd;

import java.util.List;

import org.springframework.stereotype.Repository;

@Repository
public interface ArticleMapper {
	public void insertArticle(Article article);
	public String countByArticle();
	public List<Article> selectAll();
	public void updateArticle(Article article);
	public void deleteArticle(Article article);

}
