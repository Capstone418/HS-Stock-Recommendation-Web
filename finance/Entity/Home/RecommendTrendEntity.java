package com.capstone.finance.Entity.Home;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="chatgpt_recommend_trend")
@Entity
public class RecommendTrendEntity {
    @Id
    private String code;

    @Column
    private String content;
}
