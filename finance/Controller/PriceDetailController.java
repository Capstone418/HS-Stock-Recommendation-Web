package com.capstone.finance.Controller;

import com.capstone.finance.Entity.PriceDetail.NewsEntity;
import com.capstone.finance.Service.PriceDetail.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
public class PriceDetailController {
    private NewsService newsService;

    @Autowired
    PriceDetailController(NewsService newsService){
        this.newsService=newsService;
    }

    @GetMapping("/api/price-detail")
    public List<NewsEntity> getStockNews(){
        return newsService.readAllNewsArticles();
    }
}
