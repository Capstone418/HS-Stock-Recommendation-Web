package com.capstone.finance.Entity.Community;

import com.capstone.finance.Entity.Auth.Member;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "post_like") // 테이블 이름을 'post_like'로 변경
public class Like {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;
}