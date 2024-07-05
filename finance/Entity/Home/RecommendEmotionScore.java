package com.capstone.finance.Entity.Home;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RecommendEmotionScore {
    private String code;
    private int total_score;

    public void sum_score(int e){
        total_score+=e;
    }
}
