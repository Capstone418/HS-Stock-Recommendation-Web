package com.capstone.finance.Entity.Community;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Data
@Entity
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String content;
    private String username; // 작성자
    @Lob
    @Column(columnDefinition = "MEDIUMBLOB")
    private byte[] image; // 이미지를 바이트 배열로 저장
    private int likeCount = 0; // 추천 수 변수 이름 변경
    private Date createdAt = new Date();

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true,fetch = FetchType.EAGER)
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Like> likes = new ArrayList<>();


}