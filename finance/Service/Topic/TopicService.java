package com.capstone.finance.Service.Topic;
import com.capstone.finance.Entity.Topic.TopicResponseEntity;
import jakarta.transaction.Transactional;
import org.json.JSONObject;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

@Transactional
@Service
public class TopicService {
    private final RestTemplate restTemplate;

    public TopicService(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.build();
    }

    // 로직 1 : 뉴스요약, 토픽인사이트 Python 서버에게 요청하기
    public TopicResponseEntity getTopic(String title){
        String url = "http://127.0.0.1:5000/news-insite"; // Flask 서버 URL 세팅
        HttpHeaders headers = new HttpHeaders(); // HTTP header 생성.
        headers.setContentType(MediaType.APPLICATION_JSON); // header 타입: JSON(Rest API)

        String requestBody = "{\"title\": \"" + title + "\"}"; // 요청 메시지 설정
        System.out.println(requestBody);
        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

        TopicResponseEntity entity = new TopicResponseEntity();
        try {
            ResponseEntity<String> response = restTemplate.postForEntity(url, requestEntity, String.class);
            String responseBody = response.getBody();
            JSONObject json = new JSONObject(responseBody); // JSON 문자열을 JSON 객체로 파싱
            String summary = json.getString("summary");
            String questions = json.getString("questions");
            String answers = json.getString("answers");

            List<String> quests = Arrays.asList(questions.split("\n"));
            List<String> anss = Arrays.asList(answers.split("\n"));

            entity.setSummary(summary);
            entity.setQuestions(quests);
            entity.setAnswers(anss);

            return entity;
        } catch(HttpClientErrorException ex){
            entity.setSummary("");
            entity.setQuestions(new ArrayList<>());
            entity.setAnswers(new ArrayList<>());
            return entity;
        }
    }
}
