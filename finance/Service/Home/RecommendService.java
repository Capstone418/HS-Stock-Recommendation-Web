package com.capstone.finance.Service.Home;

import com.capstone.finance.Entity.Home.*;
import com.capstone.finance.Repository.Home.*;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Transactional // (선언적) 트랜잭션 처리
@Service // 비즈니스 로직
public class RecommendService {
    private RecommendRepository repository; // recommend table DAO
    private RecommendTrendRepository trendRepository; // chatgpt_recommend_trend DAO
    private RecommendEmotionRepository emotionRepository; // recommend_news_articles_emothion DAO
    private RecommendKeywordsRepository keywordsRepository; // recommend_news_articles_keywords DAO

    // 생성자
    RecommendService(
            RecommendRepository repository,
            RecommendTrendRepository trendRepository,
            RecommendEmotionRepository emotionRepository,
            RecommendKeywordsRepository keywordsRepository) {
        this.repository=repository;
        this.trendRepository=trendRepository;
        this.emotionRepository=emotionRepository;
        this.keywordsRepository=keywordsRepository;
    }

    // 필요한 처리 담당 함수들 작성.
    // 비즈니스 로직 처리 함수들

    // 로직 1 : recommend 테이블의 모든 레코드 가져오기
    @Transactional
    public List<RecommendEntity> readAllRecommendTableService() {
        return (List<RecommendEntity>)repository.findAll();
    }

    // 로직 2 : chatgpt_recommend_trend 테이블의 모든 레코드 가져오기
    @Transactional
    public List<RecommendTrendEntity> readAllTrendTableService() {return (List<RecommendTrendEntity>)trendRepository.findAll();}

    // 로직 3 : recommed_news_articles_emotion 테이블의 모든 레코드 가져와서, 코드별 점수 더하기
    public List<RecommendEmotionScore> readAllEmotionTableAndSumService() {
        List<RecommendEmotionScore> result = new ArrayList<>();
        List<RecommendEntity> code_list = (List<RecommendEntity>)repository.findAll();
        List<RecommendEmotionEntity> emotion_list = (List<RecommendEmotionEntity>)emotionRepository.findAll();

        //System.out.println("######## "+code_list.size());

        for(RecommendEntity e1 : code_list){
            RecommendEmotionScore tmp = new RecommendEmotionScore();
            tmp.setCode(e1.getCode());
            tmp.setTotal_score(0);
            for(RecommendEmotionEntity e2 : emotion_list){
                if(e1.getCode().equals(e2.getCode())){
                    tmp.sum_score(e2.getScore());
                }
            }
            result.add(tmp);
        }

        return result;
    }

    // 로직 4 : recommend_news_articles_keywords 테이블의 모든 레코드 가져오기 및 리턴.
    public List<RecommendKeywordsEntity> readAllKeywordsTable() {
        return (List<RecommendKeywordsEntity>)keywordsRepository.findAll();
    }

}
