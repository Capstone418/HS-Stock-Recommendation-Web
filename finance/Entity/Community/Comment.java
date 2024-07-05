package com.capstone.finance.Entity.Community;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.GenerationType;
import lombok.Data;
import jakarta.persistence.*;
import java.util.Date;

@Data
@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;
    private String username; // 작성자
    private Date createdAt = new Date();

    @ManyToOne
    @JoinColumn(name = "post_id")
    @JsonBackReference
    private Post post;
}