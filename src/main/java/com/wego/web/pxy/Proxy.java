package com.wego.web.pxy;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import com.wego.web.brd.ArticleMapper;
import com.wego.web.cmm.IFunction;
import com.wego.web.cmm.ISupplier;
import com.wego.web.utl.Printer;

import lombok.Data;

@Data @Component @Lazy
public class Proxy {
	private int pageNum, pageSize, startRow, endRow;
	private String search;
	/*@Autowired List<String> proxylist;*/
	private final int BLOCK_SIZE = 5;
	@Autowired Printer p;
	@Autowired ArticleMapper articleMapper;
	
	@SuppressWarnings("unused")
	public void paging() {
		ISupplier<String> s = () -> articleMapper.countByArticle();		
		int totalCount = Integer.parseInt(s.get());	
		int pageCount = (totalCount % pageSize == 0) ? (totalCount/pageSize) : (totalCount/pageSize)+1;
		startRow = (pageNum-1) * pageSize;
		endRow = (pageCount == pageNum) ? startRow + totalCount-1 : (startRow + pageSize)-1;
		int blockCount = (pageCount % BLOCK_SIZE != 0) ? (pageCount / BLOCK_SIZE)+1 : pageCount / BLOCK_SIZE ;
		int blockNum = (pageNum - 1)/BLOCK_SIZE;
		int startPage = (BLOCK_SIZE % pageSize == 0) ? BLOCK_SIZE+1 : BLOCK_SIZE;
		int endPage = 0;
		boolean existPrev = false;
		boolean existNext = false;
	}
	public int parseInt(String param) {
		Function<String, Integer> f = s -> Integer.parseInt(s);
		return f.apply(param);
	}
	public List<?> crawl(Map<?,?> paramMap){  

		String url = "http://"+paramMap.get("site")+"/"; 
		p.accept("넘어온 url \n"+url);
		List<String> pxyList = new ArrayList<>(); 
		pxyList.clear(); 
		try {
			
			Connection.Response response = Jsoup.connect(url) 
											.method(Connection.Method.GET)
											.execute();
			Document document = response.parse();
			String text = document.html();
			/*String text = document.text();*/
			p.accept("크롤링한 텍스트 \n"+text);
			pxyList.add(text);
			
			
					
		} catch (Exception e2) {
			e2.printStackTrace();
		
		}
		return pxyList;
	}


}
