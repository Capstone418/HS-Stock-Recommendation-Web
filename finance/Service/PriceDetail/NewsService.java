package com.capstone.finance.Service.PriceDetail;

import com.capstone.finance.Entity.PriceDetail.NewsEntity;
import com.capstone.finance.Repository.PriceDetail.NewsRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Transactional
@Service
public class NewsService {
    private NewsRepository newsRepository;

    NewsService(NewsRepository newsRepository){this.newsRepository=newsRepository;}

    // 로직1 : news_articles 전체 레코드 가져오기
    public List<NewsEntity> readAllNewsArticles(){
        return (List<NewsEntity>)newsRepository.findAll();
    }
}
