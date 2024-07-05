package com.capstone.finance.Service.Home;

import com.capstone.finance.Entity.Home.HomeNewsEntity;
import com.capstone.finance.Repository.Home.HomeNewsRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Transactional
@Service
public class HomeNewsService {
    private HomeNewsRepository homeNewsRepository; // home_news_articles DAO

    // 생성자
    HomeNewsService(HomeNewsRepository homeNewsRepository){
        this.homeNewsRepository=homeNewsRepository;
    }

    // 로직 1 : home_news_articles 테이블의 모든 레코드 가져오기 및 리턴.
    public List<HomeNewsEntity> readAllHomeNewsTable() {
        return (List<HomeNewsEntity>)homeNewsRepository.findAll();
    }
}
