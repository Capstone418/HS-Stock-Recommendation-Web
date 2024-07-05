package com.capstone.finance.Entity.Home;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RecommendEmotionId implements Serializable {
    private String code;
    private Date date;
    private String title;
}
