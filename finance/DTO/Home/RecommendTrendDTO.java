package com.capstone.finance.DTO.Home;

import com.capstone.finance.Entity.Home.RecommendTrendEntity;
import lombok.*;

@Builder
@ToString
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RecommendTrendDTO {
    private String code;
    private String content;

    public RecommendTrendEntity toEntity(){
        return RecommendTrendEntity.builder()
                .code(this.code)
                .content(this.content)
                .build();
    }
}
