package com.capstone.finance.Entity.Community;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class PostDto {
    private Long id;
    private String title;
    private String content;
    private String username;
    private Date createdAt;

    private String image; // 이미지를 바이트 배열로 저장
    private int likeCount;
    private List<CommentDto> comments;

}