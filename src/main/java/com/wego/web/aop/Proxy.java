package com.wego.web.aop;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import com.wego.web.utl.Printer;

import lombok.Data;

@Data @Component @Lazy
public class Proxy {
	private int pageNum;
	private String search;
	/*@Autowired List<String> proxylist;*/
	@Autowired Printer p;

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
