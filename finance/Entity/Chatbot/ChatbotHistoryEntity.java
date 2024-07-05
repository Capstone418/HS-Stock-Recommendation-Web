package com.capstone.finance.Entity.Chatbot;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="chatbot_history")
@Entity
public class ChatbotHistoryEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id")
    private Long id;

    @Column(name="username")
    private String username;
    @Column(name = "date")
    private Date date;
    @Column(name = "req_msg")
    private String req_msg;
    @Column(name = "res_msg")
    private String res_msg;
}
