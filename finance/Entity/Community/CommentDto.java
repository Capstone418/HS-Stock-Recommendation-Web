
package com.capstone.finance.Entity.Community;

import lombok.Data;

import java.util.Date;

@Data
public class CommentDto {
    private Long id;
    private String content;
    private String username;
    private Date createdAt;
}