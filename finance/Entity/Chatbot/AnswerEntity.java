package com.capstone.finance.Entity.Chatbot;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnswerEntity {
    private String username; // 사용자 로그인ID
    private String text; // 사용자 입력 질문
}
