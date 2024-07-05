package com.capstone.finance.Entity.PriceDetail;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name="news_articles")
@Entity
@IdClass(NewsId.class)
public class NewsEntity {
    @Id
    private String code;
    private Date date;
    private String title;

    @Column
    private String content;
    private String image;
    private String url;
}
