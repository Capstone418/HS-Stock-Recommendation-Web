package com.capstone.finance.Entity.PriceDetail;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NewsId implements Serializable {
    private String code;
    private Date date;
    private String title;
}
