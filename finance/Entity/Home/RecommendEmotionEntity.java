package com.capstone.finance.Entity.Home;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="recommend_news_articles_emotion")
@Entity
@IdClass(RecommendEmotionId.class)
public class RecommendEmotionEntity {
    @Id
    private String code;
    private Date date;
    private String title;

    @Column
    private int score;
}
