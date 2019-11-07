package com.wego.web.brd;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.wego.web.cmm.IConsumer;
import com.wego.web.cmm.IFunction;
import com.wego.web.cmm.ISupplier;
import com.wego.web.pxy.Proxy;
import com.wego.web.pxy.ProxyMap;
import com.wego.web.utl.Printer;


@RestController
@RequestMapping("/articles")
public class ArticleCtrl {
	private static final Logger logger = LoggerFactory.getLogger(ArticleCtrl.class);
	@Autowired Map<String, Object> map;
	@Autowired ProxyMap pxyMap;
	@Autowired Article art;
	@Autowired Printer printer;
	@Autowired ArticleMapper articleMapper;
	@Autowired List<Article> list;
	@Autowired Proxy pxy;
	
	
	@PostMapping("/")
	public Map<?, ?> write(@RequestBody Article param){
		printer.accept("글쓰기 들어옴");
		param.setBoardType("게시판");
		IConsumer<Article> c = t ->articleMapper.insertArticle(param);
		c.accept(param);

		ISupplier<String> s =()->articleMapper.countByArticle();
		pxyMap.accept(Arrays.asList("msg", "count"),
				Arrays.asList("SUCCESS", s.get()));
		return pxyMap.get();
	}
	@GetMapping("/{pageNo}/size/{pageSize}")
	public Map<?,?> list(@PathVariable String pageNo, @PathVariable String pageSize){
		pxy.setPageNum(pxy.parseInt(pageNo));
		pxy.setPageSize(pxy.parseInt(pageSize));
		pxy.paging();
		list.clear();		
		ISupplier<List<Article>> s = ()-> articleMapper.selectAll(pxy);
		printer.accept("해당페이지 글 목록 : \n"+s.get());
		int ran = pxy.random(10, 100);
		System.out.println("랜덤값 = " + ran);
		pxyMap.accept(Arrays.asList("articles", "pxy"),
				Arrays.asList(s.get(), pxy));
		
		return pxyMap.get();
		
	}
	
	
	@GetMapping("/count")
	public Map<?,?> count(){
		ISupplier<String> s =()->articleMapper.countByArticle();
		printer.accept("카운팅 : "+s.get());
		pxyMap.accept(Arrays.asList("count"), Arrays.asList(s.get()));
		return pxyMap.get();
		
	}
	
	@PutMapping("/{artseq}")
	public Map<?,?> updateArticle(@PathVariable String artseq, @RequestBody Article param) {	
		param.setArtseq(artseq);
		printer.accept("수정들어옴 "+artseq);
		IConsumer<Article> c=t-> articleMapper.updateArticle(param);
		c.accept(param);
		map.clear();
		map.put("msg", "SUCCESS");
		printer.accept("수정나감 "+param.toString());
		return map;
		
	}
	@DeleteMapping("/{artseq}")
	public Map<?,?> deleteArticle(@PathVariable String artseq, @RequestBody Article param) {
		printer.accept("삭제들어옴 "+artseq);
		IConsumer<Article> c=t-> articleMapper.deleteArticle(param);
		c.accept(param);
		map.clear();
		map.put("msg", "SUCCESS");
		return map;
	}
	
	
	
}
