package com.capstone.finance.Controller;

import com.capstone.finance.Entity.Home.*;
import com.capstone.finance.Service.Home.HomeNewsService;
import com.capstone.finance.Service.Home.RecommendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@CrossOrigin // 모든 도메인 허용
/* View와의 통신을 위한 Controller*/
public class HomeController {
    private RecommendService recommendService; // 종목추천 Service 객체
    private HomeNewsService homeNewsService; // home 최신뉴스 Service 객체

    // 생성자: recommendService에 인스턴스 저장.
    // @Autowired : 알아서 매핑
    @Autowired
    HomeController(RecommendService recommendService,
                   HomeNewsService homeNewsService) {

        this.recommendService=recommendService;
        this.homeNewsService=homeNewsService;
    }
    /* 이곳부터 View에 응답해야 하는 데이터들 함수 작성*/

    // Client가 home페이지 방문 시, 함수 실행 : recommend 전체 레코드 View에 전달
    @GetMapping(value="api/home")
    public List<RecommendEntity> getRecommendStocks(){
        /*
        List<RecommendEntity> tmp = recommendService.readAllRecommendTableService();
        for (RecommendEntity recommendEntity : tmp) {
            System.out.println("#######" + recommendEntity.getCode());
        }*/
        // Service에서 필요 데이터를 가져와 View에 송신.
        return recommendService.readAllRecommendTableService();
    }

    // Client가 home페이지 방문 시, 함수 실행 : chatgpt_recommend_trend 전체 레코드 View에 전달
    @GetMapping(value="api/home/trend")
    public List<RecommendTrendEntity> getTrendRecords() {
        return recommendService.readAllTrendTableService();
    }

    // Client가 home페이지 방문 시, 함수 실행: 추천 종목별 감성점수 View에 전달
    @GetMapping(value="api/home/emotion")
    public List<RecommendEmotionScore> getEmotionScores() {
        return recommendService.readAllEmotionTableAndSumService();
    }

    // Client가 home페이지 방문 시, 함수 실행 : 추천 종목별 주요키워드 View에 전달
    @GetMapping(value="api/home/keywords")
    public List<RecommendKeywordsEntity> getKeywordsRecords() {
        return recommendService.readAllKeywordsTable();
    }

    // Client가 home페이지 방문 시, 함수 실행 : 최신 뉴스 View에 전달
    @GetMapping(value="api/home/news")
    public List<HomeNewsEntity> getHomeLatestNewsRecords() {
        return homeNewsService.readAllHomeNewsTable();
    }
}
