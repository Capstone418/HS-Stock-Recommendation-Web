package com.capstone.finance.Controller;

import com.capstone.finance.Entity.Chatbot.AnswerEntity;
import com.capstone.finance.Entity.Chatbot.ChatbotHistoryEntity;
import com.capstone.finance.Service.Chatbot.ChatbotService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
public class ChatbotController {
    private ChatbotService chatbotService;

    @Autowired
    ChatbotController(ChatbotService chatbotService) {this.chatbotService=chatbotService;}

    // 초기 랜더링 매핑
    @PostMapping(value="api/chatbot-init")
    public List<ChatbotHistoryEntity> readInitAllRecords(@RequestBody AnswerEntity dto) {
        String username=dto.getUsername();
        System.out.println("username: "+username);
        List<ChatbotHistoryEntity> tmp = chatbotService.getAllRecords(username);
        System.out.println("historyList: "+tmp.size());
        return chatbotService.getAllRecords(username);
    }

    // 답변 처리 결과가 포함된 전체 레코드 리턴 매핑
    @PostMapping(value="api/chatbot-answer")
    public List<ChatbotHistoryEntity> actionProcessAnswer(@RequestBody AnswerEntity dto) {
        String username = dto.getUsername();
       String text = dto.getText();

        System.out.println("username: "+username+" / "+"text: "+text);
        return chatbotService.getAllRecordsContainAnswer(username, text);
    }
}
