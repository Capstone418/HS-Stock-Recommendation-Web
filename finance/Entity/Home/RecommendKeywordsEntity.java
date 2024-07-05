package com.capstone.finance.Entity.Home;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="recommend_news_articles_keywords")
@Entity
public class RecommendKeywordsEntity {
    @Id
    private String code;

    @Column
    private String keyword1;
    private String keyword2;
    private String keyword3;
    private String keyword4;
    private String keyword5;
}
