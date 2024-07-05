package com.capstone.finance.Service.Chatbot;

import com.capstone.finance.Entity.Chatbot.ChatbotHistoryEntity;
import com.capstone.finance.Repository.Chatbot.ChatbotRepository;
import jakarta.transaction.Transactional;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.*;
import org.springframework.stereotype.Service;

import java.util.List;

import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

@Transactional
@Service
public class ChatbotService {
    private ChatbotRepository chatbotRepository;
    private final RestTemplate restTemplate; // http 통신을 위한 변수

    public ChatbotService(ChatbotRepository chatbotRepository, RestTemplateBuilder restTemplateBuilder) {
        this.chatbotRepository=chatbotRepository;
        this.restTemplate = restTemplateBuilder.build();
    }

    // 로직 1 : chatbot_history username 해당 전체 레코드 리턴(대화내역 랜더링시 사용)
    public List<ChatbotHistoryEntity> getAllRecords(String username){
        return chatbotRepository.getTablesByUsername(username);
    }

    // 로직 2 : Python 서버와 통신하여, 사용자 입력 질문에 대한 답변 받아오기
    public List<ChatbotHistoryEntity> getAllRecordsContainAnswer(String username, String text) {
        // 1. python 서버에게 답변 처리 요청 및 응답 받기
        String url = "http://127.0.0.1:5000/chatbot-message"; // Flask 서버 URL 세팅
        HttpHeaders headers = new HttpHeaders(); // HTTP header 생성.
        headers.setContentType(MediaType.APPLICATION_JSON); // header 타입: JSON(Rest API)

        String requestBody = "{\"username\": \"" + username + "\", " + "\"text\": \"" + text + "\"}"; // 요청 메시지 설정
        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers); // HTTP header 설정, HTTP(요청) 바디에 메시지 담기.
        // http://localhost:8080/api/chatbot-answer

        // POST 요청
        try {
            ResponseEntity<String> response = restTemplate.postForEntity(url, requestEntity, String.class);
            return chatbotRepository.getTablesByUsername(username);
        } catch (HttpClientErrorException ex) {
            return chatbotRepository.getTablesByUsername(username);
        }
    }
}
