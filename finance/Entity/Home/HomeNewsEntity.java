package com.capstone.finance.Entity.Home;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.util.Date;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="home_news_articles")
@Entity
public class HomeNewsEntity {
    @Id
    private String code;

    @Column
    private Date date;
    private String title;
    private int score;
    private String summary;
    private String keyword1;
    private String keyword2;
    private String keyword3;
    private String keyword4;
    private String keyword5;
    private String image;
    private String url;
    private String content;
}
